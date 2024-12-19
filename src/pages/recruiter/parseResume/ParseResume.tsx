

import HeaderPage from '../../../components/recruiter/header/Header';
import styles from './ParseResume.module.css';
import { Button } from "@mui/material";




import { useState } from 'react';
import FooterPage from '../../../components/recruiter/footer/Footer';
import CriteriaPage from '../../../components/recruiter/criteraPage/CriteriaPage';
import UploadResumePage from '../../../components/recruiter/uploadResume/UploadResume';
import MatchResumePage from '../../../components/recruiter/matchResume/MatchResume';

function ParseResumePage() {
    const [selectedButton, setSelectedButton] = useState<number>(1);

    const handleEvent = (id: number) => {
        console.log(`Event handled for ID: ${id}`);
        setSelectedButton(id);
    };
    return (
        <>
            <div>
                <HeaderPage />
                <div className={styles.containerWrapper}>
                    <div>
                        <div className={styles.breadcrumb}>Home / Jobs / New </div>
                        <div className={styles.txtTitle}>Parse Resume.</div>
                        <div>
                            <Button
                                variant="contained"
                                className={`${styles.overview} ${selectedButton === 1 ? styles.isSelected : ''}`}
                                onClick={() => handleEvent(1)}
                            >
                                Screening Criteria
                            </Button>
                            <Button
                                variant="outlined"
                                className={`${styles.screen} ${selectedButton === 2 ? styles.isSelected : ''}`}
                                onClick={() => handleEvent(2)}
                            >
                                Upload Resume
                            </Button>
                            <Button
                                variant="outlined"
                                className={`${styles.screen} ${selectedButton === 3 ? styles.isSelected : ''}`}
                                onClick={() => handleEvent(3)}
                            >
                                Match Resume
                            </Button>
                        </div>
                    </div>

                    <div>
                    {selectedButton === 1 && <CriteriaPage setSelectedButton={setSelectedButton} />}
                        {selectedButton === 2 && <UploadResumePage setSelectedButton={setSelectedButton} />}
                        {selectedButton === 3 && <MatchResumePage />}
                    </div>
                </div>
                <FooterPage/>
            </div>
        </>
    );
}

export default ParseResumePage;
