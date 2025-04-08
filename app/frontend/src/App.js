// Example: A basic to-do list component
import React, { useState } from 'react';
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('');
  };
  return (
    <div>
      <h1>DevOps To-Do List</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;

