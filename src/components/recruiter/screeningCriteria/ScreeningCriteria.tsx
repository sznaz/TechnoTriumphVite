
import React, { useEffect, useState } from 'react';

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
import { JobService } from '../../../pages/recruiter/job/service/JobService';

interface Requirement {
    requirements: string;
    requirementsValue: string;
  };
  
  interface GeneralRequirementOption {
    _id: string; 
    name: string;
  }
  
  interface SkillOption {
    _id: string; 
    name: string;
  }

  interface JobUpdatePayload {
    generalRequirements: { [key: string]: number };
    skills: { [key: string]: number };
  }
  

function ScreeningPage() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [generalRequirements, setGeneralRequirements] = useState<Requirement[]>([
      { requirements: "", requirementsValue: "" },
    ]);
  
    const [skills, setSkills] = useState<{ skill: string; experience: string }[]>([
      { skill: "", experience: "" },
    ]);
  
    const [generalRequirementOptions, setGeneralRequirementOptions] = useState<GeneralRequirementOption[]>([]);
    const [skillOptions, setSkillOptions] = useState<SkillOption[]>([]);  
   
  
    const handleAddCriteria = () => {
      setGeneralRequirements([
        ...generalRequirements,
        { requirements: "", requirementsValue: "" },
      ]);
    };
  
    const handleRemoveCriteria = (index : number) => {
      const updatedRequirements = generalRequirements.filter(
        (_, i) => i !== index
      );
      setGeneralRequirements(updatedRequirements);
    };
  
    const handleAddSkill = () => {
      setSkills([...skills, { skill: "", experience: "" }]);
    };
  
    const handleRemoveSkill = (index: number) => {
      const updatedSkills = skills.filter((_, i) => i !== index);
      setSkills(updatedSkills);
    };
  
    const handleSkillChange = (
      index: number,
      field: "skill" | "experience", 
      value: string
    ) => {
      const updatedSkills = [...skills];
      updatedSkills[index][field] = value; 
      setSkills(updatedSkills);
    };
  let isCalled = false
    useEffect(()=>{
      if (isCalled) return;
      isCalled = true;
      async function fetchData (){
        try {
        const gnrlResponse = await JobService.instance.getGeneralRequirement();
        if(gnrlResponse.status ===200 && gnrlResponse?.data?.data){
            setGeneralRequirementOptions(gnrlResponse.data.data);
        }else{
          console.error("Failed to fetch requirements: ", gnrlResponse.statusText);
        } 
        const skillResponse = await JobService.instance.getSkill();
        if(skillResponse.status ===200 && skillResponse?.data?.data){
            setSkillOptions(skillResponse.data.data);
        }else{
          console.error("Failed to fetch requirements: ", skillResponse.statusText);
        } 
        } catch (error) {
          console.error("Error fetching requirements: ", error);
        }
  
      }
      fetchData();
    },[])
  
    // useEffect(()=>{
    //   async function fetchRequirements (){
    //     try {
    //     const response = await JobService.instance.getSkill();
    //     console.log("response", response);
    //     if(response.status ===200 && response?.data?.data){
    //         setSkillOptions(response.data.data);
    //     }else{
    //       console.error("Failed to fetch requirements: ", response.statusText);
    //     } 
    //     } catch (error) {
    //       console.error("Error fetching requirements: ", error);
          
    //     }
  
    //   }
    //   fetchRequirements();
    // },[])
  
    const handleClose = () => {
      setOpen(false);
    };
  
    
  
    const handleClick = async () => {
      console.log("hello")
      try {
        console.log("generalRequirements data:", generalRequirements);
        console.log("skills data:", skills);
        const generalRequirementsPayload: { [key: string]: number } = generalRequirements.reduce(
    (acc: { [key: string]: number }, requirement) => {
      if (requirement.requirements && requirement.requirementsValue) {
        acc[requirement.requirements] = parseInt(requirement.requirementsValue, 10);
      } else {
        console.warn("Missing data in requirement:", requirement);
      }
      return acc;
    },
    {}
  );
  
  console.log("generalRequirementsPayload:", generalRequirementsPayload);
  const skillsPayload: { [key: string]: number } = skills.reduce(
    (acc: { [key: string]: number }, skillItem) => {
     
      if (skillItem.skill && skillItem.experience) {
        acc[skillItem.skill] = parseInt(skillItem.experience, 10);
      } else {
        console.warn("Missing data in skillItem:", skillItem);
      }
      return acc;
    },
    {} as { [key: string]: number }
  );
  
  console.log("skillsPayload:", skillsPayload);
  
        
    
        const jobId = sessionStorage.getItem('jobId') as string;
        if (!jobId) {
          throw new Error("Job ID is not available in session storage.");
        }
        const payload: JobUpdatePayload = {
          generalRequirements: generalRequirementsPayload,
          skills: skillsPayload,
        };
    
        
        const response = await JobService.instance.updateJob(jobId, payload);
    
        if (response.status === 200) {
         navigate('/recruiter/job/all-jobs');
        } else {
          console.error('Failed to update job:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating job:', error);
      }
    };
  

 


 


    return (
        <>
        <div>
            <div className={styles.mainContainer}>
            <div className={styles.containerWrapper}>
                <div>
                    <div className={styles.headings}>Please specify the skills you are seeking in candidates. </div>
                    <div className={styles.subheadings}>Please note, that all resumes submitted for this position will be evaluated based on these criteria.</div>
        <div>
          <Accordion className={styles.accord}>
            <AccordionSummary
              className={styles.accordTitle}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              General Requirement
            </AccordionSummary>
            <AccordionDetails className={styles.accordDetails}>
            {generalRequirements.map((requirement, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                      <div className={styles.criteriaRow}>
                        <div className={styles.filterSection}>
                          <select
                            style={{ width: "100%", backgroundColor: "#fff" }}
                            value={requirement.requirements}
                            onChange={(e) => {
                              const updatedRequirements = [
                                ...generalRequirements,
                              ];
                              updatedRequirements[index].requirements =
                                e.target.value;
                              setGeneralRequirements(updatedRequirements);
                            }}
                          >
                            <option value="">Select</option>
                            {generalRequirementOptions.map((option, i) => (
                              <option key={i} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                      <div className={styles.filterSection}>
                        <input
                          type="text"
                          name="skill"
                          value={requirement.requirementsValue}
                          placeholder=""
                          className={styles.customInput}
                          onChange={(e) => {
                            const updatedRequirements = [
                              ...generalRequirements,
                            ];
                            updatedRequirements[index].requirementsValue =
                              e.target.value;
                            setGeneralRequirements(updatedRequirements);
                          }}
                        />
                      </div>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1} md={1} className={styles.trash}>
                    <IconButton
                      aria-label="delete"
                      className={styles.trashIcon}
                      onClick={() => handleRemoveCriteria(index)}
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
              ))}
              <Button className={styles.addCriteriaButton}  onClick={handleAddCriteria}>
                Add Criteria
              </Button>
            </AccordionDetails>
          </Accordion>
        </div>

        <div>
          <Accordion className={styles.accord}>
            <AccordionSummary
              className={styles.accordTitle}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Skills & Expertise
            </AccordionSummary>
            <AccordionDetails className={styles.accordDetails}>
            {skills.map((skillItem, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={5} md={5}>
            <FormControl fullWidth>
              <div className={styles.filterSection}>
                <select
                  value={skillItem.skill}
                  onChange={(e) =>
                    handleSkillChange(index, "skill", e.target.value)
                  }
                  style={{ width: "100%", backgroundColor: "#fff" }}
                >
                  <option value="">Select Skill</option>
                  {skillOptions.map((option, i) => (
                  <option key={i} value={option._id}>
                  {option.name}
                  </option>
                  ))}
                </select>
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={5} md={5}>
            <FormControl fullWidth>
              <div className={styles.filterSection}>
                         <input
                          type="text"
                          name="skill"
                          value={skillItem.experience}
                          placeholder=""
                          className={styles.customInput}
                          onChange={(e) => {
                            const updatedSkills = [...skills];
                            updatedSkills[index].experience = e.target.value;
                            setSkills(updatedSkills);
                          }}
                          />
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={2} md={2} className={styles.trash}>
            <IconButton
              aria-label="delete"
              className={styles.trashIcon}
              onClick={() => handleRemoveSkill(index)}
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
      ))}
  

  <Button className={styles.addCriteriaButton} onClick={handleAddSkill}>
    Add Skill
  </Button>
</AccordionDetails>
          </Accordion>
        </div>
        </div>
        <div className={styles.buttonSet}>
         <Button variant="outlined" className={styles.screen1}>Save as Draft</Button>
                        <Grid item xs={12} md={6} className={styles.alignRight}>
                      
                        <Link href="/job/new-job/overview" className={styles.screen1} style={{ marginLeft: '15px' }} >Back</Link> 
                        <Button  className={styles.screen2} style={{ marginLeft: '15px' }} onClick={handleClick}>Publish</Button> 
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
                                <Button variant="outlined" style={{ marginLeft: '15px' }}>Publish</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>             
      </div>
    </div>
            </div>
            
  </div>
</>
       
    )
}

export default ScreeningPage;