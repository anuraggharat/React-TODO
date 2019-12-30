import React from 'react';
import Header from './Header'

import './App.scss';

class App extends React.Component{

  constructor(props){
    
    super(props)
    this.state ={
      newItem:"",
      list:[]
    }
    this.addItem=this.addItem.bind(this)
    this.updateInput=this.updateInput.bind(this)
    this.deleteItem=this.deleteItem.bind(this)
  }

  addItem(todoValue){
    if (todoValue !== ""){
        const newItem = {
          id:Date.now(),
          value:todoValue,
          isDone:false
        };
        const list = [...this.state.list];
        list.push(newItem);
        this.setState({
          list,
          newItem : ""
        });
      }
  }
  deleteItem(id){
    const list =[...this.state.list];
    const updatedlist =list.filter(item => item.id !== id);
    this.setState({
      list:updatedlist
    });
  }
  updateInput(input)
  {
    this.setState(
      {
        newItem:input
      }
    )
  }
  checkItem(id){
    this.setState(prevState => {
      const updatedTodos = prevState.list.map(todo => {
          if (todo.id === id) {
              return {
                  ...todo,
                  isDone: !todo.isDone
              }
          }
          return todo
      })
      return {
          list: updatedTodos
      }
  })
  
}

  
  render(){
    const complete={color:"red"}
    const incomplete={color:"blue"}
      return (
        <div className="container">
          <Header />
          <div className="body">
            <div class="card">
                <input 
                type="text" 
                name="todotask"
                placeholder = "Add a new task"
                required
                
                
                onChange={e => this.updateInput(e.target.value)}
                value={this.state.newItem}>
                </input>
                <button 
                className="add-btn"
                onClick={() => this.addItem(this.state.newItem)}> 
                Add
                </button>
            </div>
            <div className="card">
            <h1>
                TASKS TO BE DONE
            </h1>
            <ul>
              {this.state.list.map(item =>{
                return (
                <li key ={item.id} style={item.isDone ? complete : incomplete} ><input type="checkbox" checked={item.isDone} onChange={()=>this.checkItem(item.id)}></input>{item.value}<button className="delete-btn" onClick={() => this.deleteItem(item.id)}>delete</button></li>
                )}
                )}
                
            </ul>
            </div>

        </div>
        </div>


    )}
}




export default App;
