import { useTranslation } from 'react-i18next';

import bunny from '../../../../../assets/img/sections/landing/body/bunny2.png';
import disc from '../../../../../assets/img/sections/landing/header/disc.png';
import ig from '../../../../../assets/img/sections/landing/header/ig.png';
import tele from '../../../../../assets/img/sections/landing/header/tele.png';
import twit from '../../../../../assets/img/sections/landing/header/twit.png';
import opensea from '../../../../../assets/img/sections/landing/header/opensea.png';
import s from './Community.module.scss';

const Community: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className={s.section}>
      <div className={s.content}>
        <div className={s.title}>{t('community.title')}</div>
        <div className={s.box}>
          <div className={s.left}>
            <img src={bunny} alt="bunny" className={s.image} />
          </div>
          <div className={s.right}>
            <div className={s.text}>
              {t('community.text')}
              <div className={s.socials}>
              <a
                href="https://opensea.io/collection/metabunnyio"
                className={s.socialLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={opensea} alt="opensea" className={s.logoSoc} />
              </a>
                <a
                  href="https://discord.com/invite/metabunnynft"
                  className={s.socialLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src={disc} alt="disc" className={s.logoSoc} />
                </a>
                <a
                  href="https://www.instagram.com/metabunny.nft/"
                  className={s.socialLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src={ig} alt="disc" className={s.logoSoc} />
                </a>

                <a
                  href="https://twitter.com/metabunnynft"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={s.socialLink}
                >
                  <img src={twit} alt="twit" className={s.logoSoc} />
                </a>
                <a
                  href="https://t.me/hkd_com"
                  className={s.socialLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src={tele} alt="tele" className={s.logoSoc} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
