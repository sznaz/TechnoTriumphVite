import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../onboarding/Onboarding.module.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link } from 'react-router-dom';
import AuthCommonLayout from '../../../../components/candidate/AuthCommonLayout/AuthCommonLayout';

const PasswordForm = () => {
    const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = password.trim() && password === retypePassword;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isFormValid) {
        navigate("/candidate/welcome");
    }
  };

  return (
    <AuthCommonLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.passwordText}>
          Great, your email address is verified. Please set a password. Make
          sure it is a minimum 8 characters, alphanumeric string.
        </p>
        <div className={styles.passwordField}>
          <input
            type={showPassword ? "text" : "password"} 
            className={styles.inputText}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <VisibilityOffOutlinedIcon
              className={styles.icon}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <VisibilityOutlinedIcon
              className={styles.icon}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <div className={styles.passwordField}>
          <input
            type={showPassword ? "text" : "password"} 
            className={styles.inputText}
            placeholder="Re-enter Password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
          {showPassword ? (
            <VisibilityOffOutlinedIcon
              className={styles.icon}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <VisibilityOutlinedIcon
              className={styles.icon}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        {password !== retypePassword && retypePassword && (
          <p className={styles.errorText}>Passwords do not match</p>
        )}

        <button type="submit" className={styles.nextBtn} disabled={!isFormValid}>
          Next
        </button>
        <div className={styles.grayLine}></div>
        <p className={styles.smallText}>
          Already have an account?{" "}
          <Link to="/auth/candidate/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </AuthCommonLayout>
  );
};

export default PasswordForm;
