
import FooterPage from '../../../components/candidate/footer/Footer';
import styles from './Home.module.css';

import { Link } from 'react-router-dom';
import HeaderPage from '../../../components/candidate/header/Header';
import { useNavigate } from 'react-router-dom';

const HomeCandidatePage = () => {
    const navigate = useNavigate();
  interface CardData {
    title: string;
    imageSrc: string;
    backgroundImg: string;
    path: string;
  }
  
  const cardData : CardData[] = [

    {
      title: 'Complete your profile',
      imageSrc: '/src/assets/images/cProfile.svg',
      backgroundImg: '/src/assets/images/pbg.svg',
       path: '/home/profile'
    },
    {
      title: 'Explore FAQ',
      imageSrc: '/src/assets/images/cExplore.svg', 
      backgroundImg: '/src/assets/images/fbg.svg',
       path: '/home/frequentlyAskedQuestions'
    }
  ];

  const isClicked = () => { 
    if(cardData[0].title === 'Complete your profile') {
        navigate('/candidate/job/profile') 
    }
};
  
 
 

  return (
    <>
      <div className={styles.bodyWrapper}>
        <HeaderPage />
        <div className={styles.containerWrapper}>
          <div className={styles.welcome}>Welcome aboard <span className={styles.proTitle}>Ranga Tiperneni</span></div>
          <div className={styles.subTitle}>Complete your profile to receive <span style={{color: '#173893'}}>personalized job listings</span> tailored to your skills and experience. You’ll also get an <span style={{color: '#173893'}}>ATS-friendly resume</span> in your preferred template, which you can easily switch and download for your convenience.</div>
          <div className={styles.mainWrapper}>
            {/* <div className={styles.txtTitle}>Here are some quick things you can do</div> */}
            <div className={styles.containerW}>
              <ul className={styles.ulstyle}>
             
                  {cardData.map((card, index) => (
                  <li key={index} className={styles.bg1} style={{ backgroundImage: `url(${card.backgroundImg})` }}  onClick={isClicked}>
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
            <div className={styles.txtTitle1}>At Technotriumph, our dashboard empowers you to take charge of your job search.</div> 
            <img
              className={styles.que}
              src='/src/assets/images/que.svg'
              alt='que'
              width={30}
              height={30}
             
            />
          </div>
        </div>
        <FooterPage />
      </div>
    </>
  );
};

export default HomeCandidatePage;