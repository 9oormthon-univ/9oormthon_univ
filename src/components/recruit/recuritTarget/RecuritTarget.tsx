import classNames from 'classnames/bind';
import styles from './RecruitTarget.module.scss';
import ProgrammingIcon from '../../../assets/svgs/ProgrammingIcon.svg';
import ExamIcon from '../../../assets/svgs/ExamIcon.svg';
import SunIcon from '../../../assets/svgs/SunIcon.svg';

const cx = classNames.bind(styles);

function RecuritTarget() {
  return (
    <div className={cx('container')}>
      <h2 className={cx('titleText')}>3기 지원 대상</h2>
      <div className={cx('bottomSection')}>
        <div className={cx('targetBox')}>
          <img src={ProgrammingIcon} />
          <h4 className={cx('contentsText')}>
            IT 서비스의 구현에
            <br /> 관심이 많은 대학생
          </h4>
        </div>
        <div className={cx('targetBox')}>
          <img src={ExamIcon} />
          <h4 className={cx('contentsText')}>
            타 학교 친구들과 <br />
            협업 경험을 쌓고 싶은 대학생
          </h4>
        </div>
        <div className={cx('targetBox')}>
          <img src={SunIcon} />
          <h4 className={cx('contentsText')}>
            열정과 성실함이 <br />
            넘치는 대학생
          </h4>
        </div>
      </div>
    </div>
    // <S.TargetContainer initial={{ opacity: 0, y: 100 }} transition={{ duration: 0.85 }} className="w-100 flex-column">
    //   <S.TargetTitle className="mb-3">3기 지원 대상</S.TargetTitle>
    //   <S.TargetRowDetailWrapper className="d-flex">
    //     <S.TargetRowDetailBox
    //       initial={{ opacity: 0, y: 100 }}
    //       transition={{ duration: 0.85 }}
    //       className="d-flex flex-row align-items-center justify-content-start">
    //       {/* icon */}
    //       <SchoolIcon className="SchoolIcon__icon" color="black" width="20px" height="20px" />
    //       <S.TargetDetailBoxText>IT 서비스의 구현에 관심이 많은 대학생</S.TargetDetailBoxText>
    //       {/* text */}
    //     </S.TargetRowDetailBox>
    //     <S.TargetRowDetailBox initial={{ opacity: 0, y: 100 }} transition={{ duration: 0.85 }}>
    //       {/* icon */}
    //       <CalendarIcon className="CalendarIcon__icon" color="black" width="20px" height="20px" />
    //       <S.TargetDetailBoxText>타학교 친구들과 협업 경험을 쌓고 싶은 대학생</S.TargetDetailBoxText>
    //       {/* text */}
    //     </S.TargetRowDetailBox>
    //     <S.TargetRowDetailBox initial={{ opacity: 0, y: 100 }} transition={{ duration: 0.85 }}>
    //       {/* icon */}
    //       <GroupIcon className="GroupIcon__icon" color="black" width="20px" height="20px" />
    //       <S.TargetDetailBoxText>열정과 성실함이 넘치는 대학생</S.TargetDetailBoxText>
    //       {/* text */}
    //     </S.TargetRowDetailBox>
    //   </S.TargetRowDetailWrapper>
    // </S.TargetContainer>
  );
}

export default RecuritTarget;
