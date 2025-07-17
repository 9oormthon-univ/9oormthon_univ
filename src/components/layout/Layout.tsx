import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import CustomFooter from './footer/CustomFooter';
import CustomNavbar from './navbar/CustomNavbar';
import { useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import usePeriodStore from '../../store/usePeriodStore';

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
  const { fetchUserStatus } = useAuthStore();
  const { fetchPeriodData } = usePeriodStore();

  useEffect(() => {
    fetchUserStatus();
    fetchPeriodData();
  }, [fetchUserStatus, fetchPeriodData]);

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
