import { useEffect, useState } from 'react';
import styles from './AllJobs.module.css'; 
import { JobService } from '../service/JobService';
import { Link } from 'react-router-dom';
import HeaderRecruiterPage from '../../../../components/recruiter/header/Header';
import FooterRecruiterPage from '../../../../components/recruiter/footer/Footer';





interface Job {
  title: string;
  status: string;
  resumesReceived: number;
  screeningSent: number;
}

export default function Jobs() {
  // const router = useRouter();
  const [jobList, setJobList] = useState<Job[]>([]);
  const [tenantId, setTenantId] = useState<string | null>(null);
  
  const status = 'open'

  useEffect(() => {
    const storedTenantId = localStorage.getItem('tenant');
    setTenantId(storedTenantId);
  }, []);
  useEffect(() => {
    if (tenantId) {
      async function fetchJobs() {
        try {
          const response = await JobService.instance.getTenantJob(tenantId ?? '', status);
          if (response?.data?.data) {
            setJobList(response.data.data);
          } else {
            console.error("No data found in response", response);
          }
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      }
  
      fetchJobs();
    }
  }, [tenantId, status]);


  return (
   <>
       <div>
        <HeaderRecruiterPage/>
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
                        <td>{job.title}</td>
                        <td>{job.status}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>
                          <Link to='/recruiter/job/job-details' >View Detail</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <FooterRecruiterPage/>
       </div>
   </>
  );
}
