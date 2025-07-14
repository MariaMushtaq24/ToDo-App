"use client";
import { useState, useEffect } from "react";

// Define a type for each TODO item
type Todo = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    setTodos(stored ? JSON.parse(stored) : []);
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!task.trim()) return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const toggleComplete = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const editTask = (index: number, newText: string) => {
    const updated = [...todos];
    updated[index].text = newText;
    setTodos(updated);
  };

  return (
    <main className="min-h-screen bg-blue-400 text-gray-900 p-24 font-sans">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">TO-DO App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-black rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md"
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    editTask(index, e.currentTarget.innerText)
                  }
                  className={`outline-none ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
