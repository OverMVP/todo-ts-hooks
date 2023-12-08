export interface ITask {
  label: string
  creationTime: string
  completed: boolean
  editing: boolean
  id: string
  timeLeft: number
}

export interface IFilters {
  onFilterAll: () => void
  onFilterCompleted: () => void
  onFilterActive: () => void
}

export interface IFilterFunctions {
  [key: string]: () => void
  all: () => ITask[]
  active: () => ITask[]
  completed: () => ITask[]
}

export interface TaskListProps {
  todos: ITask[]
  onDeleted: (id: string) => void
  onClickEdit: (id: string) => void
  onToggleDone: (id: string) => void
  onChangeEdit: (id: string, text: string) => void
}

export interface TaskFilterProps {
  filters: IFilters
}

export interface TaskProps {
  label: string
  creationTime: string
  onDeleted: () => void
  editing: boolean
  completed: boolean
  onToggleDone: () => void
  onClickEdit: () => void
  onChangeEdit: (id: string, text: string) => void
  id: string
  timeLeft: number
}

export interface NewTaskFormProps {
  addNewTask: (label: string, mins: number, seconds: number) => void
}

export interface IKeys {
  Escape: () => void
  Enter: () => void
  [key: string]: () => void
}

export interface FooterProps {
  tasksLeft: number
  clearCompleted: () => void
  filters: IFilters
}
