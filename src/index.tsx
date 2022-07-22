/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "tippy.js/dist/tippy.css";
import { App } from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
