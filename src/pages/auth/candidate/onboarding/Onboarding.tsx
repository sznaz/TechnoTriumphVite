"use client";

import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './onboarding.module.css';

import { Link } from 'react-router-dom';
import AuthCommonLayout from '../../../../components/AuthCommonLayout/AuthCommonLayout';

const OnboardingPage = () => {
    const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const isFormValid = fullName.trim() && email.trim() && termsChecked;

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    navigate('/auth/candidate/onboarding/otp');
  };

  return (

<AuthCommonLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          className={styles.inputEmail}
          placeholder="Official Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.formCheckbox}>
          <input type="checkbox" id="terms" className={styles.customCheckbox} onChange={(e) => setTermsChecked(e.target.checked)} />
          <label htmlFor="terms"><span className={styles.textColor}>I agree to all</span><Link to=''> terms & conditions</Link></label>
        </div>
        <button type="submit" className={styles.nextBtn} disabled={!isFormValid}>Next</button>
        <div className={styles.grayLine}></div>
        <p className={styles.textColor}>Already have an account? <Link to="/auth/candidate/login" className={styles.link}>Login</Link></p>
      </form>
      </AuthCommonLayout>

  );
};

export default OnboardingPage;
