import { Button, GoormNavbar, Nav, NavItem, NavLink } from '@goorm-dev/gds-components';
import { OutIcon, SearchIcon } from '@goorm-dev/gds-icons';
import { useState } from 'react';
import { GoormBlackBI, GoormWhiteBI } from '../../../assets';
import { useIsAbout } from '../../../hooks/useIsAbout';
import styles from './CustomNavbar.module.scss';

function CustomNavbar() {
  const [isOpened, setIsOpened] = useState(false);
  const isAbout = useIsAbout();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  const NAV_ITEMS = [
    {
      title: 'Project',
      to: '/project',
    },
    {
      title: 'Recruit',
      to: '/recruit',
    },
    {
      title: (
        <>
          univ-log <OutIcon className="mx-1" />
        </>
      ),
      to: 'https://9oormthonuniv.tistory.com/',
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
                target={_.to.startsWith('http') ? '_blank' : '_self'} // 외부 링크는 새 탭에서 열림
                rel={_.to.startsWith('http') ? 'noopener noreferrer' : undefined}
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
            <SearchIcon className="mx-1" />
            나의 유니브 찾기
          </NavLink>

          {isLoggedIn ? (
            <NavLink className={styles.grayCircle} href="/my-page"></NavLink>
          ) : (
            <Button className={styles.loginButton} size="lg" href="/login">
              로그인
            </Button>
          )}
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
