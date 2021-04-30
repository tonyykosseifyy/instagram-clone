import ReactDOM from "react-dom";
import App from "./App";

import { createStore } from "redux"; 
import { reducer } from './reducer' ;
import { Provider } from "react-redux";

const store = createStore(reducer);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider> ,
  rootElement
);
