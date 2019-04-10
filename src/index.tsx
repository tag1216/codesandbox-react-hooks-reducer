import * as React from "react";
import { render } from "react-dom";
import { createAggregate } from "redux-aggregate";

import "./styles.css";

interface State {
  count: number;
}

const initialState = {
  count: 0
};

const increment = (state: State) => ({
  count: state.count + 3
});

const { reducerFactory, creators } = createAggregate({ increment }, "");

const Store = React.createContext(initialState);

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    reducerFactory(initialState),
    initialState
  );
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

const Counter: React.FC<{}> = () => {
  const { state, dispatch } = React.useContext(Store);
  return (
    <div>
      {state.count}
      <button onClick={() => dispatch(creators.increment())}>increment</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Provider>
        <Counter />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
