import { useEffect, useState } from 'react';
import React from 'react';
import styles from './JobDetails.module.css';
import FooterPage from '../../../../components/recruiter/footer/Footer';
import HeaderPage from '../../../../components/recruiter/header/Header';
import { Dialog, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import DialogContent from '@mui/material/DialogContent';


const jobsData = [
    { name: 'Sudhanshu Trivedi', status: 'Open', company: 'TCS', match: '100%' },
    { name: 'Chandansita Tatavolu', status: 'Open', company: 'Tech Mahindra', match: '100%' },
    { name: 'Joseph Johnson', status: 'Open', company: 'Deloitte', match: '93%' },
    { name: 'Rajeswari Akella', status: 'Open', company: 'Infosys', match: '93%' },
    { name: 'Vijaykumar Sriram', status: 'Open', company: 'UBS Healthcare', match: '88%' },
    { name: 'Jeetu Asija', status: 'Open', company: 'Amex IT', match: '87%' },
    { name: 'Manpreet Makhija', status: 'Open', company: 'Amdocs Technologies', match: '85%' },
    { name: 'Kaustubh Malgaonkar', status: 'Open', company: 'Cognizant Technologies', match: '80%' },
];

const innerTableData = [
    { parameter: 'Experience Required: 10+ yrs', value: '10 Yrs', score: '100%' },
    { parameter: 'Qualification: B.Tech', value: 'B.Tech', score: '95%' },
    { parameter: 'Skills: Java, Spring', value: 'Java, Spring', score: '90%' },
];

function JobDetailsPage() {
    const [jobList] = useState(jobsData); 
    const [isResumeParsed, setIsResumeParsed] = useState(false);
    const [showResponseColumn, setShowResponseColumn] = useState(false);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [responseSent, setResponseSent] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.showParsed) {
            setIsResumeParsed(true); 
        }
    }, [location.state]);
  
    function resume() {
        navigate('/recruiter/job/parse-resume');
    }

    const [open, setOpen] = React.useState(false);
    const [openQuestion, setOpenQuestion] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, user: { name: string }) => {
        if (event.target.checked) {
            setSelectedUsers((prev) => [...prev, user.name]); 
        } else {
            setSelectedUsers((prev) => prev.filter((name) => name !== user.name)); 
        }
    };
    const handleClickOpenQuestion = () => {
        setOpenQuestion(true);
    };
  
    const handleCloseQuestion = () => {
        setOpenQuestion(false);
    };


    const handleExpandClick = (index: number) => {
        setExpandedRows((prev) => {
            if (prev.includes(index)) {
                return prev.filter((rowIndex) => rowIndex !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const confirm = () => {
        setOpenQuestion(false); 
        setResponseSent((prev) => [...prev, ...selectedUsers]); 
        setSelectedUsers([]); 
        setShowResponseColumn(true); 
    };

    const cardData = [
        {
            title: 'Open',
            backgroundImg: '/src/assets/images/jbg.svg',
            jobId: 'Status'
        },
        {
            title: '15 Aug 2024',
            backgroundImg: '/src/assets/images/tbg.svg',
            jobId: 'Open Till'
        },
        {
            title: '10',
            backgroundImg: '/src/assets/images/fbg.svg',
            jobId: 'Resume Received'
        },
        {
            title: '00',            
            backgroundImg: '/src/assets/images/pbg.svg',
            jobId: 'Screening Questions Sent'
        }
    ];

    return (
        <>
            <div>
                <HeaderPage />
                <div className={styles.containerWrapper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <div className={styles.breadcrumb}>Home / Jobs / Sr Java Developer</div>
                            <div className={styles.txtTitle}>Sr Java Developer</div>                            
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
                            <div style={{ marginTop: '25px' }}>
                                <Grid container spacing={2} className={styles.alignRightSTyle}>
                                    <Grid item xs={12} md={6} className={styles.adds}>
                                        <Button variant="outlined" className={styles.screen1}>Close this Job</Button>
                                        <Button variant="outlined" className={styles.screen2} style={{ marginLeft: '15px' }} onClick={handleClickOpen}>Parse Resume</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={styles.flexRow}>
                        <div>
                        <Button variant="contained" className={`${styles.overview} ${isResumeParsed ? styles.isSelected : ''}`}   onClick={() => setIsResumeParsed(false)}>Resumes Received</Button>
                        <Button variant="outlined" className={`${styles.screen} ${isResumeParsed ? styles.active : ''}`}    onClick={() => setIsResumeParsed(true)}>Resume Parsed</Button>
                        </div>
                       
                        {isResumeParsed && (
  <div>
    <Button 
      onClick={handleClickOpenQuestion}  
      className={selectedUsers.length > 0 ? styles.activeButton : styles.disabledButton} 
      disabled={selectedUsers.length === 0} 
    >
      Send Questionnaire
    </Button>
  </div>
)}
                    </div>
                    <div className={styles.tableContainer}>
                        {isResumeParsed ? (
                            jobList.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyStateText}>No resumes parsed yet.</div>
                                </div>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Current Company</th>
                                            <th>Match</th>
                                            {showResponseColumn && <th>Action</th>}
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobList.map((job, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td>
                                                        <input type="checkbox" onChange={(event) => handleCheckboxChange(event, job)} className={styles.customCheckbox} />
                                                    </td>
                                                    <td>{job.name}</td>
                                                    <td>{job.company}</td>
                                                    <td>{job.match}</td>
                                                    {showResponseColumn ? (
                                                        responseSent.includes(job.name) ? (
                                                            <td><Button className={styles.buttonColor}>View Response</Button></td>
                                                        ) : (
                                                            <td></td>
                                                        )
                                                    ) : null}
                                                     <td>
                                                    <a style={{ cursor: 'pointer' }}>Download Resume</a>
                                                </td>
                                                    <td className={styles.outtertd}>
                                                        <img
                                                            onClick={() => handleExpandClick(index)}
                                                            src="/src/assets/images/plus.svg"
                                                            alt="Expand"
                                                            width={20}
                                                            height={20}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </td>
                                                </tr>
                                                {expandedRows.includes(index) && (
                                                    <tr>
                                                        <td colSpan={6} className={styles.innertd}>
                                                            <table className={styles.innerTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Parameter</th>
                                                                        <th>Value</th>
                                                                        <th>Score</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {innerTableData.map((data, idx) => (
                                                                        <tr key={idx}>
                                                                            <td>{data.parameter}</td>
                                                                            <td>{data.value}</td>
                                                                            <td>{data.score}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        ) : (
                            jobList.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Current Company</th>                          
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobList.map((job, index) => (
                                            <tr key={index}>
                                                <td>{job.name}</td>
                                                <td>{job.company}</td>
                                                <td>
                                                    <a style={{ cursor: 'pointer' }}>Download Resume</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className={styles.emptyState}>
                                <div className={styles.emptyStateText}>No job applications found.</div>
                                </div>
                            )
                        )}
                    </div>
                    <Dialog
                        open={openQuestion}
                        onClose={handleCloseQuestion}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{
                            style: {
                              width: '562px', 
                              maxWidth: '90%', 
                              borderRadius: '16px'
                            },
                          }}
                    >
                        <div className={styles.close}>
                            <img onClick={handleCloseQuestion}
                                src="/src/assets/images/x.svg"
                                alt="Next.js x"
                                width={30}
                                height={30 }
                                style={{cursor: 'pointer'}}
                              
                                />
                        </div>
                        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',marginTop: '20px'}}>
                            <img
                                src="/src/assets/images/green-tick.svg"
                                alt="Next.js logo"
                                width={91}
                                height={89}
                              
                                />
                        </div>
                       
                        <DialogContent>
                            <div className={styles.description}>
                           Questions Send successfully
                            </div>
                            <Grid container spacing={2} >
                                <Grid item xs={12} md={12} style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px'}}>
                                   
                                    <Button variant="outlined" className={styles.screen2} style={{ marginLeft: '15px' }} onClick={confirm}>OK</Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={open} onClose={handleClose}>
                        <div className={styles.close}>
                            <img onClick={handleClose} src="/src/assets/images/x.svg" alt="Close" width={30} height={30} style={{ cursor: 'pointer' }} />
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px' }}>
                            <img src="/src/assets/images/dailogeimg.svg" alt="Dialog Image" width={127} height={123}  />
                        </div>
                        <DialogContent>
                            <div className={styles.description}>
                                Before running the Resume Matching engine, ensure you have downloaded all the resumes received for this job and placed them in a single folder. Then, zip this folder and upload it to the engine.
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px' }}>
                                    <Button variant="outlined" className={styles.screen1} onClick={handleClose}>Take Me Back</Button>
                                    <Button variant="outlined" className={styles.screen2} style={{ marginLeft: '15px' }} onClick={resume}>Launch Resume Matcher</Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </div>
                <FooterPage />
            </div>
        </>
    );
}

export default JobDetailsPage;
