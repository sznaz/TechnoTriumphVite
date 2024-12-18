import React, { ReactNode } from 'react';
import styles from './AuthCommonLayout.module.css';
import FooterRecruiterPage from '../footer/Footer';


interface CommonLayoutProps {
  children: ReactNode; 
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
   <>
    <div>
        <div className={styles.registerPage}>
          <img src="/src/assets/images/background.svg" alt="Background" className={styles.backgroundImg}  width={180}  height={38}  />
          <header className={styles.header}>
            <img src="/src/assets/images/logo.svg" alt="Techno Triumph" className={styles.logo}  width={180}  height={38}/>
           
          </header>
           <h1 className={styles.mainTitle}>
              Welcome to <span>Techno Triumph</span>
            </h1>
    
            
          {/* <div className={styles.buttons}>
            <button className={styles.recruiterBtn}>Register as Recruiter</button>
            <button className={styles.candidateBtn}>Register as Candidate</button>
          </div> */}
          <div className={styles.formContainer}>
            {children}
          </div>
     
        </div>
        <FooterRecruiterPage/>
    </div>
   </>
  );
};

export default CommonLayout;
