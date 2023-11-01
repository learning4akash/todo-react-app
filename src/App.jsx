import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function App() {

  // Add todo 

  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const getTodos = localStorage.getItem("todos");
      if (getTodos) {
        return JSON.parse(getTodos)
      }
      return []
    }
  });

  const [todo, setTodo] = useState("");
  function handleInputChange(e) {
    setTodo(e.target.value)
  }

  const  handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
          {
            id : todos.length + 1,
            text: todo,
            completed : false,
          }
       ])
    }
    setTodo("") 
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos])

  const completeTodo = (id) => {
    const completedStatus = todos.map((todo) => {
        if (id === todo.id) {
           return {...todo, completed: !todo.completed}
        }
        return todo;
    })
    setTodos(completedStatus)
  }

  // Edit Todo 
  const [editing, isEditing] = useState(false);
  const [editTodo, setEditTodo] = useState();

  const editTodos = (todo) => {
    isEditing(true);
    setEditTodo({...todo})
  }

  const handleEditInputChange = (e) => {
      setEditTodo({
        ...editTodo,
        text: e.target.value
      })
  }

  const handleEditFromSubmit = (e) => {
    e.preventDefault;
    updateTodo(editTodo.id, editTodo)
  }

  const updateTodo = (id, updateTodo) => {
     console.log(updateTodo);
    if (updateTodo.text !== "" && updateTodo.completed === false) {
      const updateTodoItem = todos.map((todo) => {
        return todo.id === id ? updateTodo : todo;
      });
      return setTodos(updateTodoItem)
    }
    alert("empty todo or todo status true");
  }

  const deleteTodo = (id) => {
      const removeItem = todos.map((todo) => {
         return todo.id !== id;
      })

      console.log(removeItem);
  }


  return (
        <div className="bg-orange-100 flex justify-center pt-10 h-screen">
            <div className="w-full mx-3">
              <div className="text-center mb-5">
                  <h1 className="text-3xl font-bold uppercase">Todo List</h1>
              </div>
              {editing ? (
                <div className="">
                  <form onSubmit={handleEditFromSubmit} className="flex justify-center">
                    <input type="text" name="todo" value={editTodo.text} className="bg-white-200 px-5 w-4/12	py-2 rounded-full outline-none text-black" placeholder="Edit Todo" 
                    onChange={handleEditInputChange}/>
                  </form>
                </div>
              ):(
                <div className="">
                  <form onSubmit={handleFormSubmit} className="flex justify-center">
                    <input type="text"  className="bg-white-200 px-5 w-4/12	 py-2 rounded-full outline-none text-black" placeholder="Add Todo" 
                     onChange={handleInputChange} value={todo}/>
                  </form>
                </div>
              )}
              
              <ul>
                <div className="bg-white rounded-lg shadow-lg flex flex-col p-4 m-auto justify-center w-1/3 gap-2 mt-5">
                 
                    { todos.map((todo) => (
                        todo.completed == false ? (
                          <li key={todo.id}>
                            <input type="checkbox" className="peer w-4 h-4 rounded  dark:border-gray-600"  onChange={() => completeTodo(todo.id)} defaultChecked={todo.completed}/>
                              <span className=" ml-2 peer-checked:line-through peer-checked:text-gray-400 transition-all">
                                {todo.text}
                              </span>
                            
                              <div className="inline">
                                <button className=""  onClick={() => editTodos(todo)}><FaRegPenToSquare /></button>
                                <button className="" onClick={() => deleteTodo(todo)}><FaRegTrashCan /></button>
                              </div>
                               
                          </li>
                        ) : ""

                    ))}
                </div>
              </ul>
              <div className="bg-white rounded-lg shadow-lg flex flex-col p-4 m-auto justify-center w-1/3 gap-2 mt-5">
                    {todos.map((todo) => (
                        todo.completed ? (

                            <li key={todo.id} className="list-none">
                              <input type="checkbox" className="peer w-4 h-4"  onChange={() => completeTodo(todo.id)} defaultChecked={todo.completed}/>
                                <span className=" ml-2 peer-checked:line-through peer-checked:text-gray-400 transition-all">
                                  {todo.text}
                                </span>
                            </li>
                          ) : ''
                       
                    )) }
              </div>
             
            </div>
        </div>
  )
}