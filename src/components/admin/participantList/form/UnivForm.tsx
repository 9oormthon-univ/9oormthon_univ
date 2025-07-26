import FormField from '../../../common/formField/FormField';
import { Input } from '@goorm-dev/vapor-components';
import SearchDropdown from '../../../common/searchDropdown/SearchDropdown';
import styles from './form.module.scss';
import type { UnivFormPayload } from '../../../../types/admin/univ';
import { fetchUserListAPI } from '../../../../api/admin/users';
import { GENERATION } from '../../../../constants/common';
import { User } from '../../../../types/admin/member';
import { useEffect, useState } from 'react';

interface UnivFormProps {
  mode: 'create' | 'update';
  form?: UnivFormPayload;
  onChange?: <K extends keyof UnivFormPayload>(field: K, value: UnivFormPayload[K]) => void;
  univId?: number | null;
}

export default function UnivForm({ mode, form, onChange, univId }: UnivFormProps) {
  const [representatives, setRepresentatives] = useState<User[]>([]);
  const [localForm, setLocalForm] = useState<UnivFormPayload>(
    form ?? { name: '', instagram_url: '', leader_id: undefined },
  );

  useEffect(() => {
    if (form) {
      setLocalForm(form);
    }
  }, [form]);

  // 특정 유니브 미르미 조회
  const fetchUserList = async () => {
    if (!univId) return;
    const res = await fetchUserListAPI(GENERATION, univId);
    setRepresentatives(res.data.users);
  };

  // 최초 1회만 유니브 미르미 조회
  useEffect(() => {
    if (mode === 'update') {
      fetchUserList();
    }
  }, [univId]);

  // 대표자 검색 핸들러
  const handleSearch = async (searchTerm: string) => {
    if (!univId) return;

    try {
      const trimmed = searchTerm.trim();
      const res = await fetchUserListAPI(GENERATION, univId, trimmed === '' ? undefined : trimmed);
      setRepresentatives(
        res.data.users.map((user: User) => ({
          id: user.id,
          description: user.description,
        })),
      );
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.univFormContainer}>
      <FormField label="유니브 명" required={true}>
        <Input
          size="lg"
          value={localForm.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const updated = { ...localForm, name: e.target.value };
            setLocalForm(updated);
            onChange?.('name', updated.name);
          }}
          placeholder="유니브 명을 입력해주세요"
        />
      </FormField>
      <FormField label="소개 링크" required={true}>
        <Input
          size="lg"
          value={localForm.instagram_url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const updated = { ...localForm, instagram_url: e.target.value };
            setLocalForm(updated);
            onChange?.('instagram_url', updated.instagram_url);
          }}
          placeholder="소개 링크를 입력해주세요"
        />
      </FormField>
      {mode === 'update' && (
        <FormField label="유니브 대표" required={false}>
          <SearchDropdown
            items={representatives}
            selectedItem={representatives.find((representative) => representative.id === localForm.leader_id) ?? null}
            onSelect={(item) => {
              const updated = { ...localForm, leader_id: item.id };
              setLocalForm(updated);
              onChange?.('leader_id', updated.leader_id);
            }}
            onSearch={handleSearch}
            inPlaceholder="유니브 대표를 검색해주세요"
            outPlaceholder="해당 유니브 대표를 선택해주세요"
          />
        </FormField>
      )}
    </div>
  );
}
