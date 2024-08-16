import { Footer } from '@goorm-dev/gds-components';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import CustomFooter from './footer/CustomFooter';
import CustomNavbar from './navbar/CustomNavbar';

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 4rem;
  padding-bottom: 12.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const Layout = () => {
  return (
    <>
      <CustomNavbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <CustomFooter />
      <StyledFooter localeListGroup={[]} />
    </>
  );
};
export default Layout;

const StyledFooter = styled(Footer)`
  position: absolute;
  width: 100%;
  z-index: 2;
`;
