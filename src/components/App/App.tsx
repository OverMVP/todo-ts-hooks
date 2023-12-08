import "./App.css"
import { formatDistanceToNow } from "date-fns"
import NewTaskForm from "../NewTaskForm"
import Footer from "../Footer"
import TaskList from "../TaskList"
import "./App.css"
import React, { useState, FC } from "react"
import { nanoid } from "nanoid"
import { IFilters, ITask, IFilterFunctions } from "../../interfaces"
import { Filter } from "../../enums"
import { formatTime } from "../../helpers"

const App: FC = () => {
  const tasksArr: ITask[] = [createTodoItem("Drink a Beer"), createTodoItem("Drink One More Beer")]

  const [tasks, setTasks] = useState<ITask[]>(tasksArr)
  const [stateFilter, setStateFilter] = useState<Filter>(Filter.All)

  const filters: IFilters = {
    onFilterAll: () => setStateFilter(() => Filter.All),
    onFilterCompleted: () => setStateFilter(() => Filter.Completed),
    onFilterActive: () => setStateFilter(() => Filter.Active),
  }

  function validateAndTrim(text: string): string {
    const textBefore = text.trim()
    let textAfter: string
    if (text.length > 18) {
      textAfter = `${textBefore.slice(0, 15)}...`
      return textAfter
    }
    return textBefore
  }

  function createTodoItem(text: string, mins = 0, seconds = 5): ITask {
    return {
      label: text,
      creationTime: formatDistanceToNow(new Date()),
      completed: false,
      editing: false,
      id: nanoid(),
      timeLeft: formatTime(mins, seconds),
    }
  }

  function onDeleted(id: string): void {
    setTasks((tasks) => {
      const idx: number = tasks.findIndex((el) => id === el.id)
      const newArr: ITask[] = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
      return newArr
    })
  }

  function addNewTask(text: string, mins: number, seconds: number): void {
    const label: string = validateAndTrim(text)
    setTasks((tasks) => {
      const newEl = createTodoItem(label, mins, seconds)
      const newArr = [...tasks.slice(0), newEl]
      return newArr
    })
  }

  function FilterItems(items: ITask[], filter: Filter): ITask[] {
    const filterFunctions: IFilterFunctions = {
      all: () => items,
      active: () => items.filter((item) => !item.completed),
      completed: () => items.filter((item) => item.completed),
    }
    return filterFunctions.hasOwnProperty(filter) ? filterFunctions[filter]() : []
  }

  function onClickEdit(id: string): void {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => id === el.id)
      const targetElement = tasks[idx]
      const newElement = {
        ...targetElement,
        editing: !targetElement.editing,
      }
      const newArr = [...tasks.slice(0, idx), newElement, ...tasks.slice(idx + 1)]
      return newArr
    })
  }

  function onChangeEdit(id: string, text: string): void {
    const label = validateAndTrim(text)
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => id === el.id)
      const targetElement = tasks[idx]
      const editedElement = {
        ...targetElement,
        label,
        editing: false,
      }
      const newArr = [...tasks.slice(0, idx), editedElement, ...tasks.slice(idx + 1)]
      return newArr
    })
  }

  function onToggleDone(id: string): void {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => id === el.id)
      const targetElement = tasks[idx]
      const newElement = {
        ...targetElement,
        completed: !targetElement.completed,
      }
      const newArr = [...tasks.slice(0, idx), newElement, ...tasks.slice(idx + 1)]
      return newArr
    })
  }

  function clearCompleted(): void {
    setTasks((tasks) => {
      const newArr = tasks.filter((el) => !el.completed)
      if (tasks.length !== newArr.length) {
        return newArr
      }
      return tasks
    })
  }

  const filteredItems: ITask[] = FilterItems(tasks, stateFilter)
  const tasksLeft: number = tasks.filter((el) => !el.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm addNewTask={addNewTask} />
      <section className="main">
        <TaskList
          onDeleted={onDeleted}
          todos={filteredItems}
          onClickEdit={onClickEdit}
          onToggleDone={onToggleDone}
          onChangeEdit={onChangeEdit}
        />
        <Footer filters={filters} tasksLeft={tasksLeft} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
