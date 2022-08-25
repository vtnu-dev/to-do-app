import { useState, useEffect } from 'react'
import TodoActions from './components/Todo/TodoActions'
import TodoForm from './components/Todo/TodoForm'
import TodoList from './components/Todo/TodoList'
import { v4 as uuidv4 } from 'uuid'
import './App.scss'

function App() {
	const [todos, setTodos] = useState([])

	useEffect(() => {
		const getTodos = async () => {
			const todosFromServer = await fetchTodos()
			setTodos(todosFromServer)
		}
		getTodos()
	}, [])

	// Fetch Todos
	const fetchTodos = async () => {
		try {
			const res = await fetch('http://localhost:5000/todos')
			const data = await res.json()
			return data
		} catch (error) {
			console.log(error)
		}
	}

	// Fetch Todo
	const fetchTodo = async id => {
		try {
			const res = await fetch(`http://localhost:5000/todos/${id}`)
			const data = await res.json()
			return data
		} catch (error) {
			console.log(error)
		}
	}

	// Add Todo
	const addTodoHandler = async text => {
		const newTodo = {
			text,
			id: uuidv4(),
			isCompleted: false,
		}

		const res = await fetch('http://localhost:5000/todos', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newTodo),
		})

		const data = await res.json()
		setTodos([...todos, data])
	}

	// Delete Todo
	const deleteTodoHandler = async id => {
		await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' })
		setTodos(todos.filter(todo => todo.id !== id))
	}

	// Toggle Todo
	const toggleTodoHandler = async id => {
		const todoToToggle = await fetchTodo(id)
		const updateTodo = { ...todoToToggle, isCompleted: !todoToToggle.isCompleted }

		const res = await fetch(`http://localhost:5000/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updateTodo),
		})

		const data = await res.json()

		setTodos(todos.map(todo => (todo.id === id ? { ...todo, isCompleted: data.isCompleted } : todo)))
	}

	// Reset Todo
	const resetTodosHandler = async () => {
		const idForDelete = await fetchTodos()
	for (let i = 0; i < idForDelete.length; i++) {
			await fetch(`http://localhost:5000/todos/${idForDelete[i].id}`, { method: 'DELETE' })
		}
		setTodos([])
	}

	// Delete completed Todo
	const deleteCompletedTodosHandler = async () => {
		const idForDelete = await fetchTodos()
		const completedTodos = idForDelete.filter(todo => todo.isCompleted)
		console.log(completedTodos);
		for (let i = 0; i < completedTodos.length; i++) {
			await fetch(`http://localhost:5000/todos/${completedTodos[i].id}`, { method: 'DELETE' })
		}


		setTodos(todos.filter(todo => !todo.isCompleted))
	}

	// Count completed Todo
	const countTodos = todos.filter(todo => todo.isCompleted).length

	// Check Todo Empty
	const todosEmpty = !todos.length

	return (
		<div className="App">
			<h1>ToDo App</h1>
			<TodoForm addTodo={addTodoHandler} />
			<TodoActions
				todos={todos}
				resetTodos={resetTodosHandler}
				deleteCompletedTodos={deleteCompletedTodosHandler}
				countTodosExist={!countTodos}
				todosEmptyExist={todosEmpty}
			/>
			{!todos.length && <p>ToDo list is empty</p>}
			{todos.map(todo => (
				<TodoList key={todo.id} todo={todo} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoHandler} />
			))}
			{!!countTodos && (
				<p>
					You have {countTodos} completed {countTodos > 1 ? 'todos' : 'todo'}
				</p>
			)}
		</div>
	)
}

export default App
