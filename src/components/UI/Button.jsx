import React from 'react'
import styles from './Button.module.scss'

function Button(props) {
	const { color, children, disabled = false } = props
	return (
		<>
			<button className={styles.button} {...props} disabled={disabled} style={{color: color}}>
				{children}
			</button>
		</>
	)
}

export default Button
