import React from 'react'
import Button from '../UI/Button'
import { RiRefreshLine, RiDeleteBin2Line } from 'react-icons/ri'
import styles from './TodoActions.module.scss'

function TodoActions({resetTodos, deleteCompletedTodos, countTodosExist, todosEmptyExist }) {
	return (
		<div>
			<Button title="Reset all Todos" disabled={todosEmptyExist} onClick={resetTodos}>
				<RiRefreshLine className={styles.refresh} />
			</Button>
			<Button title="Delete completed Todos" disabled={countTodosExist} onClick={deleteCompletedTodos}>
				<RiDeleteBin2Line className={styles.deleteBin} />
			</Button>
		</div>
	)
}

export default TodoActions
