import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  justify-content: center;
  align-items: center;
  background: var(--background-alternative-01);
`;

export const MainWrapper = styled.div`
  display: flex;
  width: 680px;
  padding: var(--space-300) var(--space-300) var(--space-800) var(--space-300);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-300);
  border-radius: 8px;
  border: 1px solid var(--gray-100);
  background: var(--gray-000);
`;

export const MainTitle = styled.h3`
  color: var(--text-alternative);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.3px;
`;

export const MainSubDescription = styled.p`
  color: var(--text-normal);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.1px;
  text-align: center;
`;

export const NotFoundImg = styled.img`
  width: 220px;
  height: 220px;
`;
