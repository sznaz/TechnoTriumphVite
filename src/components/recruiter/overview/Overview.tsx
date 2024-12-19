import React, { useEffect, useState , Suspense, lazy } from "react";
import { Button, Grid, InputLabel, Chip } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import styles from "./Overview.module.css";
import moment, { Moment } from "moment";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link, useNavigate } from 'react-router-dom';
import { JobService } from "../../../pages/recruiter/job/service/JobService";


moment.locale("en");
const ReactQuill = lazy(() => import('react-quill'));
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic"],
    [{ align: "" }, { align: "center" }, { align: "right" }],
    [{ indent: "-1" }, { indent: "+1" }],
  ],
};

interface Industry {
  _id: string;
  name: string;
  domains: Domain[];
}
interface Domain {
  _id: string;
  name: string;
}
const formats = ["header", "bold", "italic", "align", "indent"];

const NewJob = () => {
const navigate = useNavigate();  
  console.log("renderingg")
  const [jobDescription, setJobDescription] = React.useState("");

  // const tenant = useAppSelector((state) => state.auth.tenantId);

  const [industries, setIndustries] = useState<Industry[]>([]);
  const [commonDomains, setCommonDomains] = useState<Domain[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    industry: "",
    domain: "",
    employmentType: "",
    description: "",
    numPositions: "",
    locations: [] as string[],
    closingDate: null as Moment | null
  });
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
   let isCalled = false;

  useEffect(() => {
    if (isCalled) return;
    isCalled = true;
    async function fetchData() {
      try {
        const industryResponse = await JobService.instance.getIndustries();
        if (industryResponse?.data?.data) {
          console.log("res",industryResponse.data.data)
          setIndustries(industryResponse.data.data);
        } else {
          console.error("No data found in response", industryResponse);
        }
       const domainResponse = await JobService.instance.getCommonDomain();
       if (domainResponse?.data?.data) {
        setCommonDomains(domainResponse.data.data);
      }else {
        console.error("No data found in response", domainResponse);
      }
      } catch (error) {
        console.error("Failed to fetch industries:", error);
      }
    }

    fetchData();
  }, []);


  const handleIndustryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSelectedIndustry(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    const fileInput = document.getElementById(
      "job-description-upload"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleAddLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const trimmedValue = inputValue.trim();
      if (trimmedValue && !formData.locations.includes(trimmedValue)) {
        setFormData((prevData) => ({
          ...prevData,
          locations: [...prevData.locations, trimmedValue],
        }));
      }
      setInputValue("");
    }
  };

  const handleRemoveLocation = (location: string) => {
    setFormData((prevData) => ({
      ...prevData,
      locations: prevData.locations.filter((loc) => loc !== location),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setJobDescription(value);
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handlePublish = async () => {
    const { title, description, numPositions, locations,industry, domain, closingDate } =
      formData;

    console.log(closingDate?.valueOf(), formData);
    if (!title || !description || !numPositions || !locations || !closingDate) {
      setError("All fields are required.");
      return;
    }
    const tenantId = localStorage.getItem('tenant')
    try {
      const payload = {
        title,
        description,
        industry,
        domain,
        numPositions: Number(numPositions),
        locations,
        closingDate : closingDate.valueOf(),
        tenant: tenantId,
      };
      const response = await JobService.instance.createJob(payload);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data.data._id)
        sessionStorage.setItem('jobId', response.data.data._id)
        navigate("/recruiter/job/new-job/screening");
      } else {
        setError("Invalid credentials or server error.");
        console.log(error);
      }
    } catch (err) {
      setError("Failed to publish the job. Please try again.");
      console.error(err);
    }
  };

  const handleClickOpen = () => {
    const { title, description, numPositions, locations, closingDate } =
      formData;
    console.log(formData);
    if (!title || !description || !numPositions || !locations || !closingDate) {
      setError("All fields are required.");
      return;
    } else {
      handlePublish();
    }
    navigate("/recruiter/job/new-job/overview");
;
  };
  const handleDateChange = (newDate: Moment | null) => {
    console.log("Selected Date:", newDate);
  
    setFormData((prevData) => ({
      ...prevData,
      closingDate: newDate, 
    }));
  };
  // const [value, setValue] = React.useState<Moment | null>();

  const industryDomains = selectedIndustry
    ? industries.find((industry) => industry._id === selectedIndustry)?.domains
    : [];
  return (
    <>
      <div className={styles.containerWrapper}>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <div className={styles.headings}>
              Please specify the skills you are seeking in candidates.
            </div>
            <div className={styles.subheadings}>
              Please note, that all resumes submitted for this position will be
              evaluated based on these criteria.
            </div>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ marginTop: "20px" }}>Job Title</InputLabel>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  className={styles.customInput}
                />
                <InputLabel sx={{ marginTop: "20px" }}>
                  {" "}
                  Job Description
                </InputLabel>

                <div style={{ marginTop: "10px" }}>
                  <input
                    id="job-description-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    placeholder="upload document"
                  />
                  <button
                    onClick={handleBrowseClick}
                    className={styles.browseFile}
                    style={{}}
                  >
                    <span style={{ textDecoration: "underline" }}>Browse</span>
                  </button>
                  {file && (
                    <div style={{ marginTop: "10px", color: "#333" }}>
                      <strong>Selected File: </strong> {file.name}
                    </div>
                  )}
                  <div className={styles.orText}>OR</div>
                </div>
                <InputLabel sx={{ marginTop: "20px" }}>
                  Job Description
                </InputLabel>
                <div className={styles.textEditorui}>
                  <ul className={styles.ulStyle1}>
                    <li className={styles.ulLiStyle1}>File</li>
                    <li className={styles.ulLiStyle1}>Edit</li>
                    <li className={styles.ulLiStyle1}>View</li>
                    <li className={styles.ulLiStyle1}>Format</li>
                    <li className={styles.ulLiStyle1}>Tools</li>
                  </ul>
        <Suspense fallback={<div>Loading Editor...</div>}>
        <ReactQuill
          theme="snow"
          value={jobDescription}
          onChange={handleDescriptionChange}
          modules={modules}
          formats={formats}
          style={{
            height: "150px",
            marginBottom: "20px",
            border: "1px solid #FFE2C8",
          }}
        />
      </Suspense>
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ marginTop: "10px" }}>Industry</InputLabel>
                <select
                  className={styles.inputQuestion}
                  required
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleIndustryChange}
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  {industries.map((industry) => (
                    <option key={industry._id} value={industry._id}>
                      {industry.name}
                    </option>
                  ))}
                </select>

                <InputLabel sx={{ marginTop: "10px" }}>Domain</InputLabel>
                <select
                  className={styles.inputQuestion}
                  required
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  {commonDomains.map((domain) => (
                    <option key={domain._id} value={domain._id}>
                      {domain.name}
                    </option>
                  ))}
                  {selectedIndustry &&
                    (industryDomains?.map((domain) => (
                      <option key={domain._id} value={domain._id}>
                        {domain.name}
                      </option>
                    )) ||
                      [])}{" "}
                  {}
                </select>

                <InputLabel sx={{ marginTop: "10px" }}>
                  Employment Type
                </InputLabel>
                <select
                  className={styles.inputQuestion}
                  required
                  value={formData.employmentType}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      employmentType: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled hidden>
                    Select Employment Type
                  </option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
                <InputLabel sx={{ marginTop: "10px" }}>
                  No of Positions
                </InputLabel>
                <input
                  type="number"
                  name="numPositions"
                  value={formData.numPositions}
                  onChange={handleInputChange}
                  placeholder="Enter"
                  className={styles.customInput}
                />
                <InputLabel sx={{ marginTop: "10px" }}>Locations </InputLabel>
                <div className={styles.location}>
                  <div className={styles.tagsContainer}>
                    {formData.locations.map((location, index) => (
                      <Chip
                        key={index}
                        label={location}
                        onDelete={() => handleRemoveLocation(location)}
                        className={styles.tag}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleAddLocation}
                    placeholder="Location"
                    style={{ border: "none", outline: "none" }}
                  />
                </div>

                <InputLabel sx={{ marginTop: "10px" }}>
                  Position Open Till
                </InputLabel>
                {/* <input
  type="text"
  name="closingDate"
  value={formData.closingDate}
  onChange={handleInputChange}
  onFocus={(e) => (e.target.type = 'date')} 
  onBlur={(e) => {
    if (!e.target.value) e.target.type = 'text'; 
  }}
  placeholder="Select a date" 
  className={styles.customInput}
/> */}
                <div className={styles.checkStyle}>
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale="en"
                  >
                    <Stack spacing={2} style={{ height: "40px" }}>
                      <DatePicker value={formData.closingDate || null} onChange={(newDate) => handleDateChange(newDate)} />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </Grid>
            </Grid>
            <div style={{ marginTop: "25px" }}>
              {error && (
                <div style={{ color: "red", marginBottom: "15px" }}>
                  {error}
                </div>
              )}
              <Grid item xs={12} md={6} className={styles.alignRight}>
                <Link
                   to="/recruiter/job/new-job/overview"
                  className={styles.screen1}
                  style={{ marginLeft: "15px" }}
                >
                  Back
                </Link>

                <Button
                  className={styles.screen2}
                  style={{ marginLeft: "15px" }}
                  onClick={handleClickOpen}
                >
                  Next
                </Button>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewJob;
