import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers.js'
import {pipe, partial} from './lib/utils'


function middleVH() {
  return`
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
  `;
}

const Header = styled.header`
  background-color: ${props => props.theme ? "#eee" : "#222"}
  color: white;
  height: 150px;
  padding: 20px;
`;

function setColors(txtColor, bgColor) {
  return`
    color: ${txtColor};
    background-color: ${bgColor};
  `;
}

class App extends Component {

  state = {
    todos : [
      {id: 1, name: 'get up all', isCompleted: true},
      {id: 2, name: 'work out', isCompleted: false},
      {id: 3, name: 'office', isCompleted: false},
      {id: 4, name: 'meditate', isCompleted: false}
    ],
    currentTodo : ''
  }

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);

    this.setState({
      todos: updatedTodos
    })
  }

  handleInputChange = (e) => {
    this.setState({
      currentTodo: e.target.value
    })
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)

    this.setState({
      todos: updatedTodos
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isCompleted: false};
    const updatedTodo = addTodo(this.state.todos, newTodo);

    this.setState({
      todos: updatedTodo,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit = (e) => {
    e.preventDefault();

    this.setState({
      errorMessage: 'please add a proper todo'
    })
  }
  render() {
    const submitHandler = (this.state.currentTodo) ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <Header theme="awesome">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Todo</h1>
        </Header>
        <div className="todo-form-cont">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}

          <TodoForm handleInputChange={this.handleInputChange} 
            currentTodo={this.state.currentTodo} 
            handleSubmit={submitHandler} />

          <TodoList 
            handleToggle={this.handleToggle} 
            handleRemove={this.handleRemove}
            todos={this.state.todos} />

          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
