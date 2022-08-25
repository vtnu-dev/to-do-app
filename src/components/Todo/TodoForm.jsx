import React from 'react'
import { useState } from 'react'
import Button from '../UI/Button'
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
				<Button type="submit" title="Submit">
					Submit
				</Button>
			</form>
		</div>
	)
}

export default TodoForm
