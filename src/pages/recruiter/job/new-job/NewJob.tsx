import { Button, Grid } from '@mui/material';
import {Link, useLocation, Outlet} from 'react-router-dom';
import FooterPage from '../../../../components/recruiter/footer/Footer';
import HeaderPage from '../../../../components/recruiter/header/Header';
import styles from './NewJob.module.css'




function NewJobPage() {
    const location = useLocation();
 
  const cardData = [
    {
        title: 'LL/23/06/0001',
        backgroundImg: '/src/assets/images/jbg.svg',
        jobId: 'Job ID'
    },
    {
        title: 'Vinay Parab',
        backgroundImg: '/src/assets/images/tbg.svg',
        jobId: 'Created By'
    },
    {
        title: 'Draft',
        backgroundImg: '/src/assets/images/pbg.svg',
        jobId: 'Status'
    }
];
  return (

  <>

       <div >
       <HeaderPage/>
       <div className={styles.containerWrapper}>
       <div className={styles.container}>
                <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <div className={styles.breadcrumb}>Home / Jobs / New Job </div>
                    <div className={styles.txtTitle}>Post a new job</div>
                    <div>
            <Link to="/recruiter/job/new-job/overview" >
            <Button variant="outlined"  className={`${styles.overview} ${
                            location.pathname === '/recruiter/job/new-job/overview' ? styles.activeButton : ''
                          }`}
                        >
            Overview
            </Button>
            </Link>
            <Link to="/recruiter/job/new-job/screening" >
            <Button variant="outlined" className={`${styles.screen} ${
                            location.pathname === '/recruiter/job/new-job/screening' ? styles.activeButton : ''
                          }`}>
            Screening Criteria
            </Button>
            </Link>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div>
                        <ul className={styles.ulStyle}>
                            {cardData.map((card, index) => (
                                <li key={index} className={styles.liStyle} style={{ backgroundImage: `url(${card.backgroundImg})` }}>
                                    <div className={styles.title}>{card.title}</div>
                                    <div className={styles.jobId}>{card.jobId}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Grid>
            </Grid>
            <Outlet />
            </div>
       </div>
        <FooterPage/>
       </div>
  </>
    
  )
}

export default NewJobPage