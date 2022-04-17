import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import Peer from "simple-peer";

import classes from "./room.module.scss";
import { data } from "../../../dummy-data";

import { Container, Button } from "../..";
import { useLocation } from "react-router";
import { useWebsocket } from "../../../context";
import { addPeer, createPeer } from "../../../features/peer";
import { useAPIQuery } from "../../../hooks";

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
    <audio autoPlay className={classes.video} ref={ref} />
  );
};

const Room = () => {
  const [peers, setPeers] = useState<any[]>([]);
  const userAudio: any = useRef();
  const peersRef: any = useRef([]);
  const location = useLocation();
  const roomId = location.pathname.split("room/")[1];
  const socket = useWebsocket();
  const query = useAPIQuery({
    url: "user/current",
    options: { refetchOnMount: false },
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
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
        const peers: Peer.Instance[] = [];
        users.forEach(({ peerId }: PeerType) => {
          const peer = createPeer(peerId, socket.id, stream, socket);

          peersRef.current.push({
            peerId: peerId,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });
      socket?.on("user-joined", (payload: any) => {
        const peer = addPeer(payload.signal, payload.callerId, stream, socket);
        peersRef.current.push({
          peerId: payload.callerId,
          peer,
        });

        setPeers((users) => [...users, peer]);
      });
      socket?.on("receiving-returned-signal", (payload: any) => {
        const item = peersRef.current.find((p: any) => p.peerId === payload.id);
        item.peer.signal(payload.signal);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(peers);

  return (
    <Container>
      <div className={cn(classes["container"])}>
        <div className={cn(classes["participants-window"])}>
          {data.map((peer, idx) => (
            <div
              className={cn(classes.peer, {
                [classes.host]: peer.isHost,
              })}
              key={idx}
            >
              {peer.firstName[0]}
              {peer.lastName[0]}
            </div>
          ))}
        </div>
        <div className={cn(classes.controls)}>
          <div className={cn(classes["left-controls"])}>
            <button className={cn(classes.control)}></button>
            <button className={cn(classes.control)}></button>
            <button className={cn(classes.control)}></button>
          </div>
          <div className={cn(classes["right-controls"])}>
            <Button rounded variant="danger">
              Leave
            </Button>
          </div>
        </div>
      </div>
      <div style={{ width: "100px", height: "100px", backgroundColor: "blue" }}>
        {peers.map((peer: any, idx: number) => (
          <Audio peer={peer} key={idx}></Audio>
        ))}
      </div>
    </Container>
  );
};

export default Room;
