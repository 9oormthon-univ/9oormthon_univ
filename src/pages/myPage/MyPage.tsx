import styles from './styles.module.scss';
import MDEditor from '@uiw/react-md-editor';
import StackItem from '../../components/hackathon/common/team/StackItem';
import { MyPageHeader } from '../../components/myPage/MyPageHeader';
// import { MyPageProject } from '../../components/myPage/MyPageProject';
import { Text } from '@goorm-dev/vapor-components';
import { LinkType } from '../../constants/linkType';
import { getMyInfo, getUserInfo } from '../../api/users';
import { getMockMyInfo, getMockUserInfo } from '../../utilities/mockUtils';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyPageSkeleton from '../../components/myPage/skeletonLoading/MyPageSkeleton';

interface UserInfo {
  name: string;
  email: string;
  univ: string;
  img_url: string;
  introduction?: string;
  stacks?: string[];
  links?: {
    type: LinkType;
    url: string;
  }[];
  is_me: boolean;
}

export default function MyPage() {
  const { user_id } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 유저 / 내 정보 조회 구분
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        if (import.meta.env.DEV) {
          // 개발 환경에서는 목업 데이터 사용
          const response = user_id ? await getMockUserInfo(user_id) : await getMockMyInfo();
          setUserInfo(response.data);
        } else {
          // 프로덕션 환경에서는 실제 API 호출
          const response = user_id ? await getUserInfo(user_id) : await getMyInfo();
          setUserInfo(response.data);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.log(error);
        }
        setUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [user_id]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <MyPageSkeleton />
      ) : (
        <>
          <MyPageHeader
            name={userInfo?.name ?? ''}
            email={userInfo?.email ?? ''}
            univ={userInfo?.univ ?? ''}
            img_url={userInfo?.img_url ?? ''}
            links={userInfo?.links ?? []}
            stack={userInfo?.stacks ?? []}
            is_me={userInfo?.is_me ?? false}
          />
          <div className={styles.content} data-color-mode="light">
            {!userInfo?.introduction && (!userInfo?.stacks || userInfo.stacks.length === 0) ? (
              <div className={styles.emptyContent}>
                <Text typography="body2" color="text-hint">
                  소개가 없습니다.
                </Text>
              </div>
            ) : (
              <>
                <div className={styles.contentIntroduce}>
                  <Text typography="subtitle1" color="text-hint">
                    자기소개
                  </Text>
                  <MDEditor.Markdown source={userInfo?.introduction ?? ''} />
                </div>
                <div className={styles.contentStack}>
                  <Text typography="subtitle1" color="text-hint">
                    기술 스택
                  </Text>
                  <div className={styles.contentStackContainer}>
                    {userInfo?.stacks?.map((skill: string, index: number) => (
                      <StackItem key={index} skill={skill} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* <div className={styles.contentProject}>
            <Text as="h6" typography="heading6" color="text-normal">
              나의 프로젝트
            </Text>
            <MyPageProject />
          </div> */}
        </>
      )}
    </div>
  );
}
