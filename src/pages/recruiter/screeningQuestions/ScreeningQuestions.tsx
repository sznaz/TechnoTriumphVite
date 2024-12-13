

import { useEffect, useState } from 'react';
import styles from './ScreeningQuestions.module.css';
import HeaderPage from '../../../components/recruiter/header/Header';
import FooterPage from '../../../components/recruiter/footer/Footer';
import {Link} from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';


const initialQuestionData  = [
    { question: 'How many years of relevant experience do you have?', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, non. Error fuga, dignissimos maxime blanditiis minima harum minus inventore magni porro rem veniam, et voluptatem nemo vel obcaecati at ipsam?', type: 'MCQ',  options: ["Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"], },
    { question: 'What is your highest level of education?', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, non. Error fuga, dignissimos maxime blanditiis minima harum minus inventore magni porro rem veniam, et voluptatem nemo vel obcaecati at ipsam?', type: 'MCQ',   options: ["High School", "Bachelors", "Masters", "PhD"], },
    { question: 'What is Your notice Period?', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, non. Error fuga, dignissimos maxime blanditiis minima harum minus inventore magni porro rem veniam, et voluptatem nemo vel obcaecati at ipsam?', type: 'MCQ',  options: ["Immediate", "less than 1 month", "2 months", "3 months"], },
    { question: 'What is your current salary?', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, non. Error fuga, dignissimos maxime blanditiis minima harum minus inventore magni porro rem veniam, et voluptatem nemo vel obcaecati at ipsam?', type: 'MCQ', options: ["Less than 2LPA", "2LPA-4LPA", "4LPA-6LPA", "More than 6LPA"], },
    { question: 'What is your expected salary?', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, non. Error fuga, dignissimos maxime blanditiis minima harum minus inventore magni porro rem veniam, et voluptatem nemo vel obcaecati at ipsam?', type: 'MCQ', options: ["Less than 2LPA", "2LPA-4LPA", "4LPA-6LPA", "More than 6LPA"], },

];

interface Question {
    question: string;
    type: string;
    options: string[];
}
function ScreeningQuestionsPage() {
   
    const [selectedType, setSelectedType] = useState('');
    const [dynamicRows, setDynamicRows] = useState<{ id: number }[]>([]);
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    
    const [isEditing, setIsEditing] = useState(false);
    const [questionData, setQuestionData] = useState(initialQuestionData );
    const [selectedQuestion, setSelectedQuestion] = useState<Question>({
        question: '',
        type: '',
        options: [],
    });

    const handleClickOpen = (question: Question, isEdit: boolean) => {
        setSelectedQuestion(question);
        setIsEditing(isEdit);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function confirm() {
        setOpen(false);
    }
    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const addNewRow = () => {
        setDynamicRows((prevRows) => [...prevRows, { id: prevRows.length + 1 }]);
    };
    const removeRow = (id: number) => {
        setDynamicRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedType(value);


        if (value === 'checkbox' || value === 'dropdown' || value === 'textbox') {
            setDynamicRows([{ id: 1 }]);
        } else {
            setDynamicRows([]);
        }
    };
    const handleDeleteQuestion = (index: number) => {
       
        const updatedQuestions = [...questionData];
        updatedQuestions.splice(index, 1); 

      
        setQuestionData(updatedQuestions); 
    };
    useEffect(() => {
        if (selectedType === 'checkbox' || selectedType === 'dropdown' || selectedType === 'textbox') {
           
            if (dynamicRows.length === 0) {
                addNewRow();
            }
        }
    }, [selectedType, dynamicRows.length]);

    return (
        <>
            <div>
                <HeaderPage />
                <div className={styles.container}>
                    <div className={styles.topContainer}>
                        <div>
                            <div className={styles.breadcrumb}>Home / Jobs / Screening Questions Dumb </div>
                            <div className={styles.txtTitle}>Screening Questions Dump</div>
                        </div>

                        <div>
                            <Grid item xs={12} md={6} className={styles.adds}>
                            <Button variant="outlined" className={styles.screen1} onClick={() => handleClickOpen({ question: '', type: '', options: [] }, true)}>Add new Question</Button>
                                <Button variant="outlined" className={styles.screen2} style={{ marginLeft: '15px' }} >Upload Excel</Button>
                            </Grid>
                        </div>
                    </div>


                    <div className={styles.tableContainer}>
                    <table>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Question</th>
                                    <th>Question Description</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionData.map((question, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}
                                                  sx={{
                                                    backgroundColor: '#fff8f0', 
                                                    boxShadow: 'none', 
                                                    border: 'none', 
                                                    '&.Mui-expanded': {
                                                        backgroundColor: '#fff8f0', 
                                                    },
                                                }}>
                                                    <AccordionSummary 
                                                     >
                                                        <Typography>{question.question}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails
                                                      >
                                                        <div className={styles.accordianData}>
                                                           
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                                                {question.options.map((option, idx) => (
                                                                    <Typography key={idx} component="span">
                                                                        ({String.fromCharCode(97 + idx)}) {option}
                                                                    </Typography>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </td>
                                            <td>{question.description.slice(0, 30)}...</td>
                                            <td>{question.type}</td>
                                            <td>
                                                <div className={styles.flexClass}>
                                                    <div className={styles.mr16}>
                                                        <img
                                                            src="/src/assets/images/edit.svg"
                                                            alt="edit"
                                                            width={16}
                                                            height={16}
                                                           
                                                            style={{maxWidth:'20px', cursor:'pointer'}}
                                                            onClick={() => handleClickOpen(question, true)}
                                                        />
                                                    </div>
                                                    <div className={styles.mr16}>
                                                        <img
                                                            src="/src/assets/images/trash.svg"
                                                            alt="trash"
                                                            width={16}
                                                            height={16}
                                                          
                                                            style={{maxWidth:'20px', cursor:'pointer'}} 
                                                            onClick={() => handleDeleteQuestion(index)}
                                                        />
                                                    </div>
                                                    <Link to="" style={{cursor:'pointer'}}  onClick={() => handleClickOpen(question, false)}>View Detail</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{
                            style: {
                                width: '562px',
                                maxWidth: '90%',
                                borderRadius: '16px',
                            },
                        }}
                    >
                        <div className={styles.close}>
                            <img onClick={handleClose}
                                src="/src/assets/images/x.svg"
                                alt="Close"
                                width={30}
                                height={30}
                             
                                style={{cursor:'pointer'}}
                            />
                        </div>

                        <DialogContent sx={{ padding: '50px' }}>
                            <div className={styles.description}>
                            {isEditing ? 'Edit Question' : 'View Question Details'}
                            </div>
                            <div className={styles.questionForm}>
                            <input
    type="text"
    className={styles.inputQuestion}
    placeholder="Enter the Question"
    required
    value={selectedQuestion?.question || ''}
    onChange={(e) => {
        setSelectedQuestion({
            ...selectedQuestion,
            question: e.target.value,
            type: selectedQuestion?.type || '',  
            options: selectedQuestion?.options || []  
        });
    }}
    readOnly={!isEditing} 
/>
                                <select
                                    className={styles.inputQuestion}
                                    required
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                    disabled={!isEditing}
                                >
                                    <option value="" disabled hidden>Select Question Type</option>
                                    <option value="checkbox">Checkbox</option>
                                    <option value="dropdown">Dropdown</option>
                                    <option value="textbox">TextBox</option>
                                </select>
                            </div>


                            {(selectedType === 'checkbox' || selectedType === 'dropdown' )  && (
                                <div className={styles.innerContainer}>
                                    {dynamicRows.map((row) => (
                                        <div key={row.id} className={styles.dynamicRow}>
                                                  
                                                    {selectedType === 'checkbox' && (
          <input type="checkbox" id="terms" className={styles.customCheckbox} />
                                                    )}
     <input
                                    type="text"
                                    className={styles.innerSelect}
                                    placeholder="Enter the option"
                                    required
                                    disabled={!isEditing}
                                />
                                            {/* <select   className={styles.innerSelect} required>
                                                <option value="option1">Option 1</option>
                                                <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option>
                                            </select> */}
                                            <img
                                                src="/src/assets/images/trash.svg"
                                                alt="Delete Row"
                                                width={16}
                                                height={16}
                                                onClick={() => removeRow(row.id)}
                                                className={styles.trashIcon}
                                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                                            />
                                        </div>
                                    ))}


                                    <Button  className={styles.addMoreButton} onClick={addNewRow}>
                                        Add More
                                    </Button>
                                </div>
                            )}

{selectedType === 'textbox' && (
                               <div  className={styles.innerContainer}>
                                    <input
                                        type="text"
                                        className={styles.inputQuestion}
                                        placeholder="Enter your text"
                                        required
                                        disabled={!isEditing}
                                    />
                               </div>
                            )}

                            <Grid container spacing={2} >
                                <Grid item xs={12} md={12} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px' }}>

                                    <Button variant="outlined" className={styles.screen2} style={{ marginLeft: '15px' }} onClick={confirm}>OK</Button>
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
export default ScreeningQuestionsPage;