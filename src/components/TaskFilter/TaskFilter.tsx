import React, { ChangeEvent, FC, useState } from "react"
import "./TaskFilter.css"
import { Filter } from "../../enums"
import { TaskFilterProps } from "../../interfaces"

const TaskFilter: FC<TaskFilterProps> = (props) => {
  const {
    filters: { onFilterAll, onFilterActive, onFilterCompleted },
  } = props

  const [selected, SetSelected] = useState(`${Filter.All}`)

  function handleRadioClick(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    SetSelected(() => e.target.value)
  }

  function isRadioSelected(value: Filter): boolean {
    return value === selected
  }

  return (
    <form className="filters">
      <fieldset>
        <div>
          <input
            checked={isRadioSelected(Filter.All)}
            id="all"
            name="filter"
            type="radio"
            value={Filter.All}
            onClick={onFilterAll}
            onChange={handleRadioClick}
          />
          <label htmlFor="all">All</label>

          <input
            checked={isRadioSelected(Filter.Active)}
            id="active"
            name="filter"
            type="radio"
            value={Filter.Active}
            onChange={handleRadioClick}
            onClick={onFilterActive}
          />
          <label htmlFor="active">Active</label>

          <input
            checked={isRadioSelected(Filter.Completed)}
            id="completed"
            name="filter"
            type="radio"
            value={Filter.Completed}
            onClick={onFilterCompleted}
            onChange={handleRadioClick}
          />
          <label htmlFor="completed">Completed</label>
        </div>
      </fieldset>
    </form>
  )
}

export default TaskFilter
