import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../onboarding/Onboarding.module.css';
import AuthCommonLayout from '../../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { AuthService } from '../service/auth.service';
import { setAccessToken } from '../../../../redux/auth/authSlice';

const PasswordRecruiterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fullname = useAppSelector(state => state.auth.fullname);
  const userEmail = useAppSelector(state => state.auth.userEmail);
  const registerToken = useAppSelector(state => state.auth.registerToken);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');

  const isFormValid = password.trim() && password === retypePassword ;

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(!isFormValid){
      setError('')
    }
    
    try {
      const roles = [
        "recruiter"
      ]
      const response = await AuthService.instance.register(fullname, userEmail, password, roles, registerToken);

      if(response.status === 200){
        const refreshToken = response.data.data.refreshToken;
        const acessToken = response.data.data.accessToken;
        dispatch(setAccessToken(acessToken));
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/recruiter/welcome'); 
      }else{
        setError('Failed to register. Please try again.');
        console.log(error)
      } 
    } catch (error) {
      console.log(error);
      setError('An unexpected error occurred. Please try again later') 
    }


    
    
        navigate('/recruiter/welcome'); 
    
  };

  return (
  <AuthCommonLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
           <p>Great, your email address is verified. Please set a password. 
           Make sure it is a minimum 8 characters, alphanumeric string. </p>
        <input
          type="password"
          className={styles.inputText}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.inputText}
          placeholder="Re-type Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          required
        />
        {password !== retypePassword && retypePassword && (
          <p className={styles.errorText}>Passwords do not match</p>
        )}
       
        <button type="submit" className={styles.nextBtn} disabled={!isFormValid}>
          Submit
        </button>
        <div className={styles.grayLine}></div>
        <p>Already have an account? <Link to="/auth/recruiter/login" className={styles.link}>Login</Link></p>
      </form>
  </AuthCommonLayout>
  );
};

export default PasswordRecruiterForm;
