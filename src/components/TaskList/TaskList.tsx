import React, { FC } from "react"
import Task from "../Task"
import "./TaskList.css"
import { TaskListProps } from "../../interfaces"

const TaskList: FC<TaskListProps> = (props) => {
  const { todos, onDeleted, onClickEdit, onToggleDone, onChangeEdit } = props

  const list = todos.map((item) => {
    const { id, timeLeft, ...rest } = item
    return (
      <Task
        onChangeEdit={onChangeEdit}
        onClickEdit={() => onClickEdit(id)}
        onToggleDone={() => onToggleDone(id)}
        onDeleted={() => onDeleted(id)}
        timeLeft={timeLeft}
        id={id}
        key={id}
        {...rest}
      />
    )
  })
  return <ul className="todo-list">{list}</ul>
}

export default TaskList
