

import  { useState } from "react";
import styles from './AddTeamMembers.module.css'
import HeaderPage from "../../../components/recruiter/header/Header";
import FooterPage from "../../../components/recruiter/footer/Footer";

type FormEntry = {
    name: string;
    email: string;
  };
const initialTeamMembers = [
  {
    name: "Rahul Rajan",
    email: "Rahuraj@lepolabs.com",
    status: "Pending",
  },
  {
    name: "Victor John",
    email: "victor.john@lepolabs.com",
    status: "Accepted",
  },
];

const AddTeamMembers = () => {
  const [teamMembers] = useState(initialTeamMembers);
 
  const [formEntries, setFormEntries] = useState<FormEntry[]>([]); 

  const handleFormChange = (index: number, field: "name" | "email", value: string) => {
    const updatedForms = [...formEntries];
    updatedForms[index][field] = value;
    setFormEntries(updatedForms);
  };


  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateForm = (formData: { name: string; email: string }) => {
    return formData.name !== "" && validateEmail(formData.email);
  };

  const handleSendInvite = (index: number) => {
    const formData = formEntries[index];
    if (validateForm(formData)) {
      alert(`Invite sent to ${formData.name} at ${formData.email}`);
      const updatedForms = [...formEntries];
      updatedForms[index] = { name: "", email: "" };  
      setFormEntries(updatedForms);
    } else {
      alert("Please enter a valid name and email.");
    }
  };

  const handleAddMore = () => {
    setFormEntries([...formEntries, { name: "", email: "" }]); 
  };
  const handleRemoveForm = (index: number) => {
    const updatedForms = formEntries.filter((_, i) => i !== index); 
    setFormEntries(updatedForms);
  };

  return (
  <>
  <div>
  <HeaderPage/>
  
        <div className={styles.container}>
          <div className={styles.mainHeading}>Add Team Members</div>
         <div className={styles.innercontainer}>
            <div className={styles.membersList}>
           
              {teamMembers.map((member, index) => (
                  <div key={index} className={styles.memberRow}>
               
                  <div className={styles.memberCard}>
                    <span className={styles.label}>Name</span>
                    <span>{member.name}</span>
                  </div>
                 
                  <div className={styles.memberCard}>
                    <span className={styles.label}>Email ID</span>
                    <span>{member.email}</span>
                  </div>
                
                  <div className={styles.memberCard}>
    <span className={styles.label}>Status</span>
    <div className={`${styles.status} ${member.status === "Accepted" ? styles.accepted : styles.pending}`}>
      {member.status === "Accepted" && (
        <div className={styles.iconCircle}>
          <span className={styles.icon}>✔</span>
        </div>
      )}
      <span>{member.status}</span>
    </div>
  </div>
                </div>
              ))}
      
          
      <div className={styles.formsContainer}>
              {formEntries.map((formEntry, index) => (
                <div key={index} className={styles.memberRow}>
                  <div className={styles.info}>
                    <span className={styles.label}>Enter Name</span>
                    <input
                      type="text"
                      value={formEntry.name}
                      onChange={(e) => handleFormChange(index, "name", e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.label}>Enter Email ID</span>
                    <input
                      type="email"
                      value={formEntry.email}
                      onChange={(e) => handleFormChange(index, "email", e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.last}>
                  <div className={styles.info}>
                    <button
                      className={styles.sendInviteButton}
                      onClick={() => handleSendInvite(index)}
                    >
                      Send Invite
                    </button>
                  </div>
                  <div className={styles.removeForm} onClick={() => handleRemoveForm(index)}>
                 
                    <img
                      src="/src/assets/images/trash.svg"
                      alt="trash"
                      width={16}
                      height={16}
                   
                    />
                  </div>
                  </div>
                
                </div>
                
              ))}
              
            </div>
            </div>
      
         
           
              <button className={styles.addButton} onClick={handleAddMore}>
                Add More
              </button>
         </div>
        <div className={styles.questionImg}>
           <img
                        src="/src/assets/images/question.svg"
                        alt="trash"
                        width={32}
                        height={32}
                       
                      />
        </div>
        </div>
        <FooterPage/>
        </div>
  </>
  );
};

export default AddTeamMembers;
