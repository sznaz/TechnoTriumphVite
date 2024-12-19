import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../onboarding/onboarding.module.css'
import AuthCommonLayout from '../../../../components/recruiter/AuthCommonLayout/AuthCommonLayout';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { AuthService } from '../service/auth.service';
import { jwtDecode } from 'jwt-decode';
import { setAccessToken, setIdToken, setTenantId, setUserDetails } from '../../../../redux/auth/authSlice';
import HttpService from '../../../../service/httpService';

interface DecodedToken {
  user?: {
    _id?: string;
    fullname?: string;
    email?: string;
    roles?: string[];
    status?: number;
    tenant?: string[];
    createdAt?: string;
    updatedAt?: string;
    refreshToken?: string;
  };
}

interface UserDetails {
  _id: string;
  fullname: string;
  email: string;
  roles: string[];
  status: number;
  tenant: string[];
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
}


const LoginRecruiterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
 

  const isFormValid = email.trim() && password.trim();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isFormValid) return;
      setError('');
   try {
    const response = await AuthService.instance.login(email, password);
    console.log("response", response);
    
    if(response.status === 200){
    const idToken = response.data.data.idToken
    const decode:DecodedToken  = jwtDecode(idToken);
      if(decode?.user?.tenant){
        const tenantId = decode.user.tenant[0];
        localStorage.setItem('tenant', tenantId)
        dispatch(setTenantId(tenantId));
      }
      const userDetails: UserDetails = decode?.user
      ? {
          _id: decode.user._id || '',
          fullname: decode.user.fullname || '',
          email: decode.user.email || '', 
          roles: decode.user.roles || [], 
          status: decode.user.status || 0, 
          tenant: decode.user.tenant || [], 
          createdAt: decode.user.createdAt || new Date().toISOString(), 
          updatedAt: decode.user.updatedAt || new Date().toISOString(), 
          refreshToken: decode.user.refreshToken || '', 
        }
      : {
          _id: '',
          fullname: '',
          email: '',
          roles: [],
          status: 0,
          tenant: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          refreshToken: '',
        };
      dispatch(setUserDetails(userDetails));
      const refreshToken = response.data.data.refreshToken;
      const accessToken = response.data.data.accessToken;
      dispatch(setAccessToken(accessToken));
      dispatch(setIdToken(idToken));
      localStorage.setItem('refreshToken', refreshToken);
      HttpService.instance.accessToken = accessToken
      navigate('/recruiter/welcome/start');
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
