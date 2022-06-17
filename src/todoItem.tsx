/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import React, {FC, useState, memo, useRef, useEffect} from "react";
import { ENTER_KEY, ESCAPE_KEY } from "./constants";

const TodoItem:FC<ITodoItemProps> = memo(({
  todo,
  editing,
  onSave,
  onUpdate,
  onDestroy,
  onCancel,
  onEdit,
  onToggle
}) => {
  const [editText, setEditText] = useState<string>(todo.title)
  const focusRef = useRef<HTMLInputElement | null>()

  //EFFECTS
  useEffect(()=>{
    if(editing){
      console.log(editing, 'hey there')
      focusRef.current.focus()
    }
  },[editing])


  const handleSubmit = () => {
    var val = editText.trim();
    if (val) {
      onEdit();
      setEditText(val);
      onUpdate(val);
    } else {
      onDestroy();
    }
  }

  const handleEdit = () => {
  onEdit();
  setEditText(todo.title);
  focusRef.current.focus();
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
        ref={focusRef}

        onBlur={ handleSubmit }
        onChange={ e => handleChange(e) }
        onKeyDown={ e => handleKeyDown(e) }
      />
    </li>
  )
})

export { TodoItem };



// class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

//   public state : ITodoItemState;

//   constructor(props : ITodoItemProps){
//     super(props);
//     this.state = { editText: this.props.todo.title };
//   }

//   public handleSubmit(event : React.FormEvent) {
//     var val = this.state.editText.trim();
//     if (val) {
//       this.props.onSave(val);
//       this.setState({editText: val});
//     } else {
//       this.props.onDestroy();
//     }
//   }

//   public handleEdit() {
//     this.props.onEdit();
//     this.setState({editText: this.props.todo.title});
//   }

//   public handleKeyDown(event : React.KeyboardEvent) {
//     if (event.keyCode === ESCAPE_KEY) {
//       this.setState({editText: this.props.todo.title});
//       this.props.onCancel(event);
//     } else if (event.keyCode === ENTER_KEY) {
//       this.handleSubmit(event);
//     }
//   }

//   public handleChange(event : React.FormEvent) {
//     var input : any = event.target;
//     this.setState({ editText : input.value });
//   }

//   /**
//    * This is a completely optional performance enhancement that you can
//    * implement on any React component. If you were to delete this method
//    * the app would still work correctly (and still be very performant!), we
//    * just use it as an example of how little code it takes to get an order
//    * of magnitude performance improvement.
//    */
//   public shouldComponentUpdate(nextProps : ITodoItemProps, nextState : ITodoItemState) {
//     return (
//       nextProps.todo !== this.props.todo ||
//       nextProps.editing !== this.props.editing ||
//       nextState.editText !== this.state.editText
//     );
//   }

//   /**
//    * Safely manipulate the DOM after updating the state when invoking
//    * `this.props.onEdit()` in the `handleEdit` method above.
//    * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
//    * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
//    */
//   public componentDidUpdate(prevProps : ITodoItemProps) {
//     if (!prevProps.editing && this.props.editing) {
//       var node = (ReactDOM.findDOMNode(this.refs["editField"]) as HTMLInputElement);
//       node.focus();
//       node.setSelectionRange(node.value.length, node.value.length);
//     }
//   }

//   public render() {
//     return (
//       <li className={classNames({
//         completed: this.props.todo.completed,
//         editing: this.props.editing
//       })}>
//         <div className="view">
//           <input
//             className="toggle"
//             type="checkbox"
//             checked={this.props.todo.completed}
//             onChange={this.props.onToggle}
//           />
//           <label onDoubleClick={ e => this.handleEdit() }>
//             {this.props.todo.title}
//           </label>
//           <button className="destroy" onClick={this.props.onDestroy} />
//         </div>
//         <input
//           ref="editField"
//           className="edit"
//           value={this.state.editText}
//           onBlur={ e => this.handleSubmit(e) }
//           onChange={ e => this.handleChange(e) }
//           onKeyDown={ e => this.handleKeyDown(e) }
//         />
//       </li>
//     );
//   }
// }