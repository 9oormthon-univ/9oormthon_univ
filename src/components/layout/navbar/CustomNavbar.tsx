import { Button, GoormNavbar } from '@goorm-dev/gds-components';
import { ChevronRightOutlineIcon, OutOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import { GoormBlackBI, GoormWhiteBI } from '../../../assets';
import { useIsAbout } from '../../../hooks/useIsAbout';
import styles from './customNavbar.module.scss';
import { Nav, NavItem, NavLink } from '@goorm-dev/vapor-components';

function CustomNavbar() {
  const [isOpened, setIsOpened] = useState(false);
  const isAbout = useIsAbout();

  // TODO: 로그인 여부 확인 로직 추가
  const isLoggedIn = false;

  const NAV_ITEMS = [
    {
      title: 'Project',
      to: '/project',
    },
    {
      title: 'Recruit',
      to: '/recruit',
    },
    // {
    //   title: 'Hackathon',
    //   to: '/hackathon',
    // },
    {
      title: (
        <>
          UNIV-LOG <OutOutlineIcon className="mx-1" />
        </>
      ),
      to: 'https://9oormthonuniv.tistory.com/',
    },
  ];

  return (
    <GoormNavbar className={isAbout ? styles.navBarStyle : ''} isOpened={isOpened} setIsOpened={setIsOpened}>
      <GoormNavbar.Brand href="/" className="ml-2">
        {isAbout && !isOpened ? <GoormWhiteBI /> : <GoormBlackBI />}
      </GoormNavbar.Brand>
      <GoormNavbar.Collapse isOpened={isOpened} className={styles.collapse}>
        <Nav navbar className={styles.navbar}>
          {NAV_ITEMS.map((_, index) => (
            <NavItem key={index}>
              <NavLink
                className={isAbout ? styles.whiteFont : ''}
                href={_.to}
                target={_.to.startsWith('http') ? '_blank' : '_self'}
                rel={_.to.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={() => isOpened && setIsOpened((prev) => !prev)}>
                {_.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <Nav navbar className={styles.navbar}>
          <NavLink
            className={isAbout ? styles.whiteFont : ''}
            href="/search-univ"
            onClick={() => isOpened && setIsOpened((prev) => !prev)}>
            나의 유니브 찾기
          </NavLink>

          {isLoggedIn ? (
            <NavLink className={styles.grayCircle} href="/my-page"></NavLink>
          ) : (
            <>
              {/* <Button className={styles.loginButton} size="lg" href="/login"> */}
              <Button className={styles.loginButton} size="lg" onClick={() => alert('준비 중인 기능입니다.')}>
                로그인
              </Button>
              <NavLink className={styles.loginText} onClick={() => alert('준비 중인 기능입니다.')} href="#">
                로그인하기
                {/* <Button onClick={() => alert('준비 중인 기능입니다.')}>로그인하기</Button> */}
                <ChevronRightOutlineIcon className="ml-1" />
              </NavLink>
            </>
          )}
        </Nav>
      </GoormNavbar.Collapse>
      <GoormNavbar.Toggler
        className={styles.customToggler}
        toggle={setIsOpened}
        isOpened={isOpened}
        $isAbout={isAbout}
        onClick={() => setIsOpened((prev) => !prev)}
      />
    </GoormNavbar>
  );
}

export default CustomNavbar;
