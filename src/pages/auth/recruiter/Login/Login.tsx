import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../onboarding/onboarding.module.css'
import AuthCommonLayout from '../../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import { Link } from 'react-router-dom';

const LoginRecruiterPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 

  const isFormValid = email.trim();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate('/recruiter/welcome/start');
  };

  return (
  <AuthCommonLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
       
        <input
          type="email"
          className={styles.inputEmail}
          placeholder="Official Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
          <input
          type="password"
          className={styles.inputText}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      
        <button type="submit" className={styles.nextBtn} disabled={!isFormValid}>Login</button>
        <p className={styles.textColor}>Dont have an account? <Link to="/auth/recruiter/onboarding" className={styles.link}>Register</Link></p>
      </form>
  </AuthCommonLayout>
  );
};

export default LoginRecruiterPage;
