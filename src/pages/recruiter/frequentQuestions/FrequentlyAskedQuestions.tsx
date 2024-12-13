

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import HeaderPage from '../../../components/recruiter/header/Header';
import FooterPage from '../../../components/recruiter/footer/Footer';
import styles from './Faq.module.css';
import { Button } from '@mui/material';


function FrequentlyAskedQuestionsPage() {
  const [expanded, setExpanded] = React.useState<string | false>(false);


  const accordionData = [
    {
      id: 'panel1',
      question: 'Frequently asked question number 1 will come here?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
      id: 'panel2',
      question: 'Frequently asked question number 2 will come here?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
      id: 'panel3',
      question: 'Frequently asked question number 3 will come here?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
      id: 'panel4',
      question: 'Frequently asked question number 4 will come here?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
      id: 'panel5',
      question: 'Frequently asked question number 5 will come here?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },

  ];

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <HeaderPage />
      <div className={styles.container}>
        <div className={styles.mainHeading}>Explore FAQs</div>
        <div className={styles.flexClass}>
          <div className={styles.innerContainer}>

            <div>
              {accordionData.map(({ id, question, answer }) => (
                <Accordion expanded={expanded === id} onChange={handleChange(id)} key={id} className={styles.accord} >
                  <AccordionSummary
                    expandIcon={expanded === id ? <NorthEastIcon className={styles.changePos} /> : <SouthEastIcon  sx={{color:'#333333'}}/>}
                    aria-controls={`${id}-content`}
                    id={`${id}-header`}
                    sx={{padding:'0'}}
                  >
                    <Typography>{question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{padding:'0px 0 15px 0',}}>
                    <Typography className={styles.addColor}>{answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>


          </div>
         <div >
              <div className={styles.rightContainer}>
                <div className={styles.heading}>
                  Still have questions?
                </div>
                <div className={styles.qnText}>
    
                  Lorem ipsum dolor sit amet consectetur.
                </div>
                <div>
                  <Button variant="outlined" className={styles.contactButton}>Contact Us</Button>
                </div>
                
              </div>
            <div className={styles.questionImg}>
                  <img
                            src="/src/assets/images/question.svg"
                            alt="trash"
                            width={32}
                            height={32}
                            
                          />
            </div>
         </div>
         
        </div>
        
      </div>
      <FooterPage />
    </>
  );
}


export default FrequentlyAskedQuestionsPage;
