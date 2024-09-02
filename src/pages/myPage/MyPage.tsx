import MyPageBasicInfo from '../../components/myPage/myPageBasicInfo/MyPageBasicInfo';
import MyPageDetailedInfo from '../../components/myPage/myPageDetailedInfo/MyPageDetailedInfo';
import MyPageProject from '../../components/myPage/myPageProject/MyPageProject';
import styles from './styles.module.scss';
import { Text, Button } from '@goorm-dev/vapor-components';
import { useState, useEffect } from 'react';
import exampleImg from '../../assets/images/activity_9oorm.png';

interface Project {
  title: string;
  season: string;
  hackathon: string;
  image: string;
}

interface UserData {
  name: string;
  email: string;
  university: string;
  selections: { selectedSeason: string; selectedPart: string }[];
}

export default function MyPage() {
  const [isBasicInfoChanged, setIsBasicInfoChanged] = useState(false);
  const [isDetailedInfoChanged, setIsDetailedInfoChanged] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // API 호출
  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects'); // 예시 API 엔드포인트
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const dummyUserData: UserData = {
    name: '이자민',
    email: 'jamin@example.com',
    university: '한성대학교',
    selections: [{ selectedSeason: '3기', selectedPart: '프론트엔드' }],
  };

  const dummyProjects: Project[] = [
    {
      title: '프로젝트 A',
      season: '3기',
      hackathon: '단풍톤',
      image: exampleImg,
    },
    {
      title: '프로젝트 B',
      season: '2기',
      hackathon: '벚꽃톤',
      image: exampleImg,
    },
    {
      title: '프로젝트 C',
      season: '1기',
      hackathon: '단풍톤',
      image: exampleImg,
    },
  ];

  useEffect(() => {
    setUserData(dummyUserData);
    setProjects(dummyProjects);
    // fetchProjects();
  }, []);

  const handleSave = () => {
    // 변경사항 저장
    console.log('변경사항 저장');
  };
  const isSaveEnabled = isBasicInfoChanged || isDetailedInfoChanged;
  return (
    <div className={styles.MyPageContainer}>
      <div className={styles.myPageHeader}>
        <Text typography="heading3" color="gray-900">
          마이 페이지
        </Text>
        <Button color="link" size="sm">
          로그아웃
        </Button>
      </div>
      <hr className={styles.divider} />
      {userData && (
        <>
          <MyPageBasicInfo
            onInfoChange={setIsBasicInfoChanged}
            initialName={userData.name}
            initialEmail={userData.email}
          />
          <MyPageDetailedInfo
            onInfoChange={setIsDetailedInfoChanged}
            initialUniv={userData.university}
            initialSelections={userData.selections}
          />
        </>
      )}
      <MyPageProject projects={projects} />
      <Button className={styles.confirmBtn} size="lg" onClick={handleSave} disabled={!isSaveEnabled}>
        변경사항 저장
      </Button>
    </div>
  );
}
