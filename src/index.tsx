import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./app";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";
import "./index.css";

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todoapp')
);
