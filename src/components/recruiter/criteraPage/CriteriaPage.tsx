
import styles from "./CriteriaPage.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid } from "@mui/material";

interface CriteriaPageProps {
    setSelectedButton: (id: number) => void;
}
function CriteriaPage({ setSelectedButton }: CriteriaPageProps) {

    const handleClick = () => {
        setSelectedButton(2); 
    };

    return (
        <>
            <div>
                <div className={styles.title}>Sr Java Developer</div>
                <div className={styles.subTitle}>Job ID - LL/23/06/0001 </div>
            </div>
            <div>
                <Accordion className={styles.accord}>
                    <AccordionSummary
                        className={styles.accTitle}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        General Requirement
                    </AccordionSummary>
                    <AccordionDetails className={styles.accordDetails}>
                        <div>
                            <div className={styles.wd}>
                                <div className={styles.t1}>Min Experience</div>
                                <div className={styles.t2}>5 yrs</div>
                            </div>
                            <div className={styles.wd}>
                                <div className={styles.t1}>Job Location</div>
                                <div className={styles.t2}>Pune and Bangalore</div>
                            </div>
                            <div className={styles.wd}>
                                <div className={styles.t1}>Joining Duration</div>
                                <div className={styles.t2}>30 days</div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles.accord}>
                    <AccordionSummary className={styles.accTitle}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Technical Skills
                    </AccordionSummary>
                    <AccordionDetails className={styles.accordDetails}>

                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles.accord}>
                    <AccordionSummary className={styles.accTitle}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        Functional Skills
                    </AccordionSummary>
                    <AccordionDetails className={styles.accordDetails}>

                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles.accord}>
                    <AccordionSummary className={styles.accTitle}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4-content"
                        id="panel4-header"
                    >
                        Interpersonal Skills
                    </AccordionSummary>
                    <AccordionDetails className={styles.accordDetails}>

                    </AccordionDetails>
                </Accordion>
                <Grid item xs={12} md={6} className={styles.alignRight}>
                    <Button
                        variant="contained"
                        className={styles.screen2}
                        style={{ marginLeft: "15px" }}
                         onClick={handleClick}
                    >
                        Next
                    </Button>
                </Grid>
            </div>
        </>
    );
}

export default CriteriaPage;