import React, { ChangeEvent, FC, useEffect, useState, KeyboardEvent } from "react"
import "./Task.css"
import { convertToMMSS } from "../../helpers"
import { TaskProps } from "../../interfaces"

const Task: FC<TaskProps> = ({
  label,
  creationTime,
  onDeleted,
  editing,
  completed,
  onToggleDone,
  onClickEdit,
  onChangeEdit,
  id,
  timeLeft,
}) => {
  const savedTime = sessionStorage.getItem(`${label}`)
  const [inputValue, setInputValue] = useState<string>(label)
  const [isCounting, setIsCounting] = useState<boolean>(false)
  const [time, setTime] = useState<number>(savedTime ? Number(savedTime) : timeLeft)

  function onClickStart(): void {
    if (isCounting || completed) return
    setIsCounting(true)
  }

  function onClickStop(): void {
    setIsCounting(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timer

    if (isCounting) {
      interval = setInterval(() => {
        setTime((timer) => {
          if (timer > 0) {
            timer -= 1
            return timer
          } else {
            clearInterval(interval)
            return 0
          }
        })
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCounting, time])

  useEffect(() => {
    if (time === 0 && !completed) {
      onToggleDone()
    }
    sessionStorage.setItem(`${label}`, `${time}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  useEffect(() => {
    return () => setTime(0)
  }, [completed])

  function onChangeInput(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    const text = e.target.value
    setInputValue(text)
  }

  function onBlurEdit(): void {
    onClickEdit()
    setInputValue((value) => value || "")
  }

  function onEditing(e: ChangeEvent<HTMLInputElement> & KeyboardEvent<HTMLInputElement>) {
    const { key } = e
    const text = e.target.value.trim()
    if (key === "Enter" && text !== "") {
      onChangeEdit(id, text)
      return
    }
    if (key === "Escape") {
      onClickEdit()
      setInputValue(() => label || "")
    }
  }

  const editModeInput = (
    <input
      onBlur={onBlurEdit}
      type="text"
      className="edit"
      autoFocus
      value={inputValue}
      onChange={onChangeInput}
      onKeyUp={onEditing}
    />
  )

  let liClass = ""

  if (completed) {
    liClass = "completed"
  }

  if (editing) {
    liClass = "editing"
  }

  const [mins, secs] = convertToMMSS(time)

  return (
    <li className={liClass}>
      <div className="view">
        <input checked={completed} className="toggle" type="checkbox" onChange={onToggleDone} />
        <label htmlFor="desription">
          <span id="description" className="description">
            {label}
          </span>
          <div className="timer-button-group">
            <button type="button" className="icon icon-play" onClick={onClickStart} />
            <button type="button" className="icon icon-pause" onClick={onClickStop} />
            <span className="time">
              {mins}:{secs}
            </span>
          </div>

          <span className="created">{creationTime}</span>
        </label>
        <button type="button" onClick={onClickEdit} className="icon icon-edit" />
        <button type="button" onClick={onDeleted} className="icon icon-destroy" />
      </div>
      {editing ? editModeInput : null}
    </li>
  )
}

export default Task
