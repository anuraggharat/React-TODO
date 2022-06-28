import React, { useState } from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import "./App.css";


export default function App() {


  const[todos,setTodos]=useState([
        {
          id: 1,
          value: "Start writing",
          isDone: false,
        },
        {
          id: 2,
          value: "Work More",
          isDone: false,
        },
      ])
    
  const[newTodo,setNewTodo] = useState("")

function  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: todos.length +1,
        value: todoValue,
        isDone: false,
      };
      const list = [...todos];
      list.push(newItem);
          setTodos(list);

    }
    setNewTodo("")
  }
  function deleteItem(id) {
    const list = [...todos];
    const updatedlist = list.filter((item) => item.id !== id);
    setTodos(updatedlist)
  }

  function updateInput(input) {
    setNewTodo(input)
  }
  function checkItem(id) {
    const list = [...todos]
    list.map((item)=>{
      if(item.id == id){
        item.isDone= !todos[item.id-1].isDone
      }
    })
    setTodos(list)
  }
      const complete = {
        color: "#707070",
        fontSize: "24px",
        fontFamily: "cursive",
        fontStyle: "italic",
        textDecoration: "line-through",
      };
      const incomplete = {
        color: "#000",
        fontSize: "24px",
        fontFamily: "cursive",
      };

  return (
    <div className="container">
      <div className="card">
        <input
          type="text"
          name="todotask"
          placeholder="Add a new task"
          className="todo"
          required
          onChange={(e) => updateInput(e.target.value)}
          value={newTodo}
        ></input>
        <button className="add-btn" onClick={() => addItem(newTodo)}>
          <BsPlus className="fa-3x " />
        </button>
      </div>
      <div>
        {todos.map((item, key) => (
          <div className="item" key={key}>
            <input
              type="checkbox"
              className="checkbox"
              checked={item.isDone}
              onChange={() => checkItem(item.id)}
            ></input>
            <p style={item.isDone ? complete : incomplete}>{item.value}</p>
            <button className="delete-btn" onClick={() => deleteItem(item.id)}>
              <BsTrash className="fa-2x color-red " />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

