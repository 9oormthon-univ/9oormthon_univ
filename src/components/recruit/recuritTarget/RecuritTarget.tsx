import { Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames/bind';
import styles from './RecruitTarget.module.scss';
import ProgrammingIcon from '../../../assets/svgs/ProgrammingIcon.svg';
import ExamIcon from '../../../assets/svgs/ExamIcon.svg';
import SunIcon from '../../../assets/svgs/SunIcon.svg';

const cx = classNames.bind(styles);

function RecuritTarget() {
  return (
    <div className={cx('container')}>
      <Text as="h2" color="text-normal" typography="heading2" fontWeight="bold">
        3기 지원 대상
      </Text>
      <div className={cx('bottomSection')}>
        <div className={cx('targetBox')}>
          <img src={ProgrammingIcon} />
          <Text as="h4" color="text-alternative" typography="heading4" fontWeight="bold" className={cx('contentsText')}>
            IT 서비스의 구현에
            <br /> 관심이 많은 대학생
          </Text>
        </div>
        <div className={cx('targetBox')}>
          <img src={ExamIcon} />
          <Text as="h4" color="text-alternative" typography="heading4" fontWeight="bold" className={cx('contentsText')}>
            타 학교 친구들과 <br />
            협업 경험을 쌓고 싶은 대학생
          </Text>
        </div>
        <div className={cx('targetBox')}>
          <img src={SunIcon} />
          <Text as="h4" color="text-alternative" typography="heading4" fontWeight="bold" className={cx('contentsText')}>
            열정과 성실함이 <br />
            넘치는 대학생
          </Text>
        </div>
      </div>
    </div>
  );
}

export default RecuritTarget;
