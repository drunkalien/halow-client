import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import Peer from "simple-peer";
import { useNavigate } from "react-router-dom";

import classes from "./room.module.scss";

import { Container, Button } from "../..";
import { useLocation } from "react-router";
import { useWebsocket } from "../../../context";
import { addPeer, createPeer } from "../../../features/peer";
import { useAPIQuery } from "../../../hooks";
import { Mic } from "../../Icons";
import Enabled from "../../Icons/EnabledMic";

type PeerType = {
  peerId: string;
  username: string;
  firstName: string;
  lastName: string;
};

const Audio = (props: any) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream: MediaStream) => {
      // @ts-ignore
      ref.current.srcObject = stream;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // @ts-ignore
    <audio autoPlay className={classes.audio} ref={ref} />
  );
};

const Room = () => {
  const [peers, setPeers] = useState<
    {
      username: string;
      lastName: string;
      firstName: string;
      peerId: string;
      peer: Peer.Instance;
    }[]
  >([]);
  const [clients, setClients] = useState<any[]>([]);
  const [mic, setMic] = useState<boolean>(true);
  const userAudio: any = useRef();
  const peersRef: any = useRef([]);
  const location = useLocation();
  const roomId = location.pathname.split("room/")[1];
  const socket = useWebsocket();
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const history = useNavigate();
  const query = useAPIQuery({
    url: "user/current",
    options: { refetchOnMount: false },
  });

  function handleMicToggle() {
    let audioTrack;
    setMic(!mic);
    if (userStream) {
      audioTrack = userStream
        .getTracks()
        .find((track) => track.kind === "audio");

      if (userStream && audioTrack?.enabled) {
        audioTrack.enabled = false;
      } else if (userStream && !audioTrack?.enabled) {
        // @ts-ignore
        audioTrack.enabled = true;
      }
    }
  }

  function handleLeave() {
    socket?.emit("leave", { roomId, peerId: socket.id });
    history("/");
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setUserStream(stream);
      if (userAudio.current) {
        userAudio.current.srcObject = stream;
      }
      socket?.emit("join-room", {
        roomId,
        peer: {
          username: query.data.user.username,
          firstName: query.data.user.firstName,
          lastName: query.data.user.lastName,
          peerId: socket?.id,
        },
      });
      socket?.emit("get-all-users", parseInt(roomId));
      socket?.on("get-all-users", (users: PeerType[]) => {
        setClients(users);
        const peers: {
          username: string;
          lastName: string;
          firstName: string;
          peerId: string;
          peer: Peer.Instance;
        }[] = [];
        users.forEach(({ peerId, firstName, lastName, username }: PeerType) => {
          const peer = createPeer(peerId, socket.id, stream, socket);

          peersRef.current.push({
            peerId: peerId,
            peer,
          });
          peers.push({
            username,
            firstName,
            lastName,
            peerId,
            peer,
          });
        });
        setPeers(peers);
      });
      socket?.on("user-joined", (payload: any) => {
        const peer = addPeer(payload.signal, payload.callerId, stream, socket);
        peersRef.current.push({
          peerId: payload.callerId,
          peer,
        });

        setPeers((users) => [
          ...users,
          {
            username: "",
            firstName: "",
            lastName: "",
            peerId: socket.id,
            peer,
          },
        ]);
      });
      socket?.on("receiving-returned-signal", (payload: any) => {
        const item = peersRef.current.find((p: any) => p.peerId === payload.id);
        item.peer.signal(payload.signal);
      });
      socket?.on("user-left", (payload: { peerId: string }) => {
        console.log("PAYLOAD", socket.id, peersRef);

        const peerObj = peersRef.current.find(
          (p: any) => p.peerId === payload.peerId
        );
        console.log("USER LEFT", peerObj);
        peerObj.peer.destroy();
        const peers = peersRef.current.filter(
          (peerObj: any) => peerObj.peerId !== payload.peerId
        );
        peersRef.current = peers;
        setPeers(peers);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(peers);

  return (
    <Container>
      <div className={cn(classes["container"])}>
        <div className={cn(classes["participants-window"])}>
          {clients.length ? (
            clients.map((peer, idx) => (
              <div
                title={peer.firstName + " " + peer.lastName}
                className={cn(classes.peer, {
                  [classes.host]: peer.isHost,
                })}
                key={idx}
              >
                {peer?.firstName[0]}
                {peer?.lastName[0]}
              </div>
            ))
          ) : (
            <div className={classes.loading}>Loading...</div>
          )}
        </div>
        <div className={cn(classes.controls)}>
          <div className={cn(classes["left-controls"])}>
            <button
              className={cn(classes.control)}
              onClick={handleMicToggle}
              style={{ color: "white" }}
            >
              {mic ? <Enabled /> : <Mic />}
            </button>
            {/* <button className={cn(classes.control)}></button>
            <button className={cn(classes.control)}></button> */}
          </div>
          <div className={cn(classes["right-controls"])}>
            <Button rounded variant="danger" onClick={handleLeave}>
              Leave
            </Button>
          </div>
        </div>
      </div>
      <div>
        {peers.map((p: any) => (
          <Audio peer={p.peer} key={p.peerId}></Audio>
        ))}
      </div>
      {/* <Button onClick={() => console.log(peersRef.current)}>Log peers</Button> */}
    </Container>
  );
};

export default Room;
