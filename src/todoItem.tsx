/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import React, {FC, useState, memo} from "react";
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
    if (event.key === ESCAPE_KEY) {
      setEditText(todo.title);
      onCancel(event);
    } else if (event.key === ENTER_KEY) {
      handleSubmit();
    }
  }

  const handleChange = (event : React.FormEvent) => {
    let input : any = event.target;
    setEditText(input.value);
  }

  // const validateTodo = () :Boolean =>{

  //   // check whether there are any tags
  //   if(todo.title.match())
  //   return false ;
  // }
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

          {
            todo.title.match(/@[a-zA-Z0-9]/gi) ? 
            todo.title.split(" ").filter(word=> word.match(/^@[a-zA-Z0-9]/gi) === null ).join(" ").trim()   :
          todo.title
          }
        </label>

        {todo.title.match(/@[a-zA-Z0-9]/gi) && <ul className="taglist">

          {
            todo.title.split(" ").filter(word=> word.match(/^@[a-zA-Z0-9]/gi) !== null).map((tag,i)=> <li key={i}>{tag.replace("@", "")}</li>)
          }
        </ul>}
       
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
