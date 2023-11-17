
const InputTodo = ({inputRef, handleKeyDown, handleInputChange, todo, placeholder}) => {
    return (
        <div className="">         
        <div className="flex justify-center">
          <input type="text" ref={inputRef} onKeyDown={handleKeyDown}  className="  bg-white-200 px-5 w-4/12 py-2 rounded-full outline-none text-black"
           onChange={handleInputChange} value={todo.text } placeholder={placeholder}
          /> 
        </div>
        <small className="flex justify-center mt-2  text-gray-400  ">Todo Save Press Enter Button. Exit Press Escape Button </small>
      </div>
    )
}

export default InputTodo;