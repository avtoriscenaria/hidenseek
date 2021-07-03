import ReactDOM from "react-dom";

import "./index.css";
import AppLayout from "common/containers/AppLayoutContainer";
import Routes from "modules/Navigation";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <AppLayout>
    <Routes />
  </AppLayout>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
