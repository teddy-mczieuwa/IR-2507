/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import classNames from "classnames";
import React, {FC, useState, memo} from "react";
import ReactDOM from "react-dom";
import { ENTER_KEY, ESCAPE_KEY } from "./constants";

const TodoItem:FC<ITodoItemProps> = memo(({

  todo,
  editing,
  onSave,
  onDestroy,
  onCancel,
  onEdit,
  onToggle
}) => {
  const [editText, setEditText] = useState<string>(todo.title)

  const handleSubmit = () => {
    var val = editText.trim();
    if (val) {
      onSave(val);
      setEditText(val);
    } else {
      onDestroy();
    }
  }

  const handleEdit = () => {
    onEdit();
    setEditText(todo.title);
  }

  const handleKeyDown = (event : React.KeyboardEvent) => {
    if (event.keyCode === ESCAPE_KEY) {
      setEditText(todo.title);
      onCancel(event);
    } else if (event.keyCode === ENTER_KEY) {
      handleSubmit();
    }
  }

  const handleChange = (event : React.FormEvent) => {
    let input : any = event.target;
    setEditText(input.value);
  }

  return (
    <li className={`${editing ? 'editing' : ''} ${todo.completed ? 'completed' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <label onDoubleClick={ () => handleEdit() }>
          {todo.title}
        </label>
        <button className="destroy" onClick={onDestroy} />
      </div>
      <input
        className="edit"
        value={editText}
        onBlur={ handleSubmit }
        onChange={ e => handleChange(e) }
        onKeyDown={ e => handleKeyDown(e) }
      />
    </li>
  )
})

export { TodoItem };
