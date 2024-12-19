

import  { useEffect, useState } from "react";
import styles from './AddTeamMembers.module.css'
import HeaderPage from "../../../components/recruiter/header/Header";
import FooterPage from "../../../components/recruiter/footer/Footer";
import { InviteService } from "./service/inviteService";
import { useAppSelector } from "../../../redux/hooks";

type FormEntry = {
    name: string;
    email: string;
  };


const AddTeamMembers = () => {

  const [tenantId, setTenantId] = useState<string | null>(null);
  const role = useAppSelector(state => state.auth.role);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [formErrors, setFormErrors] = useState<{ [index: number]: string }>({});
  const [formEntries, setFormEntries] = useState<FormEntry[]>([]); 

  useEffect(() => {
    const storedTenantId = localStorage.getItem('tenant');
    setTenantId(storedTenantId);
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await InviteService.instance.getInviteByTenant(tenantId);
        console.log("Fetched invites by tenant:", response);
        
        if (response.status === 200) {
          setTeamMembers(response.data.data); 
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    }
    if(tenantId){
      fetchData();
    }
  }, [tenantId]); 

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

  const handleSendInvite = async (index: number) => {
    const formData = formEntries[index];
    if (!validateForm(formData)) {
      const errors = { ...formErrors };
      errors[index] = "Please enter a valid name and email.";
      setFormErrors(errors);
      return;
    }
    try {
      const errors = { ...formErrors };
      delete errors[index];
      setFormErrors(errors);
  
      const payload = { name: formData.name, email: formData.email, tenant: tenantId, role };
      const response = await InviteService.instance.sendInvite(payload);
      if (response.status === 200) {
        alert(`Invite sent successfully to ${formData.name} (${formData.email})!`);

        const newMember = { name: formData.name, email: formData.email, status: "Pending" };
        setTeamMembers(prevMembers => [...prevMembers, newMember]);

        const updatedForms = [...formEntries];
        updatedForms[index] = { name: "", email: "" };
        setFormEntries(updatedForms);
      }
    } catch (error) {
      console.error("Failed to send invite:", error);
      alert("Failed to send invite. Please try again.");
    }
  };
  
  const handleAddMore = async() => {
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
                    <div className={`${styles.status} ${member.status === "Active" ? styles.accepted : styles.pending}`}>
                      {member.status === "Active" && (
                        <div className={styles.iconCircle}>
                          <span className={styles.icon}>✔</span>
                        </div>
                      )}
                      <span>{member.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
              ))}
            </div>
            <button className={styles.addButton} onClick={handleAddMore}>
              Add More
            </button>
          </div>
        </div>
        <FooterPage/>
        </div>
  </>
  );
};

export default AddTeamMembers;
