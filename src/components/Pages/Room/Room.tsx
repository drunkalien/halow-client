import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import Peer from "simple-peer";

import classes from "./room.module.scss";
import { data } from "../../../dummy-data";

import { Container, Button } from "../..";
import { useLocation } from "react-router";
import { useWebsocket } from "../../../context";
import { addPeer, createPeer } from "../../../features/peer";

type PeerType = {
  peerId: string;
  username: string;
  firstName: string;
  lastName: string;
};

const Room = () => {
  const [peers, setPeers] = useState<any[]>([]);
  const userAudio: any = useRef();
  const peersRef: any = useRef([]);
  const location = useLocation();
  const roomId = location.pathname.split("room/")[1];
  console.log(roomId, peers);
  const socket = useWebsocket();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        userAudio.current = stream;
        console.log("USER AUDIO", userAudio.current);
        socket?.emit("join-room", {
          roomId,
          peer: {
            username: "khuja",
            firstName: "Jamshidkhuja",
            lastName: "Burikhujaev",
            peerId: socket?.id,
          },
        });
        socket?.emit("get-all-users", parseInt(roomId));
        socket?.on("get-all-users", (users: PeerType[]) => {
          console.log(users);
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
      });
  }, []);

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
