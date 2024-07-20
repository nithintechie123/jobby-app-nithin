import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const EachJobItem = props => {
  const {eachJobDetails} = props
  const {
    companyLogoUrl,
    title,
    packagePerAnnum,
    location,
    rating,
    jobDescription,
    employmentType,
    id,
  } = eachJobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-link-item">
      <li className="job-item-container">
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="company-name">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating-number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-emp-type-salary-container">
          <div className="location-emp-type-container">
            <div className="icon-label-container">
              <MdLocationOn color="#ffffff" />
              <p className="location-emp-type-text">{location}</p>
            </div>
            <div className="icon-label-container">
              <BsFillBriefcaseFill color="#ffffff" />
              <p className="location-emp-type-text">{employmentType}</p>
            </div>
          </div>
          <p className="salary-text">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default EachJobItem
