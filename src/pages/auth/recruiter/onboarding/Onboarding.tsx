import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './onboarding.module.css';
import AuthCommonLayout from '../../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import { Link } from 'react-router-dom';
import { AuthService } from '../service/auth.service';
import { useAppDispatch } from '../../../../redux/hooks';
import { setOtpToken, setUserEmail } from '../../../../redux/auth/authSlice';

const OnboardingRecruiterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = fullName.trim() && email.trim() && termsChecked;

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isFormValid) return;
    setError('');
    try {
      const response = await AuthService.instance.sendOtp(fullName, email);
  
      if(response.status === 200 && response.data && response.data.data){
        const userEmail = response.data.data.email;
        const otpToken = response.data.data.otpToken;
        dispatch(setUserEmail(userEmail));
        dispatch(setOtpToken(otpToken));
        navigate('/auth/recruiter/onboarding/otp');
      }else{
        setError('Invalid credentials or server error.');
        console.log(error)
      }
    } catch (error) {
      console.log(error)
      setError('An unexpected error occurred. Please try again later.');
      
    }
    
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
          <label htmlFor="terms"><span className={styles.textColor}>I agree to all</span> <Link to='' style={{textDecoration:'none',color:'black'}}>terms & conditions</Link></label>
        </div>
        <button type="submit" className={styles.nextBtn} disabled={!isFormValid}>Next</button>
        <div className={styles.grayLine}></div>
        <p className={styles.textColor}>Already have an account? <Link to="/auth/recruiter/login" className={styles.link}>Login</Link></p>
      </form>
  </AuthCommonLayout>
  );
};

export default OnboardingRecruiterPage;
