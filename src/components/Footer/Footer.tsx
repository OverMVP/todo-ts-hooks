import React, { FC } from "react"
import "./Footer.css"
import TaskFilter from "../TaskFilter"
import { FooterProps } from "../../interfaces"

const Footer: FC<FooterProps> = (props) => {
  const { clearCompleted, tasksLeft, filters } = props
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter filters={filters} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
