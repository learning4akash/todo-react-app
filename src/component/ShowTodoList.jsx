
const ShowTodoList = ({todo, editing, completeTodo, editTodos, deleteTodo, FaRegPenToSquare, FaRegTrashCan}) => {
    return (
        <li key={todo.id}>
        <input disabled={editing} type="checkbox" className="peer w-3 h-3 rounded dark:border-gray-600"
           onChange={() => completeTodo(todo.id)} defaultChecked={todo.completed}/>
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
    )
}
export default ShowTodoList;