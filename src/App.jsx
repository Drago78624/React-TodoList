import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  console.log(formData)

  useEffect(()=>{
      localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const displayTodos = todos.map((todo, i) => {
    return (
      <div key={i} className="todo-container bg-purple-500 mt-5 p-2 text-gray-200 flex justify-between rounded-md items-center">
        <div className="todo-content">
          <h2 className="font-semibold text-lg capitalize">{todo.todoTitle}</h2>
          <p className="w-full">{todo.todoDescription}</p>
        </div>
        <button
          className="deleteBtn bg-pink-400 px-6 py-2 rounded-md text-black hover:bg-pink-500 transition-colors"
          onClick={(event) => deleteTodo(event, todo.todoId)}
        >
          Delete
        </button>
      </div>
    );
  });

  function handleChange(e){
    const {name, value} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name] : value
      }
    })
  }

  function addTodo(e) {
    e.preventDefault()
    if (formData.title !== "" && formData.description !== "") {
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            todoId: prevTodos.length + 1,
            todoTitle: formData.title,
            todoDescription: formData.description,
          },
        ];
      });
      setFormData({
        title: "",
        description: ""
      })
    }
  }

  function deleteTodo(event, todoId) {
    setTodos((prevTodos) => {
      return prevTodos.filter((prevTodo) => {
        return prevTodo.todoId !== todoId;
      });
    });
  }

  function deleteAll() {
    setTodos([]);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center mx-auto px-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container-md p-5 bg-white rounded-md max-w-lg w-full shadow-2xl">
        <h1 className="mb-5 text-center text-3xl font-semibold">Todo List</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Todo title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block border border-gray-400 w-full mb-3 py-2 px-3 outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Todo description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block border border-gray-400 w-full mb-3 py-2 px-3 outline-none rounded-md"
          />
          <div className="btn-container flex justify-between ">
            <button className="bg-pink-400 px-6 py-2 rounded-md hover:bg-pink-500 transition-colors" onClick={addTodo}>
              Add Todo
            </button>
            <button
              type="button"
              className="bg-pink-400 px-6 py-2 rounded-md hover:bg-pink-500 transition-colors"
              onClick={deleteAll}
            >
              Delete All
            </button>
          </div>
        </form>
        {displayTodos}
      </div>
    </div>
  );
}
