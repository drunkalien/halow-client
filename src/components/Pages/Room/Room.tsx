import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import cn from "classnames";
import Peer from "simple-peer";

import classes from "./room.module.scss";
import { data } from "../../../dummy-data";

import { Container, Button } from "../..";
import { useLocation } from "react-router";

type PeerType = {
  peerId: string;
  username: string;
  firstName: string;
  lastName: string;
};

const Room = () => {
  const [peers, setPeers] = useState<any[]>([]);
  const socketRef: any = useRef();
  const userAudio: any = useRef();
  const peersRef: any = useRef([]);
  const location = useLocation();
  const roomId = location.pathname.split("room/")[1];
  console.log(roomId, peers);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        userAudio.current = stream;
        socketRef.current.emit("get-all-users", 100000);
        socketRef.current.on("get-all-users", (users: PeerType[]) => {
          const peers: Peer.Instance[] = [];
          users.forEach(({ peerId }: PeerType) => {
            const peer = createPeer(peerId, socketRef.current.id, stream);

            peersRef.current.push({
              peerId: peerId,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });
      });
  }, []);

  function createPeer(
    userToSIgnal: string,
    callerId: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: any) => {
      socketRef.current.emit("sending-signal", {
        userToSIgnal,
        callerId,
        signal,
      });
    });

    return peer;
  }

  function addPeer(
    incomingSiganl: string,
    callerId: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: any) => {
      socketRef.current.emit("returning-signal", { signal, callerId });
    });

    peer.signal(incomingSiganl);
    return peer;
  }

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
    </Container>
  );
};

export default Room;
