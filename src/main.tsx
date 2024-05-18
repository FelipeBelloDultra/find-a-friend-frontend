import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "~/plugins/i18n";

import { App } from "~/app";

import "~/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
