import "./App.css";
import { useRoutes } from "react-router-dom";

import { routes } from "./routes";
import { Layout } from "./components";
import WebSocketContextProvider from "./context";

function App() {
  const routing = useRoutes(routes);
  return (
    <WebSocketContextProvider>
      <Layout>
        <div className="App">{routing}</div>
      </Layout>
    </WebSocketContextProvider>
  );
}

export default App;
