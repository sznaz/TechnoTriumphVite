
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Welcome.module.css';
import CommonLayout from '../../../components/candidate/AuthCommonLayout/AuthCommonLayout';


const WelcomeCandidatePage = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/candidate/welcome/start');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);



  return (

<CommonLayout>
      <>
        <div className={styles.tickImage}>
          <img

            src="/src/assets/images/green-tick.svg"
            alt="Next.js logo"
            width={64}
            height={64}
         
          />
          <p className={styles.mainText} >Awesome! </p>
       <div className={styles.smallText}>   <p> Setting up your custom experience in a few moments...</p></div>
        </div>

      </>
      </CommonLayout>

   
  );
};

export default WelcomeCandidatePage;