import Peer from "simple-peer";
import { Socket } from "socket.io-client";

export function createPeer(
  userToSIgnal: string,
  callerId: string,
  stream: MediaStream,
  socket: Socket
) {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal: any) => {
    socket.emit("sending-signal", {
      userToSIgnal,
      callerId,
      signal,
    });
  });

  return peer;
}

export function addPeer(
  incomingSiganl: string,
  callerId: string,
  stream: MediaStream,
  socket: Socket
) {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal: any) => {
    socket.emit("returning-signal", { signal, callerId });
  });

  peer.signal(incomingSiganl);
  return peer;
}
