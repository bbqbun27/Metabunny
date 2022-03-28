import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactPlayer from 'react-player';
import cn from 'classnames';
import moment from 'moment';

import { ReactComponent as IconArrow } from '../../../assets/img/icons/arrowBottom.svg';
import cap1 from '../../../assets/img/sections/landing/body/cap1.jpg';
import cap3 from '../../../assets/img/sections/landing/body/cap3.jpg';
import cap4 from '../../../assets/img/sections/landing/body/cap4.jpg';
import guide01 from '../../../assets/img/sections/landing/body/guide_01.jpg';
import guide02 from '../../../assets/img/sections/landing/body/guide_02.jpg';
import guide03 from '../../../assets/img/sections/landing/body/guide_03.jpg';
import banner from '../../../assets/img/sections/landing/header/banner.png';
import disc from '../../../assets/img/sections/landing/header/disc.png';
import ig from '../../../assets/img/sections/landing/header/ig.png';
import logo from '../../../assets/img/sections/landing/header/logo.png';
import opensea from '../../../assets/img/sections/landing/header/opensea.png';
import overview from '../../../assets/img/sections/landing/header/overview.png';
import tele from '../../../assets/img/sections/landing/header/tele.png';
import twit from '../../../assets/img/sections/landing/header/twit.png';
import { is_production } from '../../../config/index';
import { useModals } from '../../../context/Modal';
import { useWeb3Context } from '../../../context/WalletConnect';
import { notify } from '../../../utils/notify';
import Burger from '../../atoms/Burger';
import Button from '../../atoms/Button';
import MintModal from '../../molecules/Modals/MintModal';
import WalletModal from '../../molecules/Modals/WalletModal';

import MobileMenu from './MobileMenu';

import s from './Header.module.scss';

const languages = ['English', 'Русский', '中文', 'Thai'];

function timeToDate(date: string) {
  let secondsToDate = Math.round((+new Date(date) - +new Date(Date.now())) / 1000);

  if (secondsToDate < 0) return { days: 0, hours: 0, mins: 0, sec: 0 };

  const days = Math.floor(secondsToDate / 3600 / 24);
  secondsToDate -= days * 24 * 3600;

  const hours = Math.floor(secondsToDate / 3600);
  secondsToDate -= hours * 3600;

  const mins = Math.floor((secondsToDate / 3600) * 60);
  secondsToDate -= mins * 60;

  const sec = secondsToDate;

  return { days, hours, mins, sec };
}

const PRESALE_DATE_END = '2021-09-19T21:00:00';
// const TIME_FOR_UPDATE = 20000;
const Header: React.FC = () => {
  const { init, user } = useWeb3Context();
  const { setModal } = useModals();
  const { i18n, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);
  const [language, setLanguage] = useState(
    localStorage.metabunny_lang && localStorage.metabunny_lang === 'ru'
      ? languages[1]
      : languages[0],
  );

  const [timeBeforeEnd, setTimeBeforeEnd] = useState(timeToDate(PRESALE_DATE_END));

  const mintNft = async (wallet: 'MetaMask' | 'WalletConnect') => {
    if (!Object.values(timeBeforeEnd).every((el) => el === 0) && is_production) {
      notify("The presale hasn't started yet", 'error');
      return;
    }
    const info = await init(wallet);

    if (!info) {
      notify('No Web3 Provider! Please install or download MetaMask', 'error');
      return;
    }

    if (info.code === 3) {
      notify(`${info.message.message} Connect your wallet!`, 'error');
      return;
    }

    if ([404, 4].includes(info.code)) {
      notify(info.message.text, 'error');
      // return;
    }
  };

  const handleChangeLang = (lang: string) => {
    setLanguage(lang);
    if (lang === 'English') {
      i18n.changeLanguage('en');
      localStorage.metabunny_lang = 'en';
      moment.locale('en');
    } else if (lang === '中文') {
      i18n.changeLanguage('chi');
      localStorage.metabunny_lang = 'chi';
      moment.locale('chi');
    } else if (lang === 'Thai') {
      i18n.changeLanguage('thai');
      localStorage.metabunny_lang = 'thai';
      moment.locale('thai');
    } else {
      i18n.changeLanguage('ru');
      localStorage.metabunny_lang = 'ru';
      moment.locale('ru');
    }
  };

  const Translate: React.FC<any> = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <OutsideClickHandler onOutsideClick={() => setIsVisible(false)}>
        <div className={cn({ [s.active]: isVisible }, s.translate)} id="translate">
          <div
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
            className={cn(s.head)}
            onClick={() => setIsVisible(!isVisible)}
          >
            <div className={cn(s.selection)}>{language}</div>
            <div className={cn(s.arrow)}>
              <IconArrow className={s.arrowIcon} />
            </div>
          </div>
          <div className={cn(s.body)}>
            {languages.map((x: any) => (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cn(s.option, {
                  [s.selectioned]: x === language,
                })}
                onClick={() => handleChangeLang(x)}
                key={nextId()}
              >
                <span className={s.text}>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </OutsideClickHandler>
    );
  };

  useEffect(() => {
    if (localStorage.metabunny_lang) {
      i18n.changeLanguage(localStorage.metabunny_lang);
      moment.locale(localStorage.metabunny_lang);
    }
  }, [i18n]);

  useEffect(() => {
    const timerId = setInterval(() => {
      const time = timeToDate(PRESALE_DATE_END);
      setTimeBeforeEnd(time);
      if (Object.values(time).every((el) => el === 0)) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (localStorage.metabunny_provider) {
      init(localStorage.metabunny_provider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <header className={s.header}>
        <div className={s.header_inner}>
          <div className={s.logo}>
            <Burger className={s.burger} onClick={toggleMenu} isMenuOpen={isMenuOpen} />
            <a href="/">
              <img src={logo} alt="logo" className={s.logoImg} />
            </a>
            <nav>
              <ul className={s.navigation}>
                <li>
                  <a href="#project">{t('navigation.project')}</a>
                  <ul>
                  <li>
                      <a href="#project">{t('navigation.intro')}</a>
                    </li>
                    <li>
                      <a href="#benefits">{t('navigation.benefits')}</a>
                    </li>
                    <li>
                      <a href="#roadmap">{t('navigation.roadmap')}</a>
                    </li>
                    <li>
                      <a href="#team">{t('navigation.team')}</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href={t('navigation.gamefiUrl')} rel="noreferrer">{t('navigation.gamefi')}</a>
                </li>
                <li>
                <a href={t('navigation.bunnyverseUrl')} rel="noreferrer">{t('navigation.bunnyverse')}</a>
                </li>
                <li>
                <a href={t('navigation.stakingUrl')} rel="noreferrer">{t('navigation.staking')}</a>
                </li>
                <li>
                  <a href="#faq">{t('navigation.faq')}</a>
                  <ul>
                    <li>
                    <a href={t('guide.Url')} rel="noreferrer" target="_blank">{t('guide.how')}</a>
                    </li>
                    <li>
                      <a href="https://support.opensea.io/hc/en-us/articles/360063498333-How-do-I-sell-an-NFT-" target="_blank" rel="noreferrer">{t('navigation.resell')}</a>
                    </li>
                    <li>
                      <a href="#faq">{t('navigation.otherfaq')}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          <div className={s.right}>
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
                <img src={ig} alt="ig" className={s.logoSoc} />
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
            <Translate />
            <Button
              title={
                user.address
                  ? `${user.address.slice(0, 7)}...${user.address.slice(-1)}`
                  : t('button.connect')
              }
              className={s.button}
              onClick={() => setModal('wallet')}
            />
          </div>
        </div>
        <a href="#top" rel="noreferrer">
          <button type="submit" className={s.btntop}>
            {t('navigation.top')}
          </button>
        </a>
        <WalletModal mintNft={mintNft} />
        {isMenuOpen && (
          <MobileMenu
            toggleMenu={toggleMenu}
            connectWallet={() => setModal('wallet')}
            className={cn(s.mobileMenu, { [s.mobileMenuOpen]: isMenuOpen })}
          />
        )}
      </header>

      <div className={s.bannerWrapper}>
        <ReactPlayer
          className={s.video}
          width="100%"
          url={[
            { src: 'https://oninwar.com/raw/bunny.mp4', type: 'video/mp4' },
            { src: 'https://oninwar.com/raw/bunny.webm', type: 'video/webm' },
          ]}
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

        <img src={banner} alt="banner" className={s.banner} />
        <img src={overview} alt="overview" className={s.overview} />
        <div className={s.bcontent}>
          <Button
            title={t('button.mint')}
            className={s.bannerButton}
            onClick={() => setModal(user.address ? 'txHash' : 'wallet')}
          />
          <a href={t('navigation.litepaperurl')} target="_blank" rel="noreferrer">
            <Button title={t('navigation.litepaper')} className={s.bannerButton2} />
          </a>
        </div>
        <div className={s.foot}> </div>
      </div>

      <div id="howToMint" className={s.popupcontainer}>
        <div className={s.popupcontent}>
          <a href="#banner" className={s.close}>
            &times;
          </a>
          <div className={s.txt}>
            <h2>{t('guide.title')}</h2>
            <h3>{t('guide.step1')}</h3>
            <br />
            <br />
            {t('guide.step1texta')}{' '}
            <a href="https://www.metabunny.io" target="_blank" rel="noreferrer">
              https://www.metabunny.io
            </a>
            <br />
            {t('guide.step1textb')}{' '}
            <a href="https://youtu.be/G9jwLbmGziw" target="_blank" rel="noreferrer">
              https://youtu.be/G9jwLbmGziw
            </a>
            )
            <img src={guide01} alt="" />
            {t('guide.step1textc')}
            <h2>{t('guide.step2')}</h2>
            <h3>{t('guide.step2texta')}</h3>
            <img src={guide02} alt="" />
            <h2>{t('guide.step3')}</h2>
            <h3>{t('guide.step3texta')}</h3>
            <img src={guide03} alt="" />
            <h3>{t('guide.step4')}</h3>
          </div>
        </div>
      </div>

      <div id="Gamefi" className={s.popupcontainer}>
        <div className={s.popupcontent}>
          <a href="#banner" className={s.close}>
            &times;
          </a>
          <img src={cap4} alt="" />
          <div className={s.txt}>
            <h2>MetaBunny遊戲介紹</h2>
            <h3>MetaBunny GameFi是在以太坊區塊鏈上構建的，遊戲內需要購買元兔NFT及裝備，遊戲開始前，用戶需要在NFT市場，用$Carrot購買3個元兔NFT即可開啓遊戲，通關可產生$Carrot/道具NFT/元兔NFT/等豐厚的獎勵。</h3>
            <br />
            <br />
            為了創建更好的用戶體驗並提高可伸縮性，MetaBunny團隊將構建名第2層側鏈，提升玩家可玩性、可操作性。
            <br />
            <h2>遊戲玩法</h2>
            <br />
            <h3>
              <b>1.日常任務活動:</b>
              <br />
              每日登錄遊戲，用戶可與去領取Radish Coin代幣，每只元兔每天可以領取10枚$Carrot
              Coin。這些是每天發放的固定獎勵，以保持用戶的參與度和回頭率。
              <br />
              <br />
              <b>2.混戰打怪物boss</b>
              <br />
              怪物Boss會不定時入侵，參與保衛家園，擊退怪物Boss的玩家可以獲取$Carrot代幣獎勵。
              <br />
              <br />
              <b>3.PVP(玩家對戰)：</b>
              <br />
              玩家在兔子村擂台進行戰鬥,玩家需要使用3個不同類型的植物NFT組織一個隊伍，玩家與玩家可以進行挑戰，獲勝者將獲得$Carrot代幣獎勵；遊戲中還設置了戰鬥力排行榜模式，在每周和每月各更新一次，以代幣作為獎勵，激勵玩家參與戰鬥。
              <br />
              <br />
              <b>4.PVE(塔防闖關)：</b>
              <br />
              元兔村生活著一群無憂無慮的兔子，他們一起釣魚，一起讀書，一起種蘿蔔，每個時刻都十分珍貴幸福。然而，整個森林充滿著危險，時常闖進來不速之客，它們踐踏家園殺死同伴。村長召集大家組建保衛者一起戰鬥，擊退敵人，保衛家園......
              <br />
              <br />
              遊戲內設置不同難度的關卡，玩家可以使用元兔NFT進行塔防闖關活動，闖關成功將活動遊戲代幣$Carrot
              Coin代幣獎勵。
              <br />
              <br />
              <b>5.元兔體力：</b>
              <br />
              參與Boss混戰、PVP、PVE都需要消耗體力值，每天20點體力值，參與每場戰鬥消耗1點體力。體力值為0的兔子不能再參與戰鬥。
              <br />
              <br />
              <b>6.元兔血量：</b>
              <br />
              每只兔子每天血量是100，參與戰鬥元兔會掉血，血量為0的兔子不能再進行戰鬥。兔子的血量可以用$Carrot代幣恢復
            </h3>
          </div>
        </div>
      </div>

      <div id="Staking" className={s.popupcontainer}>
        <div className={s.popupcontent}>
          <a href="#banner" className={s.close}>
            &times;
          </a>
          <img src={cap1} alt="" />
          <div className={s.txt}>
            <h2>Staking $Carrot(蘿蔔幣)</h2>
            <h3>
              每個元兔NFT都是一個獨特的戰士，玩家通過質押元兔NFT到指定的合約地址，同時每天需要給兔子餵蘿蔔幣才能形成戰鬥力。兔子通過戰鬥可以獲得蘿蔔幣的獎勵。
              <br />
              <br />
              代幣類型：ERC20
              <br />
              <b>發行總量：</b>無上限
              <br />
              <b>增發模型：</b>Bonding Curve
              <br />
              <b>使用場景：</b>遊戲內消耗、遊戲內產出
              <br />
              <b>代幣分配如下：</b>
              <br />- 基金會：10%
              <br />- 技術團隊：10%
              <br />- 市場運營：10%
              <br />- 機構：5%
              <br />- IDO預售：5%
              <br />- 遊戲內循環：60%
            </h3>
          </div>
        </div>
      </div>

      <div id="Bunnyverse" className={s.popupcontainer}>
        <div className={s.popupcontent}>
          <a href="#banner" className={s.close}>
            &times;
          </a>
          <img src={cap3} alt="" />
          <div className={s.txt}>
            <h2>{t('intro.preview.bunnyverse')}</h2>
            <h3>
              {t('intro.preview.text1.1')}
              <br />
              <br />
            </h3>
          </div>
        </div>
      </div>
      <MintModal type="COMMON" img="" txHash="txHash" id={0} />
    </>
  );
};

export default Header;
