import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import arrow from '../../../../../assets/img/icons/arrow.svg';
import arrowWhite from '../../../../../assets/img/icons/arrowWhite.svg';
import plogo2 from '../../../../../assets/img/icons/plogo2.png';
import plogo3 from '../../../../../assets/img/icons/plogo3.jpg';
import plogo4 from '../../../../../assets/img/icons/plogo4.png';
import plogo5 from '../../../../../assets/img/icons/plogo5.png';
import plogo6 from '../../../../../assets/img/icons/plogo6.jpg';
import plogo8 from '../../../../../assets/img/icons/plogo8.jpg';
import plogo9 from '../../../../../assets/img/icons/plogo9.jpg';
import plogo10 from '../../../../../assets/img/icons/plogo10.jpg';
import s from './FAQ.module.scss';

interface IFAQItemProps {
  title: string;
  subtitle: string;
}

const FAQItem: React.FC<IFAQItemProps> = ({ title, subtitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(s.item, { [s.itemActive]: isOpen })}
      tabIndex={0}
      onKeyDown={() => {}}
      role="button"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={cn(s.item_title, { [s.item_titleActive]: isOpen })}>
        {title}
        <img src={isOpen ? arrowWhite : arrow} alt="arrow" className={s.arrow} />
      </div>
      <div className={cn(s.item_subtitle, { [s.active]: isOpen })}>{subtitle}</div>
    </div>
    
  );
};

const FAQ: React.FC = () => {
  const { t } = useTranslation();

  const FaqData = useMemo(
    () => [
      {
        id: 1,
        title: t('faq.faq1.title'),
        subtitle: t('faq.faq1.text'),
      },
      {
        id: 2,
        title: t('faq.faq2.title'),
        subtitle: t('faq.faq2.text'),
      },
      {
        id: 3,
        title: t('faq.faq3.title'),
        subtitle: t('faq.faq3.text'),
      },
      {
        id: 4,
        title: t('faq.faq4.title'),
        subtitle: t('faq.faq4.text'),
      },
      {
        id: 5,
        title: t('faq.faq5.title'),
        subtitle: t('faq.faq5.text'),
      },
      {
        id: 6,
        title: t('faq.faq6.title'),
        subtitle: t('faq.faq6.text'),
      }
    ],
    [t],
  );

  return (
    <section className={s.section} id="faq">
      <div className={s.section_inner}>
        <div className={s.title}>FAQ</div>
        <div className={s.faqs}>
          {FaqData.map((data) => (
            <FAQItem key={data.id} {...data} />
          ))}
        </div>
        
      </div>

       <div className={s.logo} id="logo">
        <div className={s.creator}>
          <div className={s.subTitle}>Creator:</div>
          <a href="https://www.hkd.com/" target="_blank" rel="noreferrer">
            <img src={plogo4} alt=""  className={s.plogo}/>
          </a>
        </div>
        <div className={s.partners}>  
          <div className={s.subTitle}>Partners:</div>

            <a href="https://www.huobi.com/zh-cn/" target="_blank" rel="noreferrer">
              <img src={plogo2} alt=""  className={s.plogo2}/>
            </a>
            <a href="https://times.capital/" target="_blank" rel="noreferrer">
              <img src={plogo3} alt="" className={s.plogo3}/>
            </a>

            <a href="https://www.mercuryllc.com" target="_blank" rel="noreferrer">
              <img src={plogo8} alt=""  className={s.plogo8}/>
            </a>
            <a href="https://www.zheirs.com" target="_blank" rel="noreferrer">
              <img src={plogo9} alt="" className={s.plogo9}/>
            </a>
            <a href="https://www.rmls.vip/" target="_blank" rel="noreferrer">
              <img src={plogo10} alt="" className={s.plogo10}/>
            </a>
         </div>
          <div className={s.three}>  
           <div className={s.subTitle}>Privileges Providers:</div>
           <a href="https://www.three.com.hk/tc/home.html" target="_blank" rel="noreferrer">
              <img src={plogo5} alt="" className={s.logo5} />
            </a>
            <a href="https://www.zfu.com/" target="_blank" rel="noreferrer">
              <img src={plogo6} alt="" className={s.plogo6}/>
            </a>

          </div>


      </div>
    </section>
  );
};

export default FAQ;
