import { Nav, NavItem, NavLink } from '@goorm-dev/vapor-components';

import styles from './styles.module.scss';

interface IdeaDetailTabProps {
  activeTab: 'basic' | 'team';
  setActiveTab: (tab: 'basic' | 'team') => void;
}

export default function IdeaDetailTab({ activeTab, setActiveTab }: IdeaDetailTabProps) {
  const handleTabClick = (tab: 'basic' | 'team') => {
    setActiveTab(tab);
  };

  return (
    <Nav fill tabs>
      <NavItem active={activeTab === 'basic'} onClick={() => handleTabClick('basic')}>
        <NavLink className={activeTab === 'basic' ? styles.active : styles.tabLink}>기본 정보</NavLink>
      </NavItem>
      <NavItem active={activeTab === 'team'} onClick={() => handleTabClick('team')}>
        <NavLink className={activeTab === 'team' ? styles.active : styles.tabLink}>팀원 정보</NavLink>
      </NavItem>
    </Nav>
  );
}
