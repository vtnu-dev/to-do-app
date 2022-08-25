import React from 'react'
import { RiFileListLine, RiDeleteBin2Line } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import styles from './Todo.module.scss'

function Todo({ todo, deleteTodo, toggleTodo }) {
	return (
		<div className={`${styles.todo}  ${todo.isCompleted ? styles.isCompleted : ''}`}>
			<RiFileListLine className={`${styles.iconList}`} />
			<div className={`${styles.text}`}>{todo.text}</div>
			<RiDeleteBin2Line className={`${styles.iconBin} ${styles.icons}`} onClick={() => deleteTodo(todo.id)} />
			<FaCheck className={` ${styles.iconCheck} ${styles.icons} `} onClick={() => toggleTodo(todo.id)} />
		</div>
	)
}

export default Todo
