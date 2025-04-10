import React from "react";
import ReactDOM from "react-dom"; // ✅ 傳統 ReactDOM API
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM, // ✅ 不用 ReactDOMClient
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
