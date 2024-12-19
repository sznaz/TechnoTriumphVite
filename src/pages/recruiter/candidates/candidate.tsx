import Card from "../../../components/recruiter/candidates/Cards/Card";
import NavLists from "../../../components/recruiter/candidates/NavLists/navList";
import FooterRecruiterPage from "../../../components/recruiter/footer/Footer";
import HeaderPage from "../../../components/recruiter/header/Header";
import styles from "./candidate.module.css";
const candidates = [
    {
      name: "Vinay P.",
      title: "Senior Graphic Designer",
      experience: "8 Years Experience",
      location: "Bangalore",
      skills: ["UI Design", "Graphic Design", "Figma", "Adobe Illustrator", "Adobe Photoshop"],
    },
    {
      name: "Anita D.",
      title: "Web Developer",
      experience: "5 Years Experience",
      location: "Mumbai",
      skills: ["React", "Node.js", "CSS", "HTML", "JavaScript"],
    },
    {
      name: "Rahul K.",
      title: "Data Scientist",
      experience: "6 Years Experience",
      location: "Delhi",
      skills: ["Python", "Machine Learning", "Data Analysis", "R", "SQL"],
    },
    {
      name: "Priya R.",
      title: "UI/UX Designer",
      experience: "4 Years Experience",
      location: "Pune",
      skills: ["Figma", "Sketch", "Wireframes", "Prototyping", "User Research"],
    },
    {
      name: "Amit S.",
      title: "Mobile App Developer",
      experience: "7 Years Experience",
      location: "Hyderabad",
      skills: ["Flutter", "React Native", "Swift", "Kotlin", "Android Studio"],
    },
  ];
const CandidatePage = () => {
    const handleDownload = () => {
        
      };
  return (
    <>
      <div>
        <HeaderPage />
        <div className={styles.container}>
          <div className={styles.breadcrumb}>Home / Candidates</div>
          <div className={styles.txtTitle}>Candidates</div>
          <NavLists />

          <div className={styles.cardContainer}>
          {candidates.map((candidate, index) => (
        <Card
          key={index}
          name={candidate.name}
          title={candidate.title}
          experience={candidate.experience}
          location={candidate.location}
          skills={candidate.skills}
          onDownload={handleDownload}
        />
      ))}
          </div>
        </div>
        <FooterRecruiterPage />
      </div>
    </>
  );
};

export default CandidatePage;
