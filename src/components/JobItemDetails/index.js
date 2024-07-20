import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    eachJobDetailsList: [],
    similarJobsList: [],
    lifeAtCompanyList: [],
    skillsList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getDetailedJobData()
  }

  getDetailedJobData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    const updatedJobDetailsList = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      rating: data.job_details.rating,
      title: data.job_details.title,
      packagePerAnnum: data.job_details.package_per_annum,
    }

    const updatedLifeAtCompanyList = {
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
    }

    const updatedSkillsList = data.job_details.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))

    const updatedSimilarJobsList = data.similar_jobs.map(eachSimilarJob => ({
      companyLogoUrl: eachSimilarJob.company_logo_url,
      id: eachSimilarJob.id,
      employmentType: eachSimilarJob.employment_type,
      jobDescription: eachSimilarJob.job_description,
      location: eachSimilarJob.location,
      rating: eachSimilarJob.rating,
      title: eachSimilarJob.title,
    }))

    if (response.ok === true) {
      this.setState({
        similarJobsList: updatedSimilarJobsList,
        eachJobDetailsList: updatedJobDetailsList,
        lifeAtCompanyList: updatedLifeAtCompanyList,
        skillsList: updatedSkillsList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSkillsContent = () => {
    const {skillsList} = this.state

    return (
      <div className="skill-items-heading-container">
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-container">
          {skillsList.map(eachSkill => (
            <li key={eachSkill.name} className="skill-item-container">
              <img
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
                className="skill-image"
              />
              <p className="skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompanyContent = () => {
    const {lifeAtCompanyList} = this.state
    const {description, imageUrl} = lifeAtCompanyList
    return (
      <div className="life-at-company-container">
        <h1 className="life-at-company-heading">Life at Company</h1>
        <div className="description-image-container">
          <p className="life-at-company-description">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-at-company-image"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobsContent = () => {
    const {similarJobsList} = this.state

    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-items-container">
          {similarJobsList.map(eachSimilarJob => (
            <li key={eachSimilarJob.id} className="similar-job-item-container">
              <div className="sim-job-logo-title-rating-container">
                <img
                  src={eachSimilarJob.companyLogoUrl}
                  alt="similar job company logo"
                  className="sim-job-company-logo"
                />
                <div className="sim-job-title-rating-container">
                  <h1 className="sim-job-company-name">
                    {eachSimilarJob.title}
                  </h1>
                  <div className="sim-job-rating-container">
                    <AiFillStar className="sim-job-star-icon" />
                    <p className="sim-job-rating-number">
                      {eachSimilarJob.rating}
                    </p>
                  </div>
                </div>
              </div>
              <h1 className="similar-jobs-desc-heading">Description</h1>
              <p className="similar-job-description">
                {eachSimilarJob.jobDescription}
              </p>
              <div className="sim-job-location-emp-type-salary-container">
                <div className="sim-job-location-emp-type-container">
                  <div className="sim-job-icon-label-container">
                    <MdLocationOn color="#ffffff" />
                    <p className="sim-job-location-emp-type-text">
                      {eachSimilarJob.location}
                    </p>
                  </div>
                  <div className="sim-job-icon-label-container">
                    <BsFillBriefcaseFill color="#ffffff" />
                    <p className="sim-job-location-emp-type-text">
                      {eachSimilarJob.employmentType}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {eachJobDetailsList} = this.state
    return (
      <div className="detailed-job-container">
        <div className="detailed-job-item-container">
          <div className="logo-title-rating-container">
            <img
              src={eachJobDetailsList.companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="company-name">{eachJobDetailsList.title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-number">{eachJobDetailsList.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-emp-type-salary-container">
            <div className="location-emp-type-container">
              <div className="icon-label-container">
                <MdLocationOn color="#ffffff" />
                <p className="location-emp-type-text">
                  {eachJobDetailsList.location}
                </p>
              </div>
              <div className="icon-label-container">
                <BsFillBriefcaseFill color="#ffffff" />
                <p className="location-emp-type-text">
                  {eachJobDetailsList.employmentType}
                </p>
              </div>
            </div>
            <p className="salary-text">{eachJobDetailsList.packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="heading-link-container">
            <h1 className="description-heading">Description</h1>
            <a
              href={eachJobDetailsList.companyWebsiteUrl}
              className="visit-link"
            >
              Visit
              <FiExternalLink />
            </a>
          </div>
          <p className="description">{eachJobDetailsList.jobDescription}</p>
          {this.renderSkillsContent()}
          {this.renderLifeAtCompanyContent()}
        </div>
        {this.renderSimilarJobsContent()}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureViewContent = () => (
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
      <button
        type="button"
        className="retry-button"
        onClick={this.getDetailedJobData}
      >
        Retry
      </button>
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobDetails()
      case apiConstants.failure:
        return this.renderFailureViewContent()
      case apiConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="each-item-container">
        <Header />
        {this.renderBasedOnApiStatus()}
      </div>
    )
  }
}

export default JobItemDetails
