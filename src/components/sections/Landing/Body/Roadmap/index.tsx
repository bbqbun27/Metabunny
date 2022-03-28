import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import s from './Roadmap.module.scss';

const Roadmap: React.FC = () => {
  const { t } = useTranslation();
  const stages = useMemo(
    () => [
      { title: t('roadmap.desc.10'), descr: t('roadmap.percents.10') },
      {
        title: t('roadmap.desc.20'),
        descr: t('roadmap.percents.20'),
      },
      { title: t('roadmap.desc.30'), descr: t('roadmap.percents.30') },
    ],
    [t],
  );

  return (
    <section className={s.section} id="roadmap">
      <div className={s.title}>{t('navigation.roadmap')}</div>
      <div className={s.section_body}>
        <div className={s.stages}>
          {stages.map((stage: any, index: number) => (
            <div className={cn(s.stage, { [s.oddStage]: index % 2 })}>
              <div className={s.percentage}>{stage.title}</div>
              <div className={s.description}>{stage.descr}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
