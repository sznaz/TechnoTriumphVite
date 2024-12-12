

import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonLayout from '../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import styles from './Welcome.module.css';

const WelcomeRecruiterPage = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/recruiter/welcome/start');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);



  return (
    <CommonLayout>

      <>
        <div className={styles.yesImage}>
          <img

            src="/src/assets/images/yes.svg"
            alt="Next.js logo"
            width={64}
            height={64}
           
          />
          <p>Awesome. </p>
          <p> Setting up your custom experience in a few moments...</p>
        </div>

      </>

    </CommonLayout>
  );
};

export default WelcomeRecruiterPage;