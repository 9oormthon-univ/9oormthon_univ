import { GoormNavbar, Nav, NavItem, NavLink } from '@goorm-dev/gds-components';
import { SchoolIcon } from '@goorm-dev/gds-icons';
import { useState } from 'react';
import { GoormBlackBI, GoormWhiteBI } from '../../../assets';
import { useIsAbout } from '../../../hooks/useIsAbout';
import styles from './CustomNavbar.module.scss';

function CustomNavbar() {
  const [isOpened, setIsOpened] = useState(false);
  const isAbout = useIsAbout();

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
        {isAbout ? <GoormWhiteBI /> : <GoormBlackBI />}
      </GoormNavbar.Brand>
      <GoormNavbar.Collapse isOpened={isOpened} className="justify-content-start">
        <Nav pills>
          {NAV_ITEMS.map((_, index) => (
            <NavItem key={index}>
              <NavLink
                className={isAbout ? styles.whiteFont : ''}
                href={_.to}
                onClick={() => isOpened && setIsOpened((prev) => !prev)}>
                {_.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </GoormNavbar.Collapse>
      <GoormNavbar.Collapse isOpened={isOpened} className="justify-content-end">
        <Nav className="gap-0">
          <NavLink
            className={isAbout ? styles.whiteFont : ''}
            href="/"
            onClick={() => isOpened && setIsOpened((prev) => !prev)}>
            <SchoolIcon className="mx-1" />
            나의 유니브 찾기
          </NavLink>

          <NavLink className={styles.grayCircle} href="/signUp"></NavLink>
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
