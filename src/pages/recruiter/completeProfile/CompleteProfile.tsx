

import FooterPage from '../../../components/recruiter/footer/Footer';
import HeaderPage from '../../../components/recruiter/header/Header';
import React, { useState } from 'react';
import styles from './CompleteProfile.module.css';


interface FormData {
  companyName: string;
  panCardNo: string;
  companyIdNo: string | number;
  companyAddress1: string;
  companyAddress2: string;
  province: string;
  country: string;
  textNumber: string;
}

function ProfilePage() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    panCardNo: '',
    companyIdNo: '',
    companyAddress1: '',
    companyAddress2: '',
    province: '',
    country: '',
    textNumber: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    
    const panCardRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;
    if (!panCardRegex.test(formData.panCardNo)) {
      newErrors.panCardNo = 'Invalid PAN Card format';
    }

   
    if (!formData.companyIdNo || isNaN(Number(formData.companyIdNo))) {
      newErrors.companyIdNo = 'Company ID must be a valid number';
    }

   
    if (!formData.companyAddress1.trim()) {
      newErrors.companyAddress1 = 'Address Line 1 is required';
    }
    if (!formData.province.trim()) {
      newErrors.province = 'Province is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    
    if (!formData.textNumber.trim()) {
      newErrors.textNumber = 'Text number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setEditMode(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <>
      <HeaderPage />
      <div className={styles.container}>
        <div className={styles.mainHeading}>
          Complete Your Recruiter Profile
          {submitted && !editMode && (
            <button className={styles.editButton} onClick={handleEditClick}>
              <img src="/src/assets/images/edit.svg" alt="Edit" width={24} height={24} />
            </button>
          )}
        </div>
        <div className={styles.innerContainer}>
          {(!submitted || editMode) ? (
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name of the Company*</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                {errors.companyName && (
                  <span className={styles.errorText}>{errors.companyName}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>PAN Card No*</label>
                <input
                  type="text"
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                {errors.panCardNo && (
                  <span className={styles.errorText}>{errors.panCardNo}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Company Identification No.*</label>
                <input
                  type="text"
                  name="companyIdNo"
                  value={formData.companyIdNo}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                {errors.companyIdNo && (
                  <span className={styles.errorText}>{errors.companyIdNo}</span>
                )}
              </div>
              <h3 className={styles.sectionHeader}>Registered Address of the Company*</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>Company Address Line 1*</label>
                <input
                  type="text"
                  name="companyAddress1"
                  value={formData.companyAddress1}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                {errors.companyAddress1 && (
                  <span className={styles.errorText}>{errors.companyAddress1}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Company Address Line 2</label>
                <input
                  type="text"
                  name="companyAddress2"
                  value={formData.companyAddress2}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Province*</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                {errors.province && (
                  <span className={styles.errorText}>{errors.province}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Country*</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                {errors.country && (
                  <span className={styles.errorText}>{errors.country}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Text Number*</label>
                <input
                  type="text"
                  name="textNumber"
                  value={formData.textNumber}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                {errors.textNumber && (
                  <span className={styles.errorText}>{errors.textNumber}</span>
                )}
              </div>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          ) : (
            <div className={styles.dataDisplay}>
              <div className={styles.dataRow}>
                <div className={styles.dataBox}>
                  <div className={styles.dataLabel}>Name</div>
                  <div className={styles.dataValue}>{formData.companyName}</div>
                </div>
                <div className={styles.dataBox}>
                  <div className={styles.dataLabel}>PAN Card No</div>
                  <div className={styles.dataValue}>{formData.panCardNo}</div>
                </div>
                <div className={styles.dataBox}>
                  <div className={styles.dataLabel}>Company Identification No</div>
                  <div className={styles.dataValue}>{formData.companyIdNo}</div>
                </div>
              </div>
              <div className={styles.dataBoxWide}>
                <div className={styles.dataLabel}>Company Address</div>
                <div className={styles.dataValue}>
                  <p>
                    {formData.companyAddress1}, {formData.companyAddress2},{' '}
                    {formData.province}, {formData.country}
                  </p>
                </div>
              </div>
            </div>
          )}
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
      <FooterPage />
    </>
  );
}

export default ProfilePage;
