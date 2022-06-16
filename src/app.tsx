
declare var Router;
import React, {FC, useState} from "react";
import ReactDOM from "react-dom";
import { TodoModel } from "./todoModel";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./constants";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

const TodoApp:FC<IAppProps> = ({model}) => {
  const [nowShowing, setNowShowing] = useState<string>(ALL_TODOS)
  const [editing, setEditing] = useState<any>(null)
  const [newTodo, setNewTodo] = useState<string>('')
  let footer: any = null;
  let main: any = null;

  const handleChange = (event) => {
    setNewTodo(event.target.value)
  }

  const handleNewTodoKeyDown = (event : React.KeyboardEvent) => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = newTodo.trim();

    if (val) {
			model.addTodo(val);
      setNewTodo('')
    }
  }

  const toggleAll = (event : React.FormEvent) => {
    const target : any = event.target;
    const checked = target.checked;
    model.toggleAll(checked);
  }

  const toggle = (todoToToggle : ITodo) => {
    model.toggle(todoToToggle);
  }

  const destroy = (todo : ITodo) => {
    model.destroy(todo);
  }

  const edit = (todo : ITodo) => {
    setEditing(todo.id)
  }

  const save = (todoToSave : ITodo, text : string) => {
		model.save(todoToSave, text);
    setEditing(null)
  }

  const cancel = () => {
    setEditing(null)
  }

  const clearCompleted = () => {
    model.clearCompleted();
  }

  const shownTodos = model.todos.filter((todo) => {
    switch (nowShowing) {
    case ACTIVE_TODOS:
      return !todo.completed;
    case COMPLETED_TODOS:
      return todo.completed;
    default:
      return true;
    }
  });

  const todoItems = shownTodos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={() => toggle(todo)}
        onDestroy={() => destroy(todo)}
        onEdit={() => edit(todo)}
        editing={editing === todo.id}
        onSave={() => save(todo, newTodo)}
        onCancel={ cancel }
      />
    );
  });

  const activeTodoCount = model.todos.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  const completedCount = model.todos.length - activeTodoCount;

  if (activeTodoCount || completedCount) {
    footer =
      <TodoFooter
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={nowShowing}
        onClearCompleted={ e=> clearCompleted() }
      />;
  }

  if (model.todos.length) {
    main = (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={ e => toggleAll(e) }
          checked={activeTodoCount === 0}
        />
        <label
          htmlFor="toggle-all"
        >
          Mark all as complete
        </label>
        <ul className="todo-list">
          {todoItems}
        </ul>
      </section>
    );
  }

  return (
    
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onKeyDown={ e => handleNewTodoKeyDown(e) }
            autoFocus={true}
            onChange={handleChange}
          />
        </header>
        {main}
        {footer}
      </div>
  )
  
}

export default TodoApp

var model = new TodoModel('react-todos');

function render() {
  ReactDOM.render(
    <TodoApp model={model}/>,
    document.getElementById('todoapp')
  );
}

model.subscribe(render);
render();
