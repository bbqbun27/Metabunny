import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import cn from 'classnames';

import bunny0 from '../../../../../assets/img/sections/landing/body/bunny0.png';
import bunny from '../../../../../assets/img/sections/landing/body/bunny1.png';
import bunny1 from '../../../../../assets/img/sections/landing/body/bunny2.png';
import bunny2 from '../../../../../assets/img/sections/landing/body/bunny3.png';
import bunny3 from '../../../../../assets/img/sections/landing/body/bunny4.png';
import bunny4 from '../../../../../assets/img/sections/landing/body/bunny5.png';
import bunny5 from '../../../../../assets/img/sections/landing/body/bunny6.png';
import bunny6 from '../../../../../assets/img/sections/landing/body/bunny7.png';
import bunny7 from '../../../../../assets/img/sections/landing/body/bunny8.png';
import bunny8 from '../../../../../assets/img/sections/landing/body/bunny9.png';
import bunny9 from '../../../../../assets/img/sections/landing/body/bunny10.png';
import bunny10 from '../../../../../assets/img/sections/landing/body/bunny11.png';
import bunny11 from '../../../../../assets/img/sections/landing/body/bunny12.png';
import bunny12 from '../../../../../assets/img/sections/landing/body/bunny13.png';
import cap1 from '../../../../../assets/img/sections/landing/body/cap1.jpg';
import cap2 from '../../../../../assets/img/sections/landing/body/cap2.jpg';
import cap3 from '../../../../../assets/img/sections/landing/body/cap3.jpg';
import cap4 from '../../../../../assets/img/sections/landing/body/cap4.jpg';
import cap5 from '../../../../../assets/img/sections/landing/body/cap5.jpg';
import Button from '../../../../atoms/Button';
import SimpleSlider from '../../../../atoms/Carousel';

import s from './ScaryMeter.module.scss';

const settings = {
  arrows: true,
  dots: true,
  pauseOnHover: false,
  infinite: true,
  speed: 100,
  autoplay: true,
  fade: true,
  variableWidth: false,
  slidesToScroll: 4,
};

const ScaryMeter: React.FC = () => {
  const { t } = useTranslation();
  const levels = useMemo(
    () => [
      {
        key: 0,
        title: '',
        descr: '',
        subpic: '/static/media/cap5.6789b5bd.jpg',
      },
      {
        key: 1,
        title: t('intro.preview.bunnyverse'),
        descr: t('intro.preview.text1.1'),
        subpic: '/static/media/cap3.3ceec026.jpg',
      },
      {
        key: 2,
        title: t('intro.preview.gamefi'),
        descr: t('intro.preview.text2'),
        subpic: '/static/media/cap4.32614628.jpg',
      },
      {
        key: 3,
        title: t('intro.preview.staking'),
        descr: t('intro.preview.text3.1'),
        subpic: '/static/media/cap1.d7c6434a.jpg',
      },
      {
        key: 4,
        title: t('intro.preview.merchandise'),
        descr: t('intro.preview.text4'),
        subpic: '/static/media/cap2.c8c75e69.jpg',
      },
    ],
    [t],
  );
  const [activeLevel, setActiveLevel] = useState(levels[0]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slides, setSlides] = useState(5);
  console.log(slides);
  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 800) {
      setSlides(1);
    }
    if (windowWidth <= 700) {
      setSlides(1);
    }
    if (windowWidth <= 500) {
      setSlides(1);
    }
    // if (windowWidth <= 400) {
    //   setSlides(1)
    // }
  }, [windowWidth]);

  const handleLevel = (level: any) => {
    setActiveLevel(level);
  };

  return (
    <section className={s.section} id="project">
      <div className={s.content}>
        <div className={s.title}>{t('project')}</div>
        <div className={s.info}>
          <div className={s.text}>{t('intro.text')}</div>
        </div>

        <div className={s.title} id="benefits">
          {t('benefits.title')}
        </div>
        <div className={s.info}>
          <ol className={s.benefits}>
            <li>{t('benefits.01')}</li>
            <li>{t('benefits.02')} </li>
            <li>{t('benefits.03')}</li>
            <li>{t('benefits.04')}</li>
            <li>{t('benefits.05')}</li>
            <li>{t('benefits.06')}</li>
          </ol>
        </div>

        <div className={s.top}>
          <div className={s.left}>
            <div className={s.levels}>
              {levels.map((level: any) => (
                <Button
                  title={level.title}
                  className={cn(s.level, { [s.active]: level.key === activeLevel.key })}
                  onClick={() => handleLevel(level)}
                  insideShadow
                />
              ))}
            </div>
            <div className={s.description}>
              <div className={s.txt}>{activeLevel.descr}</div>
              <img src={activeLevel.subpic} alt="cap" />
            </div>
          </div>
          <img src={cap3} alt="" className={s.pic} />
          <img src={cap2} alt="" className={s.pic} />
          <img src={cap1} alt="" className={s.pic} />
          <img src={cap4} alt="" className={s.pic} />
          <img src={cap5} alt="" className={s.pic} />
        </div>
        <div className={s.title}>{t('preview')}</div>
        <div className={s.nftsMobile}>
          <SimpleSlider classNameProp={s.slide} slidesToShow={2} dots>
            <div className={s.nft}>
              <img src={bunny} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny0} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny1} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny2} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny3} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny4} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny5} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny6} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny7} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny8} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny9} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny10} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny11} alt="bunny" className={s.nftImage} />
            </div>
            <div className={s.nft}>
              <img src={bunny12} alt="bunny" className={s.nftImage} />
            </div>
          </SimpleSlider>
        </div>
      </div>
      <div className={s.nfts}>
        <SimpleSlider classNameProp={s.slide} slidesToShow={5} {...settings}>
          <div className={s.nft}>
            <img src={bunny} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny0} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny1} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny2} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny3} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny4} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny5} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny6} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny7} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny8} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny9} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny10} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny11} alt="bunny" className={s.nftImage} />
          </div>
          <div className={s.nft}>
            <img src={bunny12} alt="bunny" className={s.nftImage} />
          </div>
        </SimpleSlider>
      </div>

      <ReactPlayer
        className={s.videobg}
        width="100%"
        height="60%"
        url={[{ src: 'https://oninwar.com/raw/ward_animation_v2.mp4', type: 'video/mp4' }]}
        playsinline
        playing
        loop
        muted
        config={{
          file: {
            attributes: {
              preload: 'auto',
            },
          },
        }}
      />
    </section>
  );
};

export default ScaryMeter;
