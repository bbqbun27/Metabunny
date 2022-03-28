import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import disc from '../../../../assets/img/sections/landing/header/disc.png';
import ig from '../../../../assets/img/sections/landing/header/ig.png';
import opensea from '../../../../assets/img/sections/landing/header/opensea.png';
import tele from '../../../../assets/img/sections/landing/header/tele.png';
import twit from '../../../../assets/img/sections/landing/header/twit.png';
import { useWeb3Context } from '../../../../context/WalletConnect';
import Button from '../../../atoms/Button';

import s from './styles.module.scss';

type Props = {
  className?: string;
  connectWallet: () => void;
  toggleMenu: () => void;
};

const MobileMenu: FC<Props> = ({ className, connectWallet, toggleMenu }) => {
  const { user } = useWeb3Context();
  const { t } = useTranslation();

  const handleScroll = (link: string) => {
    toggleMenu();
    const element = document.getElementById(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={cx(s.container, className)}>
      <div className={s.nav}>
        <div
          onClick={() => handleScroll('project')}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          className={s.link}
        >
          {t('navigation.project')}
        </div>
        <div
          onClick={() => handleScroll('project')}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          className={s.link}
        >
          {t('navigation.intro')}
        </div>
        <div
          onClick={() => handleScroll('Benefits')}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          className={s.link}
        >
          {t('navigation.benefits')}
        </div>
        <div
          onClick={() => handleScroll('roadmap')}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          className={s.link}
        >
          {t('navigation.roadmap')}
        </div>
        <div
          onClick={() => handleScroll('team')}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          className={s.link}
        >
          {t('navigation.team')}
        </div>
        <div className={s.link}>
        <a href={t('navigation.gamefiUrl')} rel="noreferrer">{t('navigation.gamefi')}</a>
        </div>
        <div className={s.link}>
        <a href={t('navigation.bunnyverseUrl')} rel="noreferrer">{t('navigation.bunnyverse')}</a>
        </div>
        <div className={s.link}>
        <a href={t('navigation.stakingUrl')} rel="noreferrer">{t('navigation.staking')}</a>
        </div>
        <div
          onClick={() => handleScroll('Faq')}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          className={s.link}
        >
          {t('navigation.faq')}
        </div>
        <a
          href="https://opensea.io/collection/metabunnyio"
          target="_blank"
          rel="noreferrer"
          className={s.link}
        >
          Opensea
        </a>
      </div>
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
      <a href={t('guide.Url')} rel="noreferrer" target="_blank" className={s.link}>
        {t('guide.title')}
      </a>
      <a href="https://support.opensea.io/hc/en-us/articles/360063498333-How-do-I-sell-an-NFT-" target="_blank" rel="noreferrer" className={s.link}>{t('navigation.resell')}</a>
      <div className={s.footer}>
        <Button
          title={
            user.address
              ? `${user.address.slice(0, 7)}...${user.address.slice(-1)}`
              : t('button.connect')
          }
          className={s.button}
          onClick={connectWallet}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
