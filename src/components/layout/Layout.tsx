import { Footer } from '@goorm-dev/vapor-components';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import CustomFooter from './footer/CustomFooter';
import CustomNavbar from './navbar/CustomNavbar';
import { useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import usePeriodStore from '../../store/usePeriodStore';
import styles from './layout.module.scss';

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
        <div className={styles.layoutContainer}>
          <Outlet />
        </div>
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
