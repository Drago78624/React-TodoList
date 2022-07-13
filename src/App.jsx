import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

  useEffect(()=>{
      localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const displayTodos = todos.map((todo) => {
    return (
      <div className="todo-container bg-purple-500 mt-5 p-2 text-gray-200 flex justify-between rounded-md items-center">
        <div className="todo-content">
          <h2 className="font-semibold text-lg capitalize">{todo.todoTitle}</h2>
          <p className="w-full">{todo.todoDescription}</p>
        </div>
        <button
          className="deleteBtn bg-pink-400 px-6 py-2 rounded-md text-black"
          onClick={(event) => deleteTodo(event, todo.todoId)}
        >
          Delete
        </button>
      </div>
    );
  });

  function addTodo(e) {
    e.preventDefault();
    const titleInput = e.target[0];
    const descriptionInput = e.target[1];
    if (titleInput.value !== "" && descriptionInput.value !== "") {
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            todoId: prevTodos.length + 1,
            todoTitle: titleInput.value,
            todoDescription: descriptionInput.value,
          },
        ];
      });
      titleInput.value = ""
      descriptionInput.value = ""
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
      <div className="container-md p-5 bg-white rounded-md max-w-lg w-full">
        <h1 className="mb-5 text-center text-3xl font-semibold">Todo List</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Todo title"
            name="todoTitle"
            className="block border border-gray-400 w-full mb-3 py-2 px-3 outline-none rounded-md"
          />
          <input
            type="text"
            placeholder="Todo description"
            name="todoDescription"
            className="block border border-gray-400 w-full mb-3 py-2 px-3 outline-none rounded-md"
          />
          <div className="btn-container flex justify-between ">
            <button className="bg-pink-400 px-6 py-2 rounded-md">
              Add Todo
            </button>
            <button
              type="button"
              className="bg-pink-400 px-6 py-2 rounded-md"
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
