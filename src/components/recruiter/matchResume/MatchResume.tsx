

import React, {  useState } from 'react';
import styles from './MatchResume.module.css';
import { FormControl } from '@mui/material';
import {
    Button,
    Grid,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const MatchResumePage = () => {
    const navigate = useNavigate();
   
    const [showSecondSection, setShowSecondSection] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const resume = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);  
            setShowSecondSection(true); 
        }, 3000); 
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setShowSecondSection(true); 
        }, 500);
       

    };
    const save = () => {
        setOpen2(true);       
    };
    const handleClose2 = () => {
        setOpen2(false);
        navigate('/recruiter/job/job-details', { state: { showParsed: true } }) 
       
       
    };
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
        }
    ];
    function createData(
        name: string,
        company: string,
        match: string,
    ) {
        return { name, company, match };
    }

    const rows = [
        createData('Sudhanshu Trivedi', 'TCS', '100%'),
    ];

    function secData(
        parameter: string,
        value: string,
        score: string
    ) {
        return { parameter, value, score };
    }
    const rows2 = [
        secData('ExperienceRequired : 10+ yrs', '10Yrs', '100%'),
    ];

    const [hidden, setHidden] = useState(false);

    return (
        <>
        {!showSecondSection ?(
          <>
                <div className={styles.upload}>
                    <div className={styles.uploadContainer}>
                        <FormControl fullWidth>
                            <div className={styles.criteriaRow}>
                                <div className={styles.filterSection}>
                                    <select style={{ width: '100%', backgroundColor: '#fff' }}>
                                        <option value="">70%-75% Match Resume</option>
                                        <option value="">80%-85% Match Resume</option>
                                        <option value="">90%-95% Match Resume</option>
                                        <option value="">100% Match Resume</option>
                                    </select>
                                </div>
                            </div>
                        </FormControl>
                    </div>
                </div>
                <div>
                    <Grid item xs={12} md={6} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '30px' }}>
                        <Button variant="contained" className={styles.screen2} style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={resume} >Match Resume</Button>
                    </Grid>
                </div>
          </>
             ) : (
           
            <div>
                <Grid container spacing={2}>
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
                    <Grid item xs={12} md={4} className={styles.alignRight}>
                        <Button variant="outlined" className={styles.screen1}>Re Match</Button>
                        <Button variant="contained" className={styles.screen2} style={{ marginLeft: '15px' }} onClick={save}>Save Match</Button>
                    </Grid>
                </Grid>
                <div style={{marginTop: '30px'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={styles.addLabel}>Name</TableCell>
                                    <TableCell className={styles.addLabel} align="right">Current Company</TableCell>
                                    <TableCell className={styles.addLabel} align="right">Match</TableCell>
                                    <TableCell className={styles.addLabel} align="right"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row" className={styles.addDes}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right" className={styles.addDes}>{row.company}</TableCell>
                                        <TableCell align="right" className={styles.addDes}>{row.match}</TableCell>
                                        <TableCell align="right" onClick={() => setHidden(!hidden)} className={styles.addDes}>
                                        <img
                                                          
                                                            src="/src/assets/images/plus.svg"
                                                            alt="Expand"
                                                            width={20}
                                                            height={20}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                        </TableCell>

                                    </TableRow>
                                ))}
                                <TableRow>
                                   <TableCell colSpan={4} style={{ padding: 0 }}>
                                        <div hidden={!hidden}>
                                            <TableContainer component={Paper}>
                                                <Table aria-label="caption table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={styles.innerLabel}>Parameters</TableCell>
                                                            <TableCell align="right" className={styles.innerLabel}>Matched Value</TableCell>
                                                            <TableCell align="right" className={styles.innerLabel}>Score</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows2.map((row) => (
                                                            <TableRow key={row.parameter}>
                                                                <TableCell component="th" scope="row" className={styles.innerDesc}>
                                                                    {row.parameter}
                                                                </TableCell>
                                                                <TableCell align="right" className={styles.innerDesc}>{row.value}</TableCell>
                                                                <TableCell align="right" className={styles.innerDesc}>{row.score}</TableCell>
                                                            </TableRow>
                                                        ))}
    
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                   </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
              )}
               <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={styles.close}>
                    <img onClick={handleClose}
                        src="/src/assets/images/x.svg"
                        alt="Next.js x"
                        width={30}
                        height={30}
                      
                    />
                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '40px' }}>
                    <img
                        src="/src/assets/images/grey.svg"
                        alt="Next.js logo"
                        width={80}
                        height={80}
                      
                    />
                </div>
                <DialogContent className={styles.w600}>
                    <div className={styles.description}>
                        Matching resumes.
                    </div>
                    <div className={styles.txt}>
                        This might take some time. <br />
                        Why don &apos;t you grab a cup of coffee
                    </div>
                    
                </DialogContent>
            </Dialog>
            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={styles.close}>
                    <img onClick={handleClose2}
                        src="/src/assets/images/x.svg"
                        alt="Next.js x"
                        width={30}
                        height={30}
                     
                    />
                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '40px' }}>
                    <img
                        src="/src/assets/images/correct.svg"
                        alt="Next.js logo"
                        width={80}
                        height={80}
                      
                    />
                </div>
                <DialogContent className={styles.w600}>
                    <div className={styles.description}>
                    Matches saved successfully
                    </div>
                    <Button variant="contained" className={styles.screen2} style={{ marginLeft: '15px', marginTop: '30px' }} onClick={handleClose2}>Ok</Button>
                  
                    
                </DialogContent>
            </Dialog>
        </>
    );
}

export default MatchResumePage;