import React from "react";
import ReactDOM from "react-dom";
import { TodoModel } from "./todoModel";
import TodoApp from "./app";

// var model = new TodoModel('react-todos');


  ReactDOM.render(
    <TodoApp />,
    document.getElementById('todoapp')
  );
