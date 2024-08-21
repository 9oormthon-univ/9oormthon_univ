import { useEffect, useState } from 'react';
import Universities from '../../../utilities/UnivData';
import UniversityItem from '../../recruit/UniversityItem/UniversityItem';
import * as S from './style';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { THIS_SEASON } from '../../../constants/common';
import RecruitUnivScrolling from '../../recruit/recruitUnivScrolling/RecruitUnivScrolling';

const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
`;

const ImageSlider = styled.div`
  display: flex;
  animation: slide 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    } // 목록의 절반만큼만 이동
  }
`;

const TEXT = `전국 ${THIS_SEASON.AMOUNT_OF_UNIV}개 대학이 \n 구름톤 유니브와 함께하고 있어요`;

function FindingUniv() {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 목표 날짜 설정 (24년 1월 12일)
    const targetDate = new Date('2024-01-12');

    // 현재 날짜 가져오기
    const currentDate = new Date();

    // 남은 날짜 계산
    const timeRemaining = targetDate - currentDate;
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    setDaysRemaining(daysRemaining);
  }, []);

  const navigateToRecruit = () => {
    navigate('/recruit');
    window.scrollTo(0, 0);
  };

  const AutoScrollingImages = () => {
    const doubledUniversities = [...Universities, ...Universities, ...Universities];

    return (
      <Container>
        <ImageSlider>
          {doubledUniversities.map((univ, index) => (
            <UniversityItem key={index} image={univ.image} name={univ.name} link={univ.link} />
          ))}
        </ImageSlider>
      </Container>
    );
  };

  return (
    <S.FindingUnivWrapper>
      <S.HeaderUnivContainer>
        <S.HeaderUnivTitleText>{TEXT}</S.HeaderUnivTitleText>
        <S.HeaderUnivTitleTextSmall>{TEXT}</S.HeaderUnivTitleTextSmall>
        <RecruitUnivScrolling />
      </S.HeaderUnivContainer>
    </S.FindingUnivWrapper>
  );
}

export default FindingUniv;
