import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../onboarding/Onboarding.module.css';
import AuthCommonLayout from '../../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import { Link } from 'react-router-dom';

const PasswordRecruiterForm = () => {
    const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
 

 
  const isFormValid = password.trim() && password === retypePassword ;

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (isFormValid) {
        navigate('/recruiter/welcome'); 
    }
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
        <p>Already have an account? <Link to="/auth/recruiter/login" className={styles.link}>Login</Link></p>
      </form>
  </AuthCommonLayout>
  );
};

export default PasswordRecruiterForm;
