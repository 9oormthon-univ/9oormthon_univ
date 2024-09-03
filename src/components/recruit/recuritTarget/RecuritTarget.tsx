import { Text } from '@goorm-dev/vapor-components';
import styles from './RecruitTarget.module.scss';
import ProgrammingIcon from '../../../assets/svgs/ProgrammingIcon.svg';
import ExamIcon from '../../../assets/svgs/ExamIcon.svg';
import SunIcon from '../../../assets/svgs/SunIcon.svg';

function RecuritTarget() {
  return (
    <div className={styles.container}>
      <Text as="h3" color="text-normal" typography="heading3" fontWeight="bold">
        3기 지원 대상
      </Text>
      <div className={styles.bottomSection}>
        <div className={styles.targetBox}>
          <img src={ProgrammingIcon} alt="Programming Icon" />
          <Text
            className={styles['show-on-lg']}
            as="h4"
            color="text-alternative"
            typography="heading4"
            fontWeight="bold">
            IT 서비스의 구현에
            <br /> 관심이 많은 대학생
          </Text>
          <Text
            className={styles['show-on-md']}
            as="h5"
            color="text-alternative"
            typography="heading5"
            fontWeight="bold">
            IT 서비스의 구현에
            <br /> 관심이 많은 대학생
          </Text>
        </div>
        <div className={styles.targetBox}>
          <img src={ExamIcon} alt="Exam Icon" />
          <Text
            className={styles['show-on-lg']}
            as="h4"
            color="text-alternative"
            typography="heading4"
            fontWeight="bold">
            타 학교 친구들과 <br />
            협업 경험을 쌓고 싶은 대학생
          </Text>
          <Text
            className={styles['show-on-md']}
            as="h5"
            color="text-alternative"
            typography="heading5"
            fontWeight="bold">
            타 학교 친구들과 <br />
            협업 경험을 쌓고 싶은 대학생
          </Text>
        </div>
        <div className={styles.targetBox}>
          <img src={SunIcon} alt="Sun Icon" />
          <Text
            className={styles['show-on-lg']}
            as="h4"
            color="text-alternative"
            typography="heading4"
            fontWeight="bold">
            열정과 성실함이 <br />
            넘치는 대학생
          </Text>
          <Text
            className={styles['show-on-md']}
            as="h5"
            color="text-alternative"
            typography="heading5"
            fontWeight="bold">
            열정과 성실함이 <br />
            넘치는 대학생
          </Text>
        </div>
      </div>
    </div>
  );
}

export default RecuritTarget;
