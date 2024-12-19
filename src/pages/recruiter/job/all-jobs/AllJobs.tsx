import { useState } from 'react';
import styles from './AllJobs.module.css'; 
import FooterPage from '../../../../components/recruiter/footer/Footer';
import HeaderPage from '../../../../components/recruiter/header/Header';
import {Link} from 'react-router-dom';

const jobsData = [
  { skill: 'Sr Java Developer', status: 'Open', resumesReceived: 10, screeningSent: 0 },
  { skill: 'Oracle DBA', status: 'Open', resumesReceived: 10, screeningSent: 0 },
  { skill: 'Program Manager', status: 'Open', resumesReceived: 10, screeningSent: 0 },
  { skill: 'Delivery Head', status: 'Open', resumesReceived: 10, screeningSent: 0 },
  { skill: 'Business Analyst', status: 'Open', resumesReceived: 10, screeningSent: 0 },
  { skill: 'Data Scientist', status: 'Open', resumesReceived: 10, screeningSent: 0 },
  { skill: 'AI/ML Architect', status: 'Open', resumesReceived: 10, screeningSent: 0 },
];

export default function Jobs() {
  const [jobList] = useState(jobsData); 


  return (
   <>
       <div>
        <HeaderPage/>
            <div className={styles.container}>
            <div className={styles.breadcrumb}>Home / Jobs / New Job </div>
              <div className={styles.txtTitle}>All Jobs</div>
        
           
              <div className={styles.filterSection}>
                <select>
                  <option value="">Skills</option>
                 
                </select>

                <div className={styles.filterText}>Filter By </div>
                <select>
                  <option value="">Skills</option>
                 
                </select>
                <select>
                  <option value="">Job Location</option>
           
                </select>
                <Link to="/recruiter/job/new-job/overview" className={styles.postJobButton}>Post New Job</Link>
              </div>
        
           
              <div className={styles.tableContainer}>
                <table>
                  <thead>
                    <tr>
                      <th>Skill</th>
                      <th>Status</th>
                      <th>Resume Received</th>
                      <th>Screening Questions Sent</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobList.map((job, index) => (
                      <tr key={index}>
                        <td>{job.skill}</td>
                        <td>{job.status}</td>
                        <td>{job.resumesReceived}</td>
                        <td>{job.screeningSent}</td>
                        <td>
                          <Link to='/recruiter/job/job-details' >View Detail</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <FooterPage/>
       </div>
   </>
  );
}
