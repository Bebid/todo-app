import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { TodosContextProvider } from "./store/todos-context";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact>
                    <TodosContextProvider>
                        <Home />
                    </TodosContextProvider>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
