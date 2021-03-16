import React from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [
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
      ],
    };
    this.addItem = this.addItem.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
      };
      const list = [...this.state.list];
      list.push(newItem);
      this.setState({
        list,
        newItem: "",
      });
    }
  }
  deleteItem(id) {
    const list = [...this.state.list];
    const updatedlist = list.filter((item) => item.id !== id);
    this.setState({
      list: updatedlist,
    });
  }
  updateInput(input) {
    this.setState({
      newItem: input,
    });
  }
  checkItem(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.list.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
      return {
        list: updatedTodos,
      };
    });
  }

  render() {
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
            onChange={(e) => this.updateInput(e.target.value)}
            value={this.state.newItem}
          ></input>
          <button
            className="add-btn"
            onClick={() => this.addItem(this.state.newItem)}
          >
            <BsPlus className="fa-3x " />
          </button>
        </div>
        <div>
          {this.state.list.map((item, key) => {
            return (
              <div className="item" key={key}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={item.isDone}
                  onChange={() => this.checkItem(item.id)}
                ></input>
                <p style={item.isDone ? complete : incomplete}>{item.value}</p>
                <button
                  className="delete-btn"
                  onClick={() => this.deleteItem(item.id)}
                >
                  <BsTrash className="fa-2x color-red " />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
