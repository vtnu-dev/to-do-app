import React from 'react'
import Todo from './Todo'
import styles from './TodoList.module.scss'

function TodoList({todo, deleteTodo, toggleTodo}) {
  return (
	 <div className={styles.TodoList}>
		<Todo todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
	 </div>
  )
}

export default TodoList