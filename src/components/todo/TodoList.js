import React from 'react';
import {TodoItem} from './TodoItem'

export const TodoList = (props) => (
	<div className="todo-list-cont">
	  <ul className="todo-list">
	    {props.todos.map(todo => <TodoItem handleToggle={props.handleToggle} handleRemove={props.handleRemove} key={todo.id} {...todo} />)}
	  </ul>
	</div>                               
)