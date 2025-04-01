import {
  CalendarIcon,
  ChevronRightOutlineIcon,
  FileIcon,
  GroupIcon,
  LightbulbIcon,
  NetworkIcon,
  OutOutlineIcon,
} from '@goorm-dev/vapor-icons';
import styles from './sideNavigation.module.scss';
import { SideNav, Avatar, Text, Button } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SideNavigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <SideNav className={styles.sideNav}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Avatar name="G" />
          <Text typography="subtitle2" color="text-hint">
            구름톤 유니브 관리자
          </Text>
        </div>
      </div>
      <SideNav.List>
        <SideNav.Group>
          <SideNav.Item>
            <SideNav.Link>
              <GroupIcon size={20} /> 미르미 명단
            </SideNav.Link>
          </SideNav.Item>
          <SideNav.Item>
            <SideNav.Link>
              <NetworkIcon size={20} /> 팀 리스트
            </SideNav.Link>
          </SideNav.Item>
          <SideNav.Item>
            <SideNav.Link>
              <LightbulbIcon size={20} /> 아이디어 관리
            </SideNav.Link>
          </SideNav.Item>
          <SideNav.Item>
            <SideNav.Link>
              <FileIcon size={20} /> 프로젝트 관리
            </SideNav.Link>
          </SideNav.Item>
          <SideNav.Item onClick={handleClick}>
            <SideNav.Link>
              <CalendarIcon size={20} /> 기간 설정
            </SideNav.Link>
            <SideNav.Item.RightArea>
              <ChevronRightOutlineIcon
                style={{
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                  transition: 'transform 0.1s ease-in-out',
                }}
              />
            </SideNav.Item.RightArea>
          </SideNav.Item>
          {isOpen && (
            <div>
              <SideNav.Item>
                <SideNav.Link>
                  <CalendarIcon size={20} style={{ opacity: 0 }} /> 팀 빌딩
                </SideNav.Link>
              </SideNav.Item>
              <SideNav.Item>
                <SideNav.Link>
                  <CalendarIcon size={20} style={{ opacity: 0 }} /> 리크루트
                </SideNav.Link>
              </SideNav.Item>
            </div>
          )}
        </SideNav.Group>
      </SideNav.List>
      <Button color="secondary" icon={OutOutlineIcon} className={styles.button} onClick={handleButtonClick}>
        유니브 사이트로 이동
      </Button>
    </SideNav>
  );
};
