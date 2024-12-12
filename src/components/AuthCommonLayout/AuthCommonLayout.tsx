import React, { ReactNode } from 'react';
import styles from './AuthCommonLayout.module.css';



interface CommonLayoutProps {
  children: ReactNode; 
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
   <>
    <div>
        <div className={styles.registerPage}>
          <img src="/images/candidate.svg" alt="Background" className={styles.backgroundImg}  width={180}  height={38} />
          <header className={styles.header}>
            <img src="/images/logo.svg" alt="Techno Triumph" className={styles.logo}  width={180}  height={38}/>
           
          </header>
           <h1 className={styles.mainTitle}>
              Welcome to <span>Techno Triumph</span>
            </h1>
          <div className={styles.formContainer}>
            {children}
          </div>
     
        </div>
       
    </div>
   </>
  );
};

export default CommonLayout;
