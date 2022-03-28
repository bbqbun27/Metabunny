/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import copyToClipboard from 'copy-to-clipboard';

import copy from '../../../../assets/img/icons/copy.svg';
import iconDisconnect from '../../../../assets/img/icons/disconnect.svg';
import metamask from '../../../../assets/img/icons/metamask.svg';
import walletconnect from '../../../../assets/img/icons/walletconnect.svg';
import disc from '../../../../assets/img/sections/landing/header/disc.png';
import ig from '../../../../assets/img/sections/landing/header/ig.png';
import opensea from '../../../../assets/img/sections/landing/header/opensea.png';
import tele from '../../../../assets/img/sections/landing/header/tele.png';
import twit from '../../../../assets/img/sections/landing/header/twit.png';
import { useModals } from '../../../../context/Modal';
import { useWeb3Context } from '../../../../context/WalletConnect';
import Button from '../../../atoms/Button';
import ModalWrapper from '../Modal';

import s from './WalletModal.module.scss';

interface IWalletModalProps {
  mintNft?: (wallet: 'MetaMask' | 'WalletConnect') => void;
}

const WalletModal: React.FC<IWalletModalProps> = ({ mintNft }) => {
  const [copyAddress, setCopyAddress] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { modals, closeModal } = useModals();
  const { user, disconnect } = useWeb3Context();
  const { t } = useTranslation();

  const handleClose = () => {
    closeModal('wallet');
    setIsDisconnecting(false);
  };

  const handleMint = (wallet: 'MetaMask' | 'WalletConnect') => {
    if (mintNft) {
      mintNft(wallet);
    }
    handleClose();
  };

  const handleCopy = useCallback(() => {
    copyToClipboard(user.address || '');
    setCopyAddress(true);
  }, [user.address]);

  const changeDisconnect = useCallback(() => {
    setIsDisconnecting(!isDisconnecting);
  }, [isDisconnecting]);

  const handleLogout = () => {
    disconnect();
    handleClose();
  };

  return (
    <ModalWrapper close={handleClose} isActive={modals.includes('wallet')} className={s.wrapper}>
      {user.address ? (
        <div className={s.modal}>
          {!isDisconnecting && (
            <>
              <div className={s.title}>{t('account.title')}</div>
              <div className={s.subtitle}>
                {t('account.text')} {user.provider}
              </div>
            </>
          )}
          <div className={s.account}>
            <div
              className={cx(s.wallet_address, {
                [s.textCenter]: isDisconnecting,
              })}
            >
              {isDisconnecting
                ? t('account.delete')
                : `${user.address.slice(0, 10)}...${user.address.slice(-7)}`}
              {!isDisconnecting && (
                <span className={s.copy}>
                  <img src={copy} alt="copy" onKeyPress={() => {}} onClick={handleCopy} />
                  <div className={s.tooltip}>
                    <span className={s.tooltiptext}>
                      {copyAddress ? t('account.success') : t('account.copy')}
                    </span>
                  </div>
                </span>
              )}
            </div>
            {isDisconnecting ? (
              <Button title="OK" className={s.logout} onClick={() => handleLogout()} />
            ) : (
              <div className={s.disconnect_wrapper}>
                <button type="button" onClick={changeDisconnect} className={s.disconnect}>
                  <img src={iconDisconnect} alt="disconnect" />
                </button>
                <span>{t('account.disconnect')}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={s.modal}>
          <div className={s.subtitle}>{t('mint.stop')}</div>
          <br />
          <div className={s.subtitle3}>{t('mint.stop6')}</div>
          <br />

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
          <div className={s.wallets}>
            <button type="button" onClick={() => handleMint('MetaMask')} className={s.wallet}>
              <div className={s.wallet_icon}>
                <img src={metamask} alt="metamask" />
              </div>
              <span>Metamask</span>
            </button>
            <button className={s.wallet} type="button" onClick={() => handleMint('WalletConnect')}>
              <div className={s.wallet_icon}>
                <img src={walletconnect} alt="walletconnect" />
              </div>
              <span>WalletConnect</span>
            </button>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};

export default WalletModal;
