/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import classNames from "classnames";
import React, {FC, memo} from "react";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";
import { Utils } from "./utils";

const TodoFooter:FC<ITodoFooterProps> = memo(({completedCount, onClearCompleted, nowShowing, count}) => {
  const activeTodoWord: string = Utils.pluralize(count, 'item')
  let clearButton: any = null

  if(completedCount > 0) {
    clearButton = (
      <button
        className="clear-completed"
        onClick={onClearCompleted}>
        Clear completed
      </button>
    );
  }

  return (
    <footer className="footer">
    <span className="todo-count">
      <strong>{count}</strong> {activeTodoWord} left
    </span>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({selected: nowShowing === ALL_TODOS})}>
            All
        </a>
      </li>
      {' '}
      <li>
        <a
          href="#/active"
          className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
            Active
        </a>
      </li>
      {' '}
      <li>
        <a
          href="#/completed"
          className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
            Completed
        </a>
      </li>
    </ul>
    {clearButton}
  </footer>
  )
})

export { TodoFooter };


// class TodoFooter extends React.Component<ITodoFooterProps, {}> {

//   public render() {
//     var activeTodoWord = Utils.pluralize(this.props.count, 'item');
//     var clearButton = null;

//     if (this.props.completedCount > 0) {
//       clearButton = (
//         <button
//           className="clear-completed"
//           onClick={this.props.onClearCompleted}>
//           Clear completed
//         </button>
//       );
//     }

//     const nowShowing = this.props.nowShowing;
//     return (
//       <footer className="footer">
//         <span className="todo-count">
//           <strong>{this.props.count}</strong> {activeTodoWord} left
//         </span>
//         <ul className="filters">
//           <li>
//             <a
//               href="#/"
//               className={classNames({selected: nowShowing === ALL_TODOS})}>
//                 All
//             </a>
//           </li>
//           {' '}
//           <li>
//             <a
//               href="#/active"
//               className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
//                 Active
//             </a>
//           </li>
//           {' '}
//           <li>
//             <a
//               href="#/completed"
//               className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
//                 Completed
//             </a>
//           </li>
//         </ul>
//         {clearButton}
//       </footer>
//     );
//   }
// }