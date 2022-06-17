
declare var Router;
import React, {FC, useState, useEffect} from "react";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./constants";
import { Utils } from "./utils";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";


const TodoApp:FC = () => {
  const [nowShowing, setNowShowing] = useState<string>(ALL_TODOS)
  const [editing, setEditing] = useState<any>(null)
  const [newTodo, setNewTodo] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])
  const [key] = useState('react-todos')

  // effects
  useEffect(()=>{
    fetchTodos()
  },[])
  let footer: any = null;
  let main: any = null;

  const addTodo = (title: string) => {
    const newTodoList:ITodo[] =  [...todos, {id:Utils.uuid(), title, completed: false}]
    setTodos(newTodoList)
    Utils.store(key, newTodoList)
  }
  
  const fetchTodos = ()=>{
    const _todos: ITodo[] = Utils.fetch(key) || [];

    setTodos(_todos);
  }
  const toggleAllList = (checked : Boolean) => {
    const toggledTodoList = todos.map((todo: ITodo) => {
      return Utils.extend({}, todo, {completed: checked});
    })
    setTodos(toggledTodoList)
    Utils.store(key, toggledTodoList)
  }

  const saveTodo = (todoToSave: ITodo, text: string) => {
    const savedTodo = todos.map((todo: ITodo) => {
      return todo.id !== todoToSave.id ? todo : Utils.extend({}, todo, {title: text});
    })

    setTodos(savedTodo)
    Utils.store(key, savedTodo)
  }



  const destroyTodoItem = (todo: ITodo) => {
    const filteredTodos = todos.filter((candidate: ITodo) => candidate.id != todo.id)
    setTodos(filteredTodos)
    Utils.store(key, filteredTodos)
  }

  const toggleTodo = (todoToToggle: ITodo) => {
    const toggleTodoItems = todos.map<ITodo>((todo: ITodo) => {
      return todo.id !== todoToToggle.id ?
            todo :
            Utils.extend({}, todo, {completed: !todo.completed});
    })

    setTodos(toggleTodoItems)
    Utils.store(key, toggleTodoItems)
  }

  const clearCompletedTodos = () => {
    const cleared = todos.filter((todo: ITodo) => !todo.completed)
    setTodos(cleared)
    Utils.store(key, cleared)
  }

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
			addTodo(val);
      setNewTodo('')
    }
  }

  const toggleAll = (event : React.FormEvent) => {
    const target : any = event.target;
    const checked = target.checked;
    toggleAllList(checked);
  }

  const toggle = (todoToToggle : ITodo) => {
    toggleTodo(todoToToggle);
  }

  const destroy = (todo : ITodo) => {
    destroyTodoItem(todo);
  }

  const edit = (todo : ITodo) => {
    setEditing(todo.id)
  }

 
  const save = (todoToSave : ITodo, text : string) => {
		saveTodo(todoToSave, text);
    setEditing(null)
  }

  const cancel = () => {
    setEditing(null)
  }

  const clearCompleted = () => {
    clearCompletedTodos();
  }

  const shownTodos = todos.filter((todo) => {
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
        onUpdate={(editText)=>{ save(todo, editText)}}
        editing={editing === todo.id}
        onSave={() => save(todo, newTodo)}
        onCancel={ cancel }
      />
    );
  });

  const activeTodoCount = todos.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  const completedCount = todos.length - activeTodoCount;

  if (activeTodoCount || completedCount) {
    footer =
      <TodoFooter
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={nowShowing}
        onClearCompleted={ e=> clearCompleted() }
      />;
  }

  if (todos.length) {
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

// class TodoApp extends React.Component<IAppProps, IAppState> {

//   public state : IAppState;

//   constructor(props : IAppProps) {
//     super(props);
//     this.state = {
//       nowShowing: ALL_TODOS,
//       editing: null
//     };
//   }

//   public componentDidMount() {
//     var setState = this.setState;
//     var router = Router({
//       '/': setState.bind(this, {nowShowing: ALL_TODOS}),
//       '/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
//       '/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
//     });
//     router.init('/');
//   }

//   public handleNewTodoKeyDown(event : React.KeyboardEvent) {
//     if (event.key !== ENTER_KEY) {
//       return;
//     }

//     event.preventDefault();

//     var val = (ReactDOM.findDOMNode(this.refs["newField"]) as HTMLInputElement).value.trim();

//     if (val) {
// 			this.props.model.addTodo(val);
//       (ReactDOM.findDOMNode(this.refs["newField"]) as HTMLInputElement).value = '';
//     }
//   }

//   public toggleAll(event : React.FormEvent) {
//     var target : any = event.target;
//     var checked = target.checked;
//     this.props.model.toggleAll(checked);
//   }

//   public toggle(todoToToggle : ITodo) {
//     this.props.model.toggle(todoToToggle);
//   }

//   public destroy(todo : ITodo) {
//     this.props.model.destroy(todo);
//   }

//   public edit(todo : ITodo) {
//     this.setState({editing: todo.id});
//   }

//   public save(todoToSave : ITodo, text : string) {
// 		this.props.model.save(todoToSave, text);
//     this.setState({editing: null});
//   }

//   public cancel() {
//     this.setState({editing: null});
//   }

//   public clearCompleted() {
//     this.props.model.clearCompleted();
//   }

//   public render() {
//     var footer;
//     var main;
//     const todos = this.props.model.todos;

//     var shownTodos = todos.filter((todo) => {
//       switch (this.state.nowShowing) {
//       case ACTIVE_TODOS:
//         return !todo.completed;
//       case COMPLETED_TODOS:
//         return todo.completed;
//       default:
//         return true;
//       }
//     });

//     var todoItems = shownTodos.map((todo) => {
//       return (
//         <TodoItem
//           key={todo.id}
//           todo={todo}
//           onToggle={this.toggle.bind(this, todo)}
//           onDestroy={this.destroy.bind(this, todo)}
//           onEdit={this.edit.bind(this, todo)}
//           editing={this.state.editing === todo.id}
//           onSave={this.save.bind(this, todo)}
//           onCancel={ e => this.cancel() }
//         />
//       );
//     });

//     // Note: It's usually better to use immutable data structures since they're
//     // easier to reason about and React works very well with them. That's why
//     // we use map(), filter() and reduce() everywhere instead of mutating the
//     // array or todo items themselves.
//     var activeTodoCount = todos.reduce(function (accum, todo) {
//       return todo.completed ? accum : accum + 1;
//     }, 0);

//     var completedCount = todos.length - activeTodoCount;

//     if (activeTodoCount || completedCount) {
//       footer =
//         <TodoFooter
//           count={activeTodoCount}
//           completedCount={completedCount}
//           nowShowing={this.state.nowShowing}
//           onClearCompleted={ e=> this.clearCompleted() }
//         />;
//     }

//     if (todos.length) {
//       main = (
//         <section className="main">
//           <input
//             id="toggle-all"
//             className="toggle-all"
//             type="checkbox"
//             onChange={ e => this.toggleAll(e) }
//             checked={activeTodoCount === 0}
//           />
//           <label
//             htmlFor="toggle-all"
//           >
//             Mark all as complete
//           </label>
//           <ul className="todo-list">
//             {todoItems}
//           </ul>
//         </section>
//       );
//     }

//     return (
//       <div>
//         <header className="header">
//           <h1>todos</h1>
//           <input
//             ref="newField"
//             className="new-todo"
//             placeholder="What needs to be done?"
//             onKeyDown={ e => this.handleNewTodoKeyDown(e) }
//             autoFocus={true}
//           />
//         </header>
//         {main}
//         {footer}
//       </div>
//     );
//   }
// }


