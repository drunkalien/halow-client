import { SocketConnectOpts } from "net";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

export const WebsocketContext = createContext<Socket | null>(null);

const WebsocketProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [connection, setConnection] = useState<Socket | null>(null);

  const options: SocketConnectOpts | {} = useMemo(() => ({}), []);

  useEffect(() => {
    try {
      const socketConnection = io(
        // "https://halow-server.herokuapp.com:5001/",
        // "http://localhost:5001",
        "https://deda-89-236-216-219.eu.ngrok.io/",
        options
      ).connect();
      setConnection(socketConnection);
    } catch (err) {
      console.log(err);
    }
  }, [options]);

  return (
    <WebsocketContext.Provider value={connection}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = (): Socket | null => {
  const ctx = useContext(WebsocketContext);
  if (ctx === undefined) {
    throw new Error("useWebsocket can only be used inside WebsocketContext");
  }
  return ctx;
};

export default WebsocketProvider;
