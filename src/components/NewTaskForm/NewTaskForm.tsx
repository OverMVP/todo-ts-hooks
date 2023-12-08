import React, { ChangeEvent, FC, useState, KeyboardEvent } from "react"
import "./NewTaskForm.css"
import { NewTaskFormProps, IKeys } from "../../interfaces"

const NewTaskForm: FC<NewTaskFormProps> = ({ addNewTask }) => {
  const [label, setLabel] = useState<string>("")
  const [mins, setMins] = useState<string>("")
  const [seconds, setSeconds] = useState<string>("")

  const keys: IKeys = {
    Escape: () => {
      setLabel("")
      setMins("")
      setSeconds("")
    },
    Enter: () => {
      addNewTask(label, Number(mins), Number(seconds))
      setLabel("")
      setMins("")
      setSeconds("")
    },
  }

  function onMinsChange(e: ChangeEvent<HTMLInputElement>): void {
    setMins(e.target.value)
  }

  function onSecondsChange(e: ChangeEvent<HTMLInputElement>): void {
    setSeconds(e.target.value)
  }

  function onLabelChange(e: ChangeEvent<HTMLInputElement>): void {
    setLabel(e.target.value)
  }

  function onLabelSubmit(e: ChangeEvent<HTMLInputElement> & KeyboardEvent<HTMLInputElement>) {
    const key: string = e.key
    const text = e.target.value.trim()

    if (keys.hasOwnProperty(key) && text !== "" && mins !== "" && seconds !== "") {
      keys[key]()
    }
  }

  return (
    <header className="header">
      <h1>todo app</h1>
      <form className="new-todo-form">
        <input
          type="text"
          autoFocus
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
          onKeyUp={onLabelSubmit}
        />
        <input
          type="text"
          pattern="^([0-5]?[0-9])$"
          maxLength={2}
          value={mins}
          onChange={onMinsChange}
          className="new-todo-form__timer"
          placeholder="Min"
          onKeyUp={onLabelSubmit}
        />
        <input
          type="text"
          pattern="^([0-5]?[0-9])$"
          maxLength={2}
          value={seconds}
          onChange={onSecondsChange}
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyUp={onLabelSubmit}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
