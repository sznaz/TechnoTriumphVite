import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/auth/candidate/Login/Login';
import OnboardingPage from './pages/auth/candidate/onboarding/Onboarding';
import OTPPage from './pages/auth/candidate/Otp/OtpPage';
import PasswordForm from './pages/auth/candidate/Password/SetPassword';
import OnboardingRecruiterPage from './pages/auth/recruiter/onboarding/Onboarding';
import LoginRecruiterPage from './pages/auth/recruiter/Login/Login';
import OTPRecruiterPage from './pages/auth/recruiter/Otp/OtpPage';
import PasswordRecruiterForm from './pages/auth/recruiter/Password/SetPassword';
import WelcomeCandidatePage from './pages/candidate/welcome/Welcome';
import WelcomeRecruiterPage from './pages/recruiter/welcome/Welcome';
import HomeRecruiterPage from './pages/recruiter/home/Home';
import HomeCandidatePage from './pages/candidate/home/Home';
import Jobs from './pages/recruiter/job/all-jobs/AllJobs';
import NewJobPage from './pages/recruiter/job/new-job/NewJob';
import Overview from './components/recruiter/overview/Overview';
import ScreeningCriteria from './components/recruiter/screeningCriteria/ScreeningCriteria';
import AddTeamMembers from './pages/recruiter/addMembers/AddTeamMembers';
import ProfilePage from './pages/recruiter/completeProfile/CompleteProfile';
import FrequentlyAskedQuestionsPage from './pages/recruiter/frequentQuestions/FrequentlyAskedQuestions';
import ScreeningQuestionsPage from './pages/recruiter/screeningQuestions/ScreeningQuestions';
import JobDetailsPage from './pages/recruiter/job/job-details/jobDetails';


const AppRoutes: React.FC = () => {
    return (
      <Routes>
       <Route path="/" element={<Navigate to="/auth/recruiter/login" />} />
        <Route path="/auth/candidate/login" element={<LoginPage />} />
        <Route path='/auth/candidate/onboarding' element={<OnboardingPage/>}/>
        <Route path='/auth/candidate/onboarding/otp' element={<OTPPage/>}/>
        <Route path='/auth/candidate/setpassword' element={<PasswordForm/>}/>
        <Route path='/auth/recruiter/onboarding' element={<OnboardingRecruiterPage/>}/>
        <Route path='/auth/recruiter/login' element={<LoginRecruiterPage/>}/>
        <Route path='/auth/recruiter/onboarding/otp' element={<OTPRecruiterPage/>}/>
        <Route path='/auth/recruiter/setpassword' element={<PasswordRecruiterForm/>}/>
        <Route path='/candidate/welcome' element={<WelcomeCandidatePage/>}/>
        <Route path='/recruiter/welcome' element={<WelcomeRecruiterPage/>}/>
        <Route path='/recruiter/welcome/start' element={<HomeRecruiterPage/>}/>
        <Route path='/candidate/welcome/start' element={<HomeCandidatePage/>}/>
        <Route path='/recruiter/job/all-jobs' element={<Jobs/>}/>
        <Route path='/recruiter/job/new-job' element={<NewJobPage/>}/>
        <Route path='/recruiter/home/frequentlyAskedQuestions' element={<FrequentlyAskedQuestionsPage/>}/>
        <Route path='/recruiter/invite/addMembers' element={<AddTeamMembers/>}/>
        <Route path='/recruiter/home/profile' element={<ProfilePage/>}/>
        <Route path='/recruiter/job/screeningQuestions' element={<ScreeningQuestionsPage/>}/>
        <Route path='/recruiter/job/job-details' element={<JobDetailsPage/>}/>
       
        <Route path="/recruiter/job/new-job" element={<NewJobPage />}>
        <Route path="overview" element={<Overview />} />
        <Route path="screening" element={<ScreeningCriteria />} />
        
      </Route>
      </Routes>
    );
  };
  
  export default AppRoutes;