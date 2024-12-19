import React, { ReactNode } from 'react';
import styles from './AuthCommonLayout.module.css';
import FooterCandidatePage from '../footer/Footer';


interface CommonLayoutProps {
  children: ReactNode; 
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
   <>
    <div>
      
        <div className={styles.registerPage}>
          <img src='/src/assets/images/candidate.svg' alt="Background" className={styles.backgroundImg}  width={180}  height={38} />
          <header className={styles.header}>
            <img src='/src/assets/images/logo.svg' alt="Techno Triumph" className={styles.logo}  width={180}  height={38}/>
           
          </header>
           <h1 className={styles.mainTitle}>
              Welcome to <span>Techno Triumph</span>
            </h1>
          <div className={styles.formContainer}>
            {children}
          </div>
     
        </div>
       <FooterCandidatePage/>
    </div>
   </>
  );
};

export default CommonLayout;
