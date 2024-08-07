import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import EachJobItem from '../EachJobItem'
import ProfileDetails from '../ProfileDetails'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    jobDetailsList: [],
    activeEmploymentTypeIdList: [],
    activeSalaryRangeId: 0,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {
      searchInput,
      activeEmploymentTypeIdList,
      activeSalaryRangeId,
    } = this.state

    const employmentTypeString = activeEmploymentTypeIdList.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        jobDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  selectedEmploymentType = employmentType => {
    const {activeEmploymentTypeIdList} = this.state
    if (activeEmploymentTypeIdList.includes(employmentType)) {
      const removedEmpElement = activeEmploymentTypeIdList.filter(
        eachItem => eachItem !== employmentType,
      )
      this.setState(
        {activeEmploymentTypeIdList: removedEmpElement},
        this.getJobsData,
      )
    } else {
      this.setState(
        prevState => ({
          activeEmploymentTypeIdList: [
            ...prevState.activeEmploymentTypeIdList,
            employmentType,
          ],
        }),
        this.getJobsData,
      )
    }
  }

  selectedSalaryRange = salaryRange => {
    this.setState({activeSalaryRangeId: salaryRange}, this.getJobsData)
  }

  onKeyDownSearchIcon = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobDetailsList} = this.state

    const jobsListLength = jobDetailsList.length > 0

    return jobsListLength ? (
      <ul className="each-job-container">
        {jobDetailsList.map(eachJobItem => (
          <EachJobItem key={eachJobItem.id} eachJobDetails={eachJobItem} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-view-image"
        />
        <h1 className="failure-view-heading">No Jobs Found</h1>
        <p className="failure-view-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-and-filters-container">
            <div className="sm-search-input-container">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearchIcon}
              />
              <button
                type="button"
                data-testid="searchButton"
                label="true"
                className="search-button"
                onClick={this.getJobsData}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileDetails />
            <hr className="horizontal-line" />
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              selectedEmploymentType={this.selectedEmploymentType}
              selectedSalaryRange={this.selectedSalaryRange}
            />
          </div>
          <div className="job-item-details-container">
            <div className="lg-search-input-container">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearchIcon}
              />
              <button
                type="button"
                data-testid="searchButton"
                label="true"
                className="search-button"
                onClick={this.getJobsData}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderContent()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
