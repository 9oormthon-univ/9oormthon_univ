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
import { Member, MemberUpdateForm } from '../../../../types/admin/member';

interface MemberFormProps {
  showProfileEdit?: boolean;
  member?: Member;
  onChange?: <K extends keyof MemberUpdateForm>(field: K, value: MemberUpdateForm[K]) => void;
}

export default function MemberForm({ showProfileEdit, member, onChange }: MemberFormProps) {
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
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
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
    console.log(file);
    // 추후 데이터로 넘어갈 예정
    console.log(imgFile);
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
            bsSize="lg"
            placeholder="이름을 입력해주세요"
            value={member?.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.('name', e.target.value)}
          />
        </FormField>
        <FormField label="학교" required>
          <UnivSearchDropdown
            value={member?.univ?.name || ''}
            onChange={(univ) => onChange?.('univ_id', univ.id)}
            univList={univList}
          />
        </FormField>
        <FormField label="이메일" required>
          <Input
            bsSize="lg"
            placeholder="이메일을 입력해주세요"
            value={member?.email || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.('email', e.target.value)}
          />
        </FormField>
        <FormField label="전화번호" required>
          <Input
            bsSize="lg"
            placeholder="000-0000-0000"
            value={member?.phone_number || ''}
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
