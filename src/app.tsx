import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

const App = () => {
  const elem = useRoutes(routes);
  return elem;
};

export default App;
