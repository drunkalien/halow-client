import "./App.css";
import { useRoutes } from "react-router-dom";

import { routes } from "./routes";
import { Layout } from "./components";

function App() {
  const routing = useRoutes(routes);
  return (
    <Layout>
      <div className="App">{routing}</div>
    </Layout>
  );
}

export default App;
