import { AddAvatar, GoormNavbar, Nav, NavItem, NavLink } from '@goorm-dev/gds-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoDark from '../../../assets/images/goormthon_univ_BI-Bk.png';
import LogoLight from '../../../assets/images/goormthon_univ_BI-W.png';
import * as S from './style';
import styles from './styles.module.scss';

function CustomNavbar() {
  const [isOpened, setIsOpened] = useState(false);

  const location = useLocation();
  const isAbout = location.pathname === '/';

  const NAV_ITEMS = [
    {
      title: 'About',
      to: '/',
    },
    {
      title: 'Project',
      to: '/project',
    },
    {
      title: 'Recruit',
      to: '/recruit',
    },
  ];

  return (
    <GoormNavbar isOpened={isOpened} setIsOpened={setIsOpened}>
      <GoormNavbar.Brand href="/" className="navbar-brand">
        <S.NavLogoIcon src={isAbout && !isOpened ? LogoLight : LogoDark} alt="9oormthon Univ" />
      </GoormNavbar.Brand>
      <GoormNavbar.Collapse isOpened={isOpened} className="justify-content-start">
        <Nav pills>
          {NAV_ITEMS.map((_) => (
            <NavItem>
              <NavLink className={styles.navLink} href={_.to} onClick={() => isOpened && setIsOpened((prev) => !prev)}>
                {_.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </GoormNavbar.Collapse>
      <GoormNavbar.Collapse isOpened={isOpened} className="justify-content-end">
        <Nav>
          <NavLink className={styles.navLink} href="/" onClick={() => isOpened && setIsOpened((prev) => !prev)}>
            나의 유니브 찾기
          </NavLink>
          <AddAvatar onClick={() => console.log('Click the Avatar')} />
        </Nav>
      </GoormNavbar.Collapse>
      <GoormNavbar.Toggler
        className="navbar-toggler"
        toggle={setIsOpened}
        isOpened={isOpened}
        $isAbout={isAbout}
        onClick={() => setIsOpened((prev) => !prev)}
      />
    </GoormNavbar>
  );
}

export default CustomNavbar;
