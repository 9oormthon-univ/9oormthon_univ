import { ModalBody, ModalHeader, Text, Input, ModalFooter, Button, Modal } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './univUpdateModal.module.scss';
import { useEffect, useState } from 'react';
import { fetchUnivDetailAPI, updateUnivAPI } from '../../../../api/admin/univs';
import SearchDropdown from '../../../common/searchDropdown/SearchDropdown';
import { fetchUserListAPI } from '../../../../api/admin/users';
import { GENERATION } from '../../../../constants/common';
import { User } from '../../../../types/admin/member';

interface UnivUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  univId: number | null;
  onSuccess: () => void;
}

export default function UnivUpdateModal({ isOpen, toggle, univId, onSuccess }: UnivUpdateModalProps) {
  const [form, setForm] = useState({
    name: '',
    instagram_url: '',
    leader_id: null as number | null,
  });

  const [representatives, setRepresentatives] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasChanged = form.name !== '' && form.instagram_url !== '';

  // 상세 조회
  const fetchUnivInfo = async () => {
    if (!univId) return;
    try {
      const res = await fetchUnivDetailAPI(univId);
      setForm({
        name: res.data.name,
        instagram_url: res.data.instagram_url,
        leader_id: res.data.leader.id || null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (univId) {
      fetchUnivInfo();
    }
  }, [univId]);

  // 유니브 정보 수정
  const handleUpdateUniv = async () => {
    try {
      if (!univId) return;
      const res = await updateUnivAPI(univId, form.name, form.instagram_url, form.leader_id || undefined);
      console.log(res);
      onSuccess();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  // 대표자 선택 핸들러
  const handleRepresentativeSelect = (item: User) => {
    setForm((prev) => ({
      ...prev,
      leader_id: item.id,
    }));
  };

  // 대표자 검색 핸들러
  const handleSearch = async (searchTerm: string) => {
    if (!univId) return;

    setIsLoading(true);
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
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 특정 유니브 미르미 조회
  const fetchUserList = async () => {
    if (!univId) return;
    const res = await fetchUserListAPI(GENERATION, univId);
    setRepresentatives(res.data.users);
  };

  // 최초 1회만 유니브 미르미 조회
  useEffect(() => {
    fetchUserList();
  }, []);

  // 현재 선택된 대표자 찾기
  const selectedRepresentative = form.leader_id
    ? representatives.find((rep) => Number(rep.id) === form.leader_id)
    : null;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading5" as="p">
          유니브 정보 수정
        </Text>
      </ModalHeader>
      <ModalBody className={styles.modalBody}>
        <FormField label="유니브 명" required={true}>
          <Input
            bsSize="lg"
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
            placeholder="유니브 명을 입력해주세요."
          />
        </FormField>
        <FormField label="소개 링크" required={true}>
          <Input
            bsSize="lg"
            value={form.instagram_url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, instagram_url: e.target.value })}
            placeholder="소개 링크를 입력해주세요."
          />
        </FormField>
        <FormField label="유니브 대표" required={false}>
          <SearchDropdown
            items={representatives}
            selectedItem={selectedRepresentative}
            onSelect={handleRepresentativeSelect}
            onSearch={handleSearch}
            inPlaceholder="유니브 대표를 검색해주세요"
            outPlaceholder="해당 유니브 대표를 선택해주세요"
            disabled={isLoading}
          />
        </FormField>
      </ModalBody>
      <ModalFooter>
        <Button
          size="lg"
          color="secondary"
          onClick={() => {
            toggle();
          }}>
          취소
        </Button>
        <Button size="lg" color="primary" disabled={!hasChanged} onClick={handleUpdateUniv}>
          수정 완료
        </Button>
      </ModalFooter>
    </Modal>
  );
}
