import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
