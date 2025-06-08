import { Avatar, Button } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import { Input } from '@goorm-dev/vapor-components';
import UnivSearchDropdown from '../modal/dropdown/UnivSearchDropdown';
import GenerationSelectDropdown from '../modal/dropdown/GenerationSelectDropdown';
import styles from './form.module.scss';
import { ImageIcon } from '@goorm-dev/vapor-icons';
import { useEffect, useRef, useState } from 'react';
import { Univ } from '../../../../types/admin/univ';
import { fetchUnivListAPI } from '../../../../api/admin/univs';
import { GENERATION } from '../../../../constants/common';
import { UserForm } from '../../../../types/admin/member';

interface MemberFormProps {
  showProfileEdit?: boolean;
  member?: UserForm;
  onChange?: <K extends keyof UserForm>(field: K, value: UserForm[K]) => void;
}

export default function MemberForm({ showProfileEdit, member, onChange }: MemberFormProps) {
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 학교 리스트 조회
  useEffect(() => {
    const fetchUnivList = async () => {
      const res = await fetchUnivListAPI(GENERATION);
      setUnivList(res.data.univs);
    };
    fetchUnivList();
  }, []);

  // 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImgPreview(fileUrl);
      onChange?.('img_url', fileUrl);
    }
  };

  // 프로필 수정 클릭 시 파일 업로드 창 열기
  const handleProfileEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.modalBody}>
      {member?.img_url ? (
        <div className={styles.profileImgContainer}>
          <img src={imgPreview || member?.img_url} alt="profile" />
        </div>
      ) : (
        <Avatar name={member?.name || 'Goorm'} />
      )}
      <div className={styles.memberContainer}>
        {showProfileEdit && (
          <>
            <Button
              size="md"
              color="secondary"
              onClick={handleProfileEditClick}
              icon={ImageIcon}
              outline
              className={styles.iconButton}>
              프로필 수정
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </>
        )}
        <FormField label="이름" required>
          <Input
            size="lg"
            placeholder="이름을 입력해주세요"
            value={member?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.('name', e.target.value)}
          />
        </FormField>
        <FormField label="학교" required>
          <UnivSearchDropdown
            value={univList.find((univ) => univ.id === member?.univ_id)?.name ?? ''}
            onChange={(univ) => onChange?.('univ_id', univ.id)}
            univList={univList}
          />
        </FormField>
        <FormField label="이메일" required>
          <Input
            size="lg"
            placeholder="이메일을 입력해주세요"
            value={member?.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.('email', e.target.value)}
          />
        </FormField>
        <FormField label="전화번호" required>
          <Input
            size="lg"
            placeholder="-빼고 입력해주세요"
            value={member?.phone_number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.('phone_number', e.target.value)}
          />
        </FormField>
        <FormField label="참여 기수" required>
          <GenerationSelectDropdown
            value={member?.generations || []}
            onChange={(generations) => onChange?.('generations', generations)}
          />
        </FormField>
      </div>
    </div>
  );
}
