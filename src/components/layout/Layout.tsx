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
        <div style={{ minHeight: '80vh', width: '100%' }}>
          <Outlet />
        </div>
      </Wrapper>
      <CustomFooter />
    </>
  );
};
export default Layout;
