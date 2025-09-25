import { GoormNavbar } from '@goorm-dev/gds-components';
import { ChevronRightOutlineIcon, LockIcon, OutOutlineIcon, UserIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';
import { GoormBlackBI, GoormWhiteBI } from '../../../assets';
import { useIsAbout } from '../../../hooks/useIsAbout';
import styles from './customNavbar.module.scss';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  toast,
} from '@goorm-dev/vapor-components';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore';
import { Role, UserStatus } from '../../../constants/role';
import avatar from '../../../assets/images/avatar.png';

function CustomNavbar() {
  const [isOpened, setIsOpened] = useState(false);
  const [isHackathonOpened, setIsHackathonOpened] = useState(false);
  const [isMyPageOpened, setIsMyPageOpened] = useState(false);
  const isAbout = useIsAbout();
  const navigate = useNavigate();

  // 유저 정보
  const { role, status } = useAuthStore();

  // 개발 환경에서는 로그인 상태로 설정
  const isLoggedIn = import.meta.env.DEV ? true : role !== Role.GUEST;

  const profileImg = useAuthStore((state) => state.img_url);

  const NAV_ITEMS = [
    {
      title: 'Project',
      to: '/project',
    },
    {
      title: 'Recruit',
      to: '/recruit',
    },
  ];

  // 로그아웃
  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate('/');
    window.location.reload();
    useAuthStore.getState().resetToGuest();
  };

  // 팀 빌딩 기간 데이터 업데이트 필요
  const handleClickHackathon = async () => {
    const currentStatus = import.meta.env.DEV ? UserStatus.APPLICANT : status ?? UserStatus.NONE;

    switch (currentStatus) {
      case UserStatus.PROVIDER:
        navigate('/team/provider');
        break;
      case UserStatus.MEMBER:
      case UserStatus.APPLICANT:
      case UserStatus.APPLICANT_REJECTED:
        navigate('/team/applicant');
        break;
      case UserStatus.NONE:
        toast('아직 팀 빌딩을 진행하지 않았습니다.', { type: 'danger' });
        break;
      default:
        if (import.meta.env.DEV) {
          console.log('Unknown status:', currentStatus);
        }
        toast('알 수 없는 오류가 발생했습니다.', { type: 'danger' });
    }
  };

  const handleClickMyTeam = async () => {
    const currentStatus = import.meta.env.DEV ? UserStatus.PROVIDER : useAuthStore.getState().status ?? UserStatus.NONE;

    if (currentStatus === UserStatus.PROVIDER || currentStatus === UserStatus.MEMBER) {
      navigate('/team/my-team');
    } else {
      toast('아직 팀 빌딩을 진행하지 않았습니다.', { type: 'danger' });
    }
  };

  return (
    <GoormNavbar className={isAbout ? styles.navBarStyle : ''} isOpened={isOpened} setIsOpened={setIsOpened}>
      <GoormNavbar.Brand href="/" className="ml-2">
        {isAbout && !isOpened ? (
          <GoormWhiteBI aria-label="구름톤 유니브 로고" />
        ) : (
          <GoormBlackBI aria-label="구름톤 유니브 로고" />
        )}
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

          {isLoggedIn && (
            <Dropdown
              direction="down"
              nav={true}
              size="lg"
              isOpen={isHackathonOpened}
              toggle={() => setIsHackathonOpened((prev) => !prev)}
              inNavbar={true}>
              <DropdownToggle
                caret
                color="select"
                className={isAbout ? styles.dropdownToggleWhite : styles.dropdownToggle}>
                Hackathon
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  onClick={() => {
                    navigate('/hackathon');
                    setIsOpened(false);
                  }}>
                  아이디어
                </DropdownItem>
                <DropdownItem
                  onClick={async () => {
                    await handleClickHackathon();
                    setIsOpened(false);
                  }}>
                  지원 현황
                </DropdownItem>
                <DropdownItem
                  onClick={async () => {
                    await handleClickMyTeam();
                    setIsOpened(false);
                  }}>
                  나의 팀
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          <NavItem>
            <NavLink
              className={isAbout ? styles.whiteFont : ''}
              href="https://9oormthonuniv.tistory.com/"
              target="_blank"
              rel="noopener noreferrer">
              UNIV-LOG <OutOutlineIcon className="mx-1" aria-label="UNIV-LOG 링크" />
            </NavLink>
          </NavItem>
        </Nav>

        <Nav navbar className={styles.navbar}>
          <NavLink
            className={isAbout ? styles.whiteFont : ''}
            href="/search-univ"
            onClick={() => isOpened && setIsOpened((prev) => !prev)}>
            나의 유니브 찾기
          </NavLink>

          {isLoggedIn ? (
            <Dropdown nav isOpen={isMyPageOpened} toggle={() => setIsMyPageOpened((prev) => !prev)}>
              <DropdownToggle nav className={styles.profileCircle}>
                {profileImg ? (
                  <img src={profileImg} alt="profile" className={styles.profileImg} />
                ) : (
                  <img src={avatar} alt="profile" className={styles.profileImg} />
                )}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  className={styles.dropdownItem}
                  onClick={() => {
                    navigate('/my-page');

                    setIsOpened(false);
                  }}>
                  <div className={styles.iconAddLink}>
                    <UserIcon width={16} height={16} />
                    마이페이지
                  </div>
                </DropdownItem>
                <DropdownItem
                  className={styles.dropdownItem}
                  onClick={() => {
                    navigate('/update-password');
                    setIsOpened(false);
                  }}>
                  <div className={styles.iconAddLink}>
                    <LockIcon width={16} height={16} />
                    비밀번호 변경
                  </div>
                </DropdownItem>
                <DropdownItem className={styles.dropdownItem} onClick={handleLogout}>
                  <div className={styles.iconAddLink}>
                    <OutOutlineIcon width={16} height={16} />
                    로그아웃
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <Button className={styles.loginButton} size="lg" href="/login">
                로그인
              </Button>
              <NavLink className={styles.loginText} href="/login">
                로그인하기
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
