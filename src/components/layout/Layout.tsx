import { Footer } from '@goorm-dev/gds-components';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import CustomFooter from './footer/CustomFooter';
import CustomNavbar from './navbar/CustomNavbar';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background-color: white;
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
  padding-left: 3rem;
  z-index: 2;
`;
