import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { THIS_SEASON } from '../../../constants/common';
import RecruitModal from '../recruitModal/RecruitModal';
import RecruitUnivScrolling from '../recruitUnivScrolling/RecruitUnivScrolling';
import * as S from './style';
import styles from './RecruitHeader.module.scss';
import classNames from 'classnames/bind';
import { Button } from '@goorm-dev/vapor-components';

const cx = classNames.bind(styles);

function RecuritHeader() {
  const [isRecruitmentOver, setIsRecruitmentOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isInit, setIsInit] = useState(false);
  const navigate = useNavigate();

  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 모달 오픈
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const targetDate = new Date('2024-01-13T00:00:00+09:00');

    const updateRemainingTime = () => {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setIsRecruitmentOver(true);
      }

      setIsInit(true);
    };

    const intervalId = setInterval(updateRemainingTime, 1000);

    // 컴포넌트가 언마운트될 때 clearInterval을 통해 interval 정리
    return () => clearInterval(intervalId);
  }, []);

  // 버튼 클릭시
  const handleButtonClick = () => {
    // 모집기간 지났을때 구글폼으로
    if (isRecruitmentOver) {
      window.open('https://forms.gle/rDKEvu58VSZqScCn9', '_blank');
    } else {
      // 그 외에는 모집 페이지로
      navigate('/apply');
    }
  };

  // 모집 중 컨텐츠
  const RecruitmentContent = () => (
    <>
      <S.HeaderTitleText>
        구름톤 유니브 4기 모집 중!
        <h4>
          {isInit ? (
            <>
              {timeRemaining.hours + timeRemaining.days * 24}시간 {timeRemaining.minutes}분 {timeRemaining.seconds}초
            </>
          ) : (
            <>
              <Spinner />
            </>
          )}
        </h4>
      </S.HeaderTitleText>
      <Button className={styles.goormBtn} color="primary" size="xl" onClick={handleButtonClick}>
        우리 학교 찾아보기
      </Button>
    </>
  );

  // 마감 후 콘텐츠
  const RecruitmentClosedContent = () => (
    <div className={cx('container')}>
      <div className={cx('leftSection')}>
        <h2 className={cx('titleText')}>3기 모집이 완료되었어요!</h2>
        <h6 className={cx('titleTextSmall')}>구름톤 유니브 4기로 활동하고 싶으신가요?</h6>
        <Button className={cx('goormBtn')}>4기 사전 알림 받기</Button>
      </div>
      <div className={cx('rightSection')}>
        <h6 className={cx('dDayTitleText')}>4기 모집 시작</h6>
        <h1 className={cx('dDayText')}>25년 1월</h1>
        <div className={cx('dDayDetailText')}>Coming soon!</div>
      </div>
    </div>
  );

  return (
    <>
      {/* <S.HeaderContainer className="container"> */}
      {/* <S.HeaderTitleWrapper className="d-flex justify-content-center align-items-center flex-column"> */}
      <RecruitmentClosedContent />
      {/* </S.HeaderTitleWrapper> */}
      {isModalOpen && <RecruitModal isModalOpen={isModalOpen} toggleModal={toggleModal} />} {/* </S.HeaderContainer> */}
    </>
  );
}

export default RecuritHeader;
