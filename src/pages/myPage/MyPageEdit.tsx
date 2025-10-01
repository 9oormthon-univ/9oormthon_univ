import styles from './styles.module.scss';
import { Button, Text, toast } from '@goorm-dev/vapor-components';
import { ImageIcon, MailIcon, SchoolIcon } from '@goorm-dev/vapor-icons';
import SearchDropdown from '@/components/common/dropdown/SearchDropdown';
import FormLinkInput from '@/components/hackathon/ideaForm/FormLinkInput';
import notFound from '@/assets/images/notfound.png';
import { useEffect, useRef, useState } from 'react';
import { useS3Upload } from '@/hooks/useS3Upload';
import { useNavigate } from 'react-router-dom';
import { LinkType } from '@/constants/linkType';
import MyPageSkeleton from '@/components/myPage/skeletonLoading/MyPageSkeleton';
import { STACKS_WITH_NAMES } from '@/constants/Stacks';
import FormField from '@/components/common/formField/FormField';
import Editor from '@/components/common/input/Editor';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { useUpdateUserInfoMutation } from '@/hooks/mutations/useUserMutations';
import { useQueryClient } from '@tanstack/react-query';

export default function MyPageEdit() {
  const { data: rawUserInfo, isLoading } = useUserInfo();

  const [imgPreview, setImgPreview] = useState<string | null>(null); // 미리보기 이미지
  const [imgFile, setImgFile] = useState<File | null>(null); // 선택된 파일
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 요소 참조
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { uploadToS3 } = useS3Upload();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateUserInfo } = useUpdateUserInfoMutation();

  const [editableUser, setEditableUser] = useState<{
    introduction: string;
    stacks: string[];
    links: { tempId: number; type: LinkType | null; url: string }[];
    name?: string;
    email?: string;
    univ?: string;
    img_url?: string;
  } | null>(null);

  useEffect(() => {
    if (rawUserInfo) {
      setEditableUser({
        introduction: rawUserInfo.introduction ?? '',
        stacks: rawUserInfo.stacks ?? [],
        links:
          rawUserInfo.links?.map((link, idx) => ({
            tempId: idx + 1,
            type: link.type,
            url: link.url,
          })) ?? [],
        name: rawUserInfo.name,
        email: rawUserInfo.email,
        univ: rawUserInfo.univ,
        img_url: rawUserInfo.img_url,
      });
    }
  }, [rawUserInfo]);

  // 페이지 이동 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setImgPreview(editableUser?.img_url || notFound);
  }, [editableUser]);

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
    // 링크 유효성 검사
    let hasError = false;

    if (editableUser?.links?.some((link) => !link.type)) {
      setErrorMessage('링크 종류를 선택해주세요.');
      hasError = true;
    } else if (editableUser?.links?.some((link) => !link.url)) {
      setErrorMessage('링크를 입력해주세요.');
      hasError = true;
    } else if (
      editableUser?.links?.some((link) => !link.url.startsWith('https://') && !link.url.startsWith('http://'))
    ) {
      setErrorMessage('유효한 URL을 입력해주세요.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    let uploadedImageUrl = editableUser?.img_url || null;

    if (imgFile) {
      uploadedImageUrl = await uploadToS3(imgFile);
    }

    const updatedData = {
      img_url: uploadedImageUrl || '',
      introduction: editableUser?.introduction ?? '',
      stacks: editableUser?.stacks ?? [],
      links: editableUser?.links?.map(({ type, url }) => ({ type: type as LinkType, url })) ?? [],
    };

    updateUserInfo(updatedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate('/my-page');
        toast('프로필 수정이 완료되었습니다.', { type: 'primary' });
      },
      onError: (error: any) => {
        const serverCode = error?.response?.data?.error?.code;
        if (serverCode === 40011) {
          setErrorMessage('자기소개는 필수로 입력해야 합니다.');
        } else {
          setErrorMessage('프로필 수정에 실패했습니다.');
        }
      },
    });
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
                  {editableUser?.name || '이름 없음'}
                </Text>
                <div className={styles.profileEmailUniv}>
                  <div className={styles.profileEmailUnivItem}>
                    <MailIcon />
                    <Text as="p" typography="body2" color="text-alternative">
                      {editableUser?.email || '이메일 없음'}
                    </Text>
                  </div>
                  <div className={styles.profileEmailUnivItem}>
                    <SchoolIcon />
                    <Text as="p" typography="body2" color="text-alternative">
                      {editableUser?.univ || '학교 없음'}
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
                value={editableUser?.introduction ?? ''}
                onChange={(val) => setEditableUser((prev) => (prev ? { ...prev, introduction: val } : prev))}
                placeholder="자기소개를 입력해주세요."
              />
            </FormField>
            <FormField label="링크">
              <FormLinkInput
                links={editableUser?.links ?? []}
                setLinks={(newLinks) => setEditableUser((prev) => (prev ? { ...prev, links: newLinks } : prev))}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </FormField>

            <FormField label="기술 스택">
              <SearchDropdown
                multiple
                items={STACKS_WITH_NAMES.map((stack) => ({ id: stack.id, label: stack.name }))}
                selectedIds={editableUser?.stacks || []}
                onChange={(val) => setEditableUser((prev) => (prev ? { ...prev, stacks: val as string[] } : prev))}
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
