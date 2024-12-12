import React, { useState } from 'react';
import styles from '../onboarding/Onboarding.module.css'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import AuthCommonLayout from '../../../../components/candidate/AuthCommonLayout/AuthCommonLayout';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();


 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('OTP Submitted: ', otp);
    navigate('/auth/candidate/setpassword'); 
  };

  return (
      <AuthCommonLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
       <div style={{display:'flex', flexDirection:'column'}}>
         <div> <p className={styles.otpPara}>Please enter a 6 digit OTP sent to your email address VinaXXXXXXXXXX.com</p></div>
          <div className={styles.otpInput}>
            <p className={styles.otpText}>OTP</p>
            <div className={styles.inputRow}>
              {Array(6).fill(null).map((_, i) => (
                <input
                  key={i}
                  type="text"
  
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={styles.inputText}
                  maxLength={1}
                  value={otp[i] || ''}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const newOtp = otp.split('');
                    newOtp[i] = target.value;
  
                    setTimeout(() => {
                      setOtp(newOtp.join(''));
                    }, 0);
  
                    if (target.value && i < 5) {
                      const nextInput = target.nextElementSibling as HTMLInputElement | null;
                      if (nextInput) {
                        nextInput.focus();
                      }
                    }
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onKeyDown={(e) => {
                    const target = e.target as HTMLInputElement;
  
                    if (e.key === 'Backspace' && i > 0 && !target.value) {
                      const prevInput = target.previousElementSibling as HTMLInputElement | null;
                      if (prevInput) {
                        prevInput.focus();
                      }
                    }
                  }}
                  required
                />
              ))}
            </div>
          </div>
       </div>
        <button type="submit" className={styles.nextBtn}>Next</button>
        <div className={styles.grayLine}></div>
        <p>Already have an account? <Link to="/auth/candidate/login" className={styles.link}>Login</Link></p>
      </form>
      </AuthCommonLayout>

  );
};

export default OTPPage;
