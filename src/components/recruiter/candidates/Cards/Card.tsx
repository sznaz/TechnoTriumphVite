import { Button } from "@mui/material";
import styles from "./Card.module.css";

interface Props {
  name: string;
  title: string;
  experience: string;
  location: string;
  skills: string[];
  onDownload: () => void;
}
const Card = ({
  name,
  title,
  experience,
  location,
  skills,
  onDownload,
}: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <div className={styles.header}>
          <div className={styles.nameContainer}>
            <div className={styles.avatar}>{name.charAt(0)}</div>
            <div className={styles.name}>{name}</div>
          </div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.details}>
          <div className={styles.flex}>
            <img src="/src/assets/images/briefcase.svg" alt="" />
            <p>{experience}</p>
          </div>
          <div className={styles.flex}>
            <img src="/src/assets/images/mapPin.svg" alt="" />
            <p>{location}</p>
          </div>
        </div>
      </div>
      <div className={styles.skills}>
        {skills.map((skill, index) => (
          <span key={index} className={styles.skill}>
            {skill}
          </span>
        ))}
      </div>
      <Button
        sx={{
          color: "#fff",
          backgroundColor: "#FB8C00",
          "&:hover": { backgroundColor: "#FB8C00" },
          borderRadius: "60px",
          width: "100%",
          fontWeight: "500",
          textTransform: "none",
          fontSize: "14px",
        }}
        onClick={onDownload}
      >
        Download Resume
      </Button>
    </div>
  );
};

export default Card;
