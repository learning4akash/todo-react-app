import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

export default function App() {

  // Add todo 

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getTodos = localStorage.getItem("todos");
      return () => {
        setTodos(JSON.parse(getTodos));
      }
    }  
  },[]);

  const [todo, setTodo] = useState({text: ""});
  const  handleInputChange = (e) => {
    setTodo({
      text: e.target.value,
    })
  }

  useEffect(() => {
    
    if (typeof window !== 'undefined') 
    {
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
  const [editTodo, setEditTodo] = useState({});
  const inputRef = useRef(null);
  const EditInputRef = useRef(null);

  const editTodos = (todo) => {
    isEditing(true);
    setEditTodo({...todo})
  }

  useEffect(() => {

      inputRef.current?.focus();
  },[todos])

  useEffect(() => {
    if (editing) {
      EditInputRef.current?.focus();
    }
  },[editing])

  const handleEditInputChange = (e) => {
      setEditTodo({
        ...editTodo,
        text: e.target.value
      })
  }

  const storeTodos = () => {
    setTodos([
      ...todos,
        {
          id : todos.length + 1,
          ...todo,
          completed : false,
        }
     ])
    setTodo({text: ""}) 
  }

  const resetTodo = () => {
    setTodo({text: ""})
    setEditTodo({text: ""})
    isEditing(false)  
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {

      // if (isEditing) {
      //   return updateTodo(editTodo.id, editTodo)
      // }

      if (!todo.text.length) {
        alert("empty todo");
        return
      }
    

     return storeTodos();
    }

    if (e.keyCode === 27) {
      return resetTodo();
    }
  
  }

  const updateTodo = (id, updateTodo) => {
    if (!updateTodo.text.length) {
      alert("edit empty todo ");
      return 
    }
    const updateTodoItem = todos.map((todo) => {
      return todo.id === id ? updateTodo : todo
    })
    isEditing(false)
    return setTodos(updateTodoItem);
  }

  const deleteTodo = (id) => {
      const removeItem = todos.map((todo) => {
         return todo.id !== id;
      })

      console.log(removeItem);
  }

  const remaining = () => {
    return todos.filter(todo => !todo.completed).length
  }

  const completed = () => {
    return todos.filter(todo => todo.completed).length
  }

  return (
        <div className="bg-orange-100 flex justify-center pt-10 h-screen">
            <div className="w-full mx-3">
              <div className="text-center mb-5">
                  <h1 className="text-3xl font-bold uppercase">Todo List</h1>
              </div>
              {editing ? (
                <div className="">
                  <div className="flex justify-center">
                    <input type="text" onKeyDown={handleKeyDown} ref={EditInputRef} name="todo" value={editTodo.text} className="bg-white-200 px-5 w-4/12	py-2 rounded-full outline-none text-black" placeholder="Edit Todo" 
                    onChange={handleEditInputChange}/>
                  </div>
                  <small className="flex justify-center mt-2  text-gray-400 ">Todo Save Press Enter Button. Exit Press Escape Button </small>
                </div>
              ):(
                <div className="">
                 
                  <div className="flex justify-center">
                    <input type="text" ref={inputRef} onKeyDown={handleKeyDown}  className="  bg-white-200 px-5 w-4/12	 py-2 rounded-full outline-none text-black" placeholder="Add Todo" 
                     onChange={handleInputChange} value={todo.text }/>
                  </div>
                  <small className="flex justify-center mt-2  text-gray-400  ">Todo Save Press Enter Button. Exit Press Escape Button </small>
                </div>
              )}
             
              <ul>
                <div className="bg-white rounded-lg shadow-lg flex flex-col p-4 m-auto justify-center w-1/3 gap-2 mt-5">
            
                <small className="block mb-5 mt-0 text-xl text-gray-500">{remaining()} Todos pending , {completed()} Completed.</small> 
                    { todos.map((todo) => (
                        todo.completed == false ? (
                          <li key={todo.id}>
                            <input disabled={editing} type="checkbox" className="peer w-3 h-3 rounded  dark:border-gray-600"  onChange={() => completeTodo(todo.id)} defaultChecked={todo.completed}/>
                              <span className=" inline ml-2 peer-checked:line-through peer-checked:text-gray-400 transition-all">
                                {todo.text}
                              </span>
                            
                              <span className=" flex justify-end -mt-6">
                                <div>
                                    <button className=""  onClick={() => editTodos(todo)}><FaRegPenToSquare /></button>
                                </div>
                                <div>
                                  <button className="ml-2" onClick={() => deleteTodo(todo)}><FaRegTrashCan /></button>
                                </div>
                              </span>
                               
                          </li>
                        ) : ""

                    ))}
                </div>
              </ul> 
              
              <div className="bg-white rounded-lg shadow-lg flex flex-col p-4 m-auto justify-center w-1/3 gap-2 mt-5">
                    <h1></h1>
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