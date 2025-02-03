import styled from 'styled-components';
import { GithubIcon, InstagramIcon } from '@goorm-dev/gds-icons';

export const FooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  background: var(--gray-000);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4375rem;

  width: 335px;
  flex-direction: column;
  padding: var(--size-300) 0;

  @media screen and (min-width: 720px) {
    width: 100%;
    padding-left: var(--size-200);
    padding-right: var(--size-200);
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
  @media screen and (min-width: 1200px) {
    width: 1138px;
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--size-250);

  @media screen and (max-width: 720px) {
    gap: var(--size-150);
  }
`;

export const FooterSlogan = styled.h3`
  color: var(--gray-700);

  margin: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;

  @media screen and (max-width: 720px) {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.1px;
  }
`;

export const SocialIcon = styled.a`
  color: var(--gray-700);
  text-decoration: none;
  font-size: 1.5rem;
  padding: var(--size-075);

  &:hover {
    color: #007bff;
  }

  & > svg {
    margin-right: 0;
  }
`;

export const StyledGithubIcon = styled(GithubIcon)`
  width: 40px;
  height: 40px;

  @media (max-width: 720px) {
    width: 24px;
    height: 24px;
  }
`;

export const StyledInstagramIcon = styled(InstagramIcon)`
  width: 40px;
  height: 40px;

  @media (max-width: 720px) {
    width: 24px;
    height: 24px;
  }
`;
