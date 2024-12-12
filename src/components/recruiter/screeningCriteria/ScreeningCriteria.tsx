'use client'


import React from 'react';

import styles from './ScreeningCriteria.module.css';
import { Grid, IconButton, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import Dialog from '@mui/material/Dialog';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DialogContent from '@mui/material/DialogContent';

import { useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material';

function ScreeningPage() {
    const navigate = useNavigate();
  

 
    function handleClick() {

        navigate('/recruiter/job/all-jobs');

    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

 


    return (
        <>
            <div>
              
                <div className={styles.containerWrapper}>
             
                   
                    <div>
                        <div className={styles.headings}>Please specify the skills you are seeking in candidates. </div>
                        <div className={styles.subheadings}>Please note, that all resumes submitted for this position will be evaluated based on these criteria.</div>
                        {/* <div>
                            {accordianData.map((accord, accordionIndex) => (
                                <Accordion key={accordionIndex} className={styles.accord}>
                                    <AccordionSummary className={styles.accordTitle}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                          <Typography variant="subtitle1">
                                {accord.title}   {countSelectedOptions(accordianCriteria[accordionIndex]) > 0 &&
                                    `- ${countSelectedOptions(accordianCriteria[accordionIndex])}`}
                            </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>

                                            {accordianCriteria[accordionIndex].map((criteria, criteriaIndex) => (
                                                <div key={criteriaIndex} className={styles.criteriaRow}>

<FormControl fullWidth>
                                            <InputLabel>Select Option 1</InputLabel>
                                            <Select
                                                value={criteria.select1}
                                                onChange={(e) =>
                                                    handleSelectChange(
                                                        accordionIndex,
                                                        criteriaIndex,
                                                        'select1',
                                                        e.target.value
                                                    )
                                                }
                                                label="Select Option 1"
                                            >
                                                {selectOptions[accord.title].map((option: string, idx: number) => (
                                                    <MenuItem key={idx} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <InputLabel>Select Option 2</InputLabel>
                                            <Select
                                                value={criteria.select2}
                                                onChange={(e) =>
                                                    handleSelectChange(
                                                        accordionIndex,
                                                        criteriaIndex,
                                                        'select2',
                                                        e.target.value
                                                    )
                                                }
                                                label="Select Option 2"
                                               
                                                disabled={!criteria.select1} 
                                            >
                                                {criteria.select1 && answerOptions[accord.title][criteria.select1].map((answer: string, idx: number) => (
                                                    <MenuItem key={idx} value={answer}>
                                                        {answer}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => handleRemoveCriteria(accordionIndex, criteriaIndex)}
                                                        className={styles.trashIcon}
                                                    >
                                                        <Image

                                                            src="/src/assets/images/trash.svg"
                                                            alt="trash"
                                                            width={16}
                                                            height={16}
                                                            priority
                                                        />
                                                    </IconButton>
                                                </div>
                                            ))}


                                            <Button

                                                className={styles.addCriteriaButton}
                                                onClick={() => handleAddCriteria(accordionIndex)}
                                            >
                                                Add Criteria
                                            </Button>
                                        </div>

                                        <div>

                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                            ))}
                        </div> */}
                        <div>
                            <Accordion className={styles.accord}>
                                <AccordionSummary className={styles.accordTitle}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    General Requirement
                                </AccordionSummary>
                                <AccordionDetails className={styles.accordDetails}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={4}>

                                            <FormControl fullWidth>
                                                <div className={styles.criteriaRow}>
                                                    {/* <Select style={{ width: '100%', backgroundColor: '#fff' }}
                                                        value={age}
                                                        onChange={handleChange}
                                                        label="Select Option 1"
                                                    >
                                                        <MenuItem value={10}>Graduation</MenuItem>
                                                        <MenuItem value={20}>Master</MenuItem>
                                                        <MenuItem value={30}>HSC</MenuItem>
                                                    </Select> */}
                                                    <div className={styles.filterSection}>
                                                        <select style={{ width: '100%', backgroundColor: '#fff' }}>
                                                            <option value=""></option>
                                                            <option value="">Graduation</option>
                                                            <option value="">HSC</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6} md={4}>

                                            <FormControl fullWidth>
                                                <div className={styles.filterSection}>
                                                    <select style={{ width: '100%', backgroundColor: '#fff' }}>
                                                        <option value="">Select</option>
                                                        <option value="">Option 1</option>
                                                        <option value="">Option 2</option>
                                                    </select>
                                                </div>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={1} md={1} className={styles.trash}>
                                            <IconButton
                                                aria-label="delete"
                                                className={styles.trashIcon}
                                            >
                                                <img

                                                    src="/src/assets/images/trash.svg"
                                                    alt="trash"
                                                    width={16}
                                                    height={16}
                                                  
                                                />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        className={styles.addCriteriaButton}
                                    >
                                        Add Criteria
                                    </Button>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                        <div>
                            <Accordion className={styles.accord}>
                                <AccordionSummary className={styles.accordTitle}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Technical Skills
                                </AccordionSummary>
                                <AccordionDetails className={styles.accordDetails}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <div className={styles.txt}>Must Have Skills</div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={5} md={5}>
                                                    <FormControl fullWidth>
                                                        <div className={styles.filterSection}>
                                                            <select style={{ width: '100%', backgroundColor: '#fff' }}>
                                                                <option value=""></option>
                                                                <option value="">Graduation</option>
                                                                <option value="">HSC</option>
                                                            </select>
                                                        </div>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={5} md={5}>
                                                    <FormControl fullWidth>
                                                        <div className={styles.filterSection}>
                                                            <select style={{ width: '100%', backgroundColor: '#fff' }}>
                                                                <option value="">Select</option>
                                                                <option value="">Option 1</option>
                                                                <option value="">Option 2</option>
                                                            </select>
                                                        </div>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={2} md={2} className={styles.trash}>
                                                    <IconButton
                                                        aria-label="delete"
                                                        className={styles.trashIcon}
                                                    >
                                                        <img

                                                            src="/src/assets/images/trash.svg"
                                                            alt="trash"
                                                            width={16}
                                                            height={16}
                                                         
                                                        />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Button
                                                className={styles.addCriteriaButton}
                                            >
                                                Add Skill
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className={styles.txt}>Good to Have Skills</div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={5} md={5}>
                                                    <FormControl fullWidth>
                                                    <div className={styles.filterSection}>
                                                            <select style={{ width: '100%', backgroundColor: '#fff' }}>
                                                                <option value=""></option>
                                                                <option value="">Graduation</option>
                                                                <option value="">HSC</option>
                                                            </select>
                                                        </div>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={5} md={5}>
                                                    <FormControl fullWidth>
                                                       <div className={styles.filterSection}>
                                                        <select style={{ width: '100%', backgroundColor: '#fff' }}>
                                                            <option value="">Select</option>
                                                            <option value="">Option 1</option>
                                                            <option value="">Option 2</option>
                                                        </select>
                                                    </div>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={2} md={2} className={styles.trash}>
                                                    <IconButton
                                                        aria-label="delete"
                                                        className={styles.trashIcon}
                                                    >
                                                        <img

                                                            src="/src/assets/images/trash.svg"
                                                            alt="trash"
                                                            width={16}
                                                            height={16}
                                                          
                                                        />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Button
                                                className={styles.addCriteriaButton}
                                            >
                                                Add Skill
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </AccordionDetails>
                            </Accordion>
                        </div>

                        <div>
                            <Accordion className={styles.accord}>
                                <AccordionSummary className={styles.accordTitle}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    Functional Skills
                                </AccordionSummary>
                                <AccordionDetails className={styles.accordDetails}>

                                </AccordionDetails>
                            </Accordion>
                        </div>

                        <div>
                            <Accordion className={styles.accord}>
                                <AccordionSummary className={styles.accordTitle}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="pane4-content"
                                    id="panel4-header"
                                >
                                    Interpersonal Skills
                                </AccordionSummary>
                                <AccordionDetails className={styles.accordDetails}>

                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        
                            {/* <Grid item xs={12} md={6} className={styles.adds}>
                                <Button variant="outlined" className={styles.screen1}>Pre</Button>
                                <Button variant="outlined" className={styles.screen1} style={{ marginLeft: '15px' }}>Next</Button>
                            </Grid> */}

                            <Grid item xs={12} md={6} className={styles.alignRight}>

                            <Link href="/recruiter/job/new-job/overview" className={styles.screen1} style={{ marginLeft: '15px' }} >Prev</Link> 
                            
                            <Button variant="outlined" className={styles.screen1} style={{ marginLeft: '15px' }} onClick={handleClickOpen}>Next</Button>

                                {/* <Button variant="outlined" className={styles.screen1}>Save as Draft</Button>
                                <Button variant="contained" className={styles.screen2} style={{ marginLeft: '15px' }} onClick={handleClickOpen}>Publish</Button> */}
                            
                        </Grid>
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
                                height={30 }
                                style={{cursor:'pointer'}}
                               
                                />
                        </div>
                        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',marginTop: '20px'}}>
                            <img
                                src="/src/assets/images/dailogeimg.svg"
                                alt="Next.js logo"
                                width={127}
                                height={123 }
                            
                                />
                        </div>
                       
                        <DialogContent>
                        <div className={styles.description}>
  <p style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
    Are you sure you want to publish this job posting?
  </p>
  <div style={{ fontSize: '12px', textAlign: 'center', color: '#666', maxWidth: '500px', margin: '0 auto' }}>
    It will be displayed on the website and open for candidates to view and apply.
  </div>
</div>

                            <Grid container spacing={2} >
                                <Grid item xs={12} md={12} style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px'}}>
                                    <Button variant="outlined" className={styles.screen1} onClick={handleClose}>Save as Draft</Button>
                                    <Button variant="outlined" className={styles.screen2} style={{ marginLeft: '15px' }} onClick={handleClick}>Publish</Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                    </div>
                </div>
              
            </div>
        </>
    )
}

export default ScreeningPage;