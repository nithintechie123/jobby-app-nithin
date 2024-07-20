import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    selectedEmploymentType,
    selectedSalaryRange,
  } = props

  return (
    <>
      <ul className="filters-container">
        <h1 className="filter-heading">Type of Employment</h1>
        {employmentTypesList.map(eachEmployeeType => {
          const onClickEmploymentType = () => {
            selectedEmploymentType(eachEmployeeType.employmentTypeId)
          }
          return (
            <li
              key={eachEmployeeType.employmentTypeId}
              className="each-filter-item"
            >
              <input
                type="checkbox"
                id={eachEmployeeType.employmentTypeId}
                onClick={onClickEmploymentType}
                className="input-element"
              />
              <label
                htmlFor={eachEmployeeType.employmentTypeId}
                className="each-filter-label"
              >
                {eachEmployeeType.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="horizontal-line" />
      <ul className="filters-container">
        <h1 className="filter-heading">Salary Range</h1>
        {salaryRangesList.map(eachSalaryRange => {
          const onClickSalaryRange = () => {
            selectedSalaryRange(eachSalaryRange.salaryRangeId)
          }

          return (
            <li
              key={eachSalaryRange.salaryRangeId}
              className="each-filter-item"
              onClick={onClickSalaryRange}
            >
              <input
                type="radio"
                id={eachSalaryRange.salaryRangeId}
                className="input-element"
                name="salaryRange"
              />
              <label
                htmlFor={eachSalaryRange.salaryRangeId}
                className="each-filter-label"
              >
                {eachSalaryRange.label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default FiltersGroup
