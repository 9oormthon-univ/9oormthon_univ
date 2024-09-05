import { THIS_SEASON } from '../../../constants/common';
import RecruitUnivScrolling from '../../recruit/recruitUnivScrolling/RecruitUnivScrolling';

import { Text } from '@goorm-dev/vapor-components';
import styles from './findingUniv.module.scss';

const TEXT = `전국 ${THIS_SEASON.AMOUNT_OF_UNIV}개 대학이 \n 구름톤 유니브와 함께하고 있어요`;

function FindingUniv() {
  return (
    <div className={styles.intro}>
      <div className={styles.textContainer}>
        <Text typography="heading2" className={styles.titleText}>
          {TEXT}
        </Text>
        <Text typography="heading3" className={styles.titleSmallText}>
          {TEXT}
        </Text>
      </div>
      <RecruitUnivScrolling />
    </div>
  );
}

export default FindingUniv;
