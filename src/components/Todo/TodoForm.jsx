import React from 'react'
import { useState } from 'react'
import styles from './TodoForm.module.scss'

function TodoForm({ addTodo }) {
	const [text, setText] = useState('')

	const onSubmitHandler = event => {
		event.preventDefault()
		addTodo(text)
		setText('')
	}

	return (
		<div className={styles.todoForm}>
			<form onSubmit={onSubmitHandler}>
				<input
					type="text"
					placeholder="Enter a new Todo"
					value={text}
					onChange={e => setText(e.target.value)}
					required
				/>
				<input type="submit" value="Submit"></input>
			</form>
		</div>
	)
}

export default TodoForm
