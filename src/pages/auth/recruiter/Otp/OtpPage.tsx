import React, { useState } from 'react';
import styles from '../onboarding/Onboarding.module.css'
import { useNavigate } from 'react-router-dom';
import AuthCommonLayout from '../../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import { Link } from 'react-router-dom';

const OTPRecruiterPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();


 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('OTP Submitted: ', otp);
    navigate('/auth/recruiter/setpassword'); 
  };

  return (
    <AuthCommonLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.otpPara}>Please enter the 6-digit OTP sent to your email address.</p>
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
        <button type="submit" className={styles.nextBtn}>Next</button>
        <p>Already have an account? <Link to="/auth/recruiter/login" className={styles.link}>Login</Link></p>
      </form>
    </AuthCommonLayout>
  );
};

export default OTPRecruiterPage;
