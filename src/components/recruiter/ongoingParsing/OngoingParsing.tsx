

import { useState, useEffect } from 'react';
import styles from './card.module.css';
import HeaderPage from '../header/Header';
import FooterRecruiterPage from '../footer/Footer';

const OngoingParsing = () => {
  
  const [isCompleted, setIsCompleted] = useState(false);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true); 
    }, 5000); 
   
    return () => clearTimeout(timer);
  }, []);

  return (
   <div>
    <HeaderPage/>
     <div className={styles.container}>
            <div className={styles.mainHeading}>Ongoing Parsing </div>
            <div className={styles.card}>
         
              <div className={styles.topSection}>
                <div>
                  <span className={styles.title}>Job Description for</span>
                  <span className={styles.subTitle}>Java Senior Developer...</span>
                </div>
                <span className={isCompleted ? styles.completedStatus : styles.inProgressStatus}>
                  {isCompleted ? (
                    <>
                       <div className={styles.iconCircle}>
                        <span className={styles.icon}>✔</span> 
                      </div> <span style={{fontSize:'11px', color: '#1C7705'}}>Completed</span>
                    </>
                  ) : (
                    "In Progress"
                  )}
                </span>
              </div>
        
              
              <div className={styles.bottomSection}>
                <p style={{fontSize:'12px', color:'#777777'}}>Parsing Initiated</p>
                <p style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)', fontSize:'14px', color:'#333333'}}>15 June 2024 9:30 AM</p>
                <p style={{fontSize:'11px', color:'#666666'}}>Once completed, you can continue matching resumes</p>
              </div>
            </div>
     </div>
     <FooterRecruiterPage/>
   </div>
  );
};

export default OngoingParsing;
