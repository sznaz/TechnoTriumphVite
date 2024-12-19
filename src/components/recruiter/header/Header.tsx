import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid2'
import styles from "./Header.module.css";
import { useEffect, useState, useCallback } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

function HeaderRecruiterPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 

  
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const pathToTab: Record<string, string> = {
      "/recruiter/welcome": "Home",
      "/recruiter/home": "Home",
      "/recruiter/job/all-jobs": "Jobs",
      "/recruiter/candidate": "Candidates",
      "/recruiter/invite/addMembers": "Team",
      "/recruiter/job/screeningQuestions": "Screening Questions",
    };

    const matchedTab = Object.keys(pathToTab).find((path) =>
        location.pathname.startsWith(path)
      );
  
      setActiveTab(matchedTab ? pathToTab[matchedTab as keyof typeof pathToTab] : "");
    }, [location]);
  
    const menuItems = ["Home", "Jobs", "Candidates", "Team", "Screening Questions"];

  return (
    <div className={styles.headerWrapper}>
      <Grid container className={styles.headerContainer}>
        <Grid size={{ xs: 4, md: 2 }}  className={styles.logoContainer}>
          <img
            src="/src/assets/images/logo.svg"
            alt="TechnoTriumph Logo"
            width={150}
            height={38}
           
          />
        </Grid>

       
        <Grid  className={styles.menuGrid}>
          <ul className={`${styles.menuList} ${menuOpen ? styles.menuOpen : ""}`}>
            {menuItems.map((tab) => (
              <li
                key={tab}
                className={`${styles.menuItem} ${activeTab === tab ? styles.activeTab : ""}`}
              >
 
                  <Link
                    to={
                      tab === "Home"
                        ? "/recruiter/welcome/start"
                        : tab === "Jobs"
                        ? "/recruiter/job/all-jobs"
                        : tab === "Candidates"
                        ? "/recruiter/candidate"
                        : tab === "Team"
                        ? "/recruiter/invite/addMembers"
                        : tab === "Screening Questions"
                        ? "/recruiter/job/screeningQuestions"
                        : "#"
                    }
                    className={styles.linkStyle}
                  >
                    {tab}
                  </Link>
              </li>
            ))}
          </ul>
        </Grid>

      
        <Grid  className={styles.profileSection}>
          <Button
            className={styles.profileButton}
            aria-haspopup="true"
            variant="text"
            disableElevation
            endIcon={<KeyboardArrowDownIcon />}
          >
            <img
              className={styles.profileImage}
              src="/src/assets/images/profile.svg"
              alt="Profile Icon"
              width={38}
              height={38}
            
            />
            Vinay Parab
          </Button>
          <div className={styles.hamburgerIcon} onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default HeaderRecruiterPage;
