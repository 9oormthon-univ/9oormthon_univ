import styles from './styles.module.scss';
import { Button, Text } from '@goorm-dev/vapor-components';
import { ImageIcon, MailIcon, SchoolIcon } from '@goorm-dev/vapor-icons';
import SearchDropdown from '../../components/common/dropdown/SearchDropdown';

import FormLinkInput from '../../components/hackathon/ideaForm/FormLinkInput';
import notFound from '../../assets/images/notfound.png';
import { useEffect, useRef, useState } from 'react';
import { useS3Upload } from '../../hooks/useS3Upload';
import { getMyInfo, updateUserInfo } from '../../api/users';
import { useNavigate } from 'react-router-dom';
import { LinkType } from '../../constants/linkType';
import useAuthStore from '../../store/useAuthStore';
import MyPageSkeleton from '../../components/myPage/skeletonLoading/MyPageSkeleton';
import { STACKS_WITH_NAMES } from '@/constants/Stacks';
import FormField from '@/components/common/formField/FormField';
import Editor from '../../components/common/input/Editor';

export default function MyPageEdit() {
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    univ: '',
    email: '',
    img_url: '',
    introduction: '',
    stacks: [] as string[],
    links: [] as { id: number; linkType: LinkType | null; url: string }[],
  });
  const [imgPreview, setImgPreview] = useState<string | null>(null); // 미리보기 이미지
  const [imgFile, setImgFile] = useState<File | null>(null); // 선택된 파일
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 요소 참조
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { uploadToS3 } = useS3Upload();
  const navigate = useNavigate();
  const { updateProfileImage } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 기존 유저 정보 불러오기
  useEffect(() => {
    setIsLoading(true);
    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo();
        const data = response.data;

        setUserInfo({
          id: data.id,
          name: data.name,
          univ: data.univ,
          email: data.email,
          img_url: data.img_url || '',
          introduction: data.introduction ?? '',
          stacks: data.stacks ?? [],
          links: data.links
            ? data.links.map((link: { type: LinkType; url: string }, index: number) => ({
                id: index + 1,
                linkType: link.type,
                url: link.url,
              }))
            : [],
        });

        setImgPreview(data.img_url || notFound);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  // 프로필 수정 클릭 시 파일 업로드 창 열기
  const handleProfileEditClick = () => {
    fileInputRef.current?.click();
  };

  // 최종 저장 버튼 클릭 시
  const handleSubmit = async () => {
    try {
      // 링크 유효성 검사
      let hasError = false;

      if (userInfo.links.some((link) => !link.linkType)) {
        setErrorMessage('링크 종류를 선택해주세요.');
        hasError = true;
      } else if (userInfo.links.some((link) => !link.url)) {
        setErrorMessage('링크를 입력해주세요.');
        hasError = true;
      } else if (userInfo.links.some((link) => !link.url.startsWith('https://') && !link.url.startsWith('http://'))) {
        setErrorMessage('유효한 URL을 입력해주세요.');
        hasError = true;
      }

      if (hasError) {
        return;
      }

      let uploadedImageUrl = userInfo.img_url || null;

      if (imgFile) {
        uploadedImageUrl = await uploadToS3(imgFile);
      }

      // 아이디 값 제외
      const filteredLinks = userInfo.links.map(({ linkType, url }) => ({
        type: linkType!,
        url,
      }));

      const updatedData = {
        img_url: uploadedImageUrl || '',
        introduction: userInfo.introduction,
        stacks: userInfo.stacks,
        links: filteredLinks,
      };

      await updateUserInfo(updatedData);
      updateProfileImage(uploadedImageUrl);
      navigate('/my-page');
    } catch (error: any) {
      if (error.response.data.error.code === 40011) {
        setErrorMessage('자기소개는 필수로 입력해야 합니다.');
      } else {
        setErrorMessage('프로필 수정에 실패했습니다.');
      }
    }
  };

  const updateLinks = (newLinks: { id: number; linkType: LinkType | null; url: string }[]) => {
    setUserInfo({ ...userInfo, links: newLinks });
  };

  const handleIntroductionChange = (value: string) => {
    setUserInfo({ ...userInfo, introduction: value });
  };

  return isLoading ? (
    <div className={styles.editContainer}>
      <MyPageSkeleton />
    </div>
  ) : (
    <div className={styles.editContainer}>
      <Text typography="heading3" color="gray-900">
        내 정보 수정
      </Text>

      <hr className={styles.hr} />
      <div className={styles.editFormContainer}>
        <div className={styles.editForm}>
          <div className={styles.editFormHeader}>
            <div className={styles.editFormHeaderLeft}>
              <div className={styles.profileImgContainer}>
                <img src={imgPreview || notFound} alt="profile" />
              </div>
              <Button color="secondary" size="md" icon={ImageIcon} outline onClick={handleProfileEditClick}>
                프로필 수정
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className={styles.editFormHeaderRight}>
              <div className={styles.profileName}>
                <Text as="h6" typography="heading6" color="text-normal">
                  {userInfo.name || '이름 없음'}
                </Text>
                <div className={styles.profileEmailUniv}>
                  <div className={styles.profileEmailUnivItem}>
                    <MailIcon />
                    <Text as="p" typography="body2" color="text-alternative">
                      {userInfo.email || '이메일 없음'}
                    </Text>
                  </div>
                  <div className={styles.profileEmailUnivItem}>
                    <SchoolIcon />
                    <Text as="p" typography="body2" color="text-alternative">
                      {userInfo.univ || '학교 없음'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.editFormBody}>
            <Text as="h6" typography="heading6" color="text-normal">
              세부 정보
            </Text>
            <FormField label="자기소개" required>
              <Editor
                value={userInfo.introduction}
                onChange={handleIntroductionChange}
                placeholder="자기소개를 입력해주세요."
              />
            </FormField>
            <FormLinkInput
              links={userInfo.links}
              setLinks={updateLinks}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
            <FormField label="기술 스택">
              <SearchDropdown
                multiple
                items={STACKS_WITH_NAMES.map((stack) => ({ id: stack.id, label: stack.name }))}
                selectedIds={userInfo.stacks || []}
                onChange={(val) => setUserInfo({ ...userInfo, stacks: val as string[] })}
                inPlaceholder="기술 스택을 검색해주세요"
                outPlaceholder="기술 스택을 선택해주세요"
              />
            </FormField>
          </div>
        </div>
        <Button size="xl" onClick={handleSubmit}>
          변경사항 저장
        </Button>
      </div>
    </div>
  );
}
