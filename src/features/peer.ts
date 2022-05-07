import Peer from "simple-peer";
import { Socket } from "socket.io-client";

export function createPeer(
  userToSignal: string,
  callerId: string,
  stream: MediaStream,
  socket: Socket,
  currentUser: object
) {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal: Peer.SignalData) => {
    socket.emit("sending-signal", {
      userToSignal,
      callerId,
      signal,
      currentUser,
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

  peer.on("signal", (signal: Peer.SignalData) => {
    socket.emit("returning-signal", { signal, callerId });
  });

  peer.signal(incomingSiganl);
  return peer;
}
