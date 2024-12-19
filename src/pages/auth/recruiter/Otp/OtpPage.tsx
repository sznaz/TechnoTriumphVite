import React, { useState } from 'react';
import styles from '../onboarding/Onboarding.module.css'
import { useNavigate } from 'react-router-dom';
import AuthCommonLayout from '../../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { AuthService } from '../service/auth.service';
import { setFullname, setRegisterToken } from '../../../../redux/auth/authSlice';

const OTPRecruiterPage = () => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(state => state.auth.userEmail);
  const otpToken = useAppSelector(state => state.auth.otpToken);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');


 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await AuthService.instance.verifyOtp(userEmail, otp, otpToken);
      const fullname = response.data.data.fullname;
       const registerToken = response.data.data.registerToken;
      dispatch(setFullname(fullname));
      dispatch(setRegisterToken(registerToken));
      if(response.status === 200){
        navigate('/auth/recruiter/setpassword');
      }else{
        setError('Invalid credentials or server error.');
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      setError('An unexpected error occurred. Please try again later.'); 
    }
    console.log('OTP Submitted: ', otp); 
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
        <div className={styles.grayLine}></div>
        <p>Already have an account? <Link to="/auth/recruiter/login" className={styles.link}>Login</Link></p>
      </form>
    </AuthCommonLayout>
  );
};

export default OTPRecruiterPage;
