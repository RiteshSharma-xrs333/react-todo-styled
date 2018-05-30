import React from 'react'
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
	const handleToggle = partial(props.handleToggle, props.id)
	const handleRemove = partial(props.handleRemove, props.id)
	return (
    <li key={props.id}>
			<a href='#' onClick={handleRemove}>X</a>
      <input type="checkbox" onChange={handleToggle} checked= {props.isCompleted}/> {props.name} 
    </li>
	)
}