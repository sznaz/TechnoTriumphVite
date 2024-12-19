import HeaderPage from '../../../components/recruiter/header/Header';
import FooterPage from '../../../components/recruiter/footer/Footer';
import styles from './Home.module.css';

import { Link } from 'react-router-dom';

const HomeRecruiterPage = () => {
 
  interface CardData {
    title: string;
    imageSrc: string;
    backgroundImg: string;
    path: string;
  }
  
  const cardData : CardData[] = [
    {
      title: 'Post your first job',
      imageSrc: '/src/assets/images/job.svg',
      backgroundImg: '/src/assets/images/jbg.svg',
      path: '/recruiter/job/new-job/overview'
    },
    {
      title: 'Add team members',
      imageSrc: '/src/assets/images/team.svg',
      backgroundImg: '/src/assets/images/tbg.svg',
      path: '/recruiter/invite/addMembers'
    },
    {
      title: 'Complete your profile',
      imageSrc: '/src/assets/images/pro.svg',
      backgroundImg: '/src/assets/images/pbg.svg',
       path: '/recruiter/home/profile'
    },
    {
      title: 'Explore FAQ',
      imageSrc: '/src/assets/images/job.svg', 
      backgroundImg: '/src/assets/images/fbg.svg',
       path: '/recruiter/home/frequentlyAskedQuestions'
    }
  ];


 
 

  return (
    <>
      <div className={styles.bodyWrapper}>
        <HeaderPage />
        <div className={styles.containerWrapper}>
          <div className={styles.welcome}>Welcome aboard <span className={styles.proTitle}>Vinay Parab</span></div>
          <div className={styles.subTitle}>Glad to see you onboard</div>
          <div className={styles.mainWrapper}>
            <div className={styles.txtTitle}>Here are some quick things you can do</div>
            <div className={styles.containerW}>
              <ul className={styles.ulstyle}>
             
                  {cardData.map((card, index) => (
                  <li key={index} className={styles.bg1} style={{ backgroundImage: `url(${card.backgroundImg})` }}  >
                      {card.path ? (
                      <Link to={card.path} className={styles.linkStyle}>
                      <div>
                      <img
                        className={styles.innerImage}
                        src={card.imageSrc}
                        alt={card.title}
                        width={60}
                        height={60}
                       
                      />
                    </div>
                    <div className={styles.title}>
                      {card.title}
                    </div>
                    </Link>
                    ) : (
                      <div>
                      <div>
                        <img
                          className={styles.innerImage}
                          src={card.imageSrc}
                          alt={card.title}
                          width={60}
                          height={60}
                         
                        />
                      </div>
                      <div className={styles.title}>
                        {card.title}
                      </div>
                    </div>
                  )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    </>
  );
};

export default HomeRecruiterPage;