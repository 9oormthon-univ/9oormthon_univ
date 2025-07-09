import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter, Radio, toast } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './teamMemberCreateModal.module.scss';
import { useEffect, useState } from 'react';
import { addTeamMemberAPI } from '../../../../api/admin/teams';
import { useParams } from 'react-router-dom';
import { PositionKey, POSITIONS } from '../../../../constants/position';
import SearchDropdown from '../../../common/searchDropdown/SearchDropdown';
import { fetchUserListAPI } from '../../../../api/admin/users';
import { GENERATION } from '../../../../constants/common';
import { User } from '../../../../types/admin/member';

interface TeamMemberCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
  onUpdate: () => void;
}

export default function TeamMemberCreateModal({ isOpen, toggle, onUpdate }: TeamMemberCreateModalProps) {
  const [role, setRole] = useState<PositionKey | null>(null);
  const [userList, setUserList] = useState<{ id: number; description: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: number; description: string } | null>(null);
  const isDisabled = role === null || selectedUser === null;

  const { team_id } = useParams();

  // 팀원 추가
  const handleSubmit = async () => {
    if (!team_id) return;

    try {
      await addTeamMemberAPI(Number(team_id), selectedUser?.id ?? 0, role as PositionKey);
      toast('성공적으로 팀원을 추가하였습니다.', {
        type: 'primary',
      });
      setRole(null);
      setSelectedUser(null);
      toggle();
      onUpdate();
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || '알 수 없는 오류가 발생했습니다.';
      toast(message, {
        type: 'danger',
      });
    }
  };

  // 유저 검색을 위한 전체 조회
  useEffect(() => {
    const fetchUserList = async () => {
      const res = await fetchUserListAPI(GENERATION);
      const formatted = res.data.users.map((user: User) => ({
        id: user.id,
        description: user.description,
      }));
      setUserList(formatted);
    };
    fetchUserList();
  }, []);

  // 모달이 열릴 때마다 입력값 리셋
  useEffect(() => {
    if (isOpen) {
      setRole(null);
      setSelectedUser(null);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          팀원 추가하기
        </Text>
      </ModalHeader>
      <ModalBody className={styles.modalBody}>
        <FormField label="팀원 이름" required>
          <SearchDropdown
            items={userList}
            selectedItem={selectedUser}
            onSelect={(user) => setSelectedUser(user)}
            onSearch={(keyword) => {
              setUserList(userList.filter((user) => user.description.includes(keyword)));
            }}
            inPlaceholder="미르미 검색"
            outPlaceholder="팀원을 검색해주세요"
          />
        </FormField>
        <FormField label="파트 선택" required>
          <div className={styles.radioGroup}>
            {Object.values(POSITIONS)
              .sort((a, b) => a.index - b.index)
              .map((position) => (
                <Radio
                  key={position.key}
                  label={position.name}
                  id={position.key}
                  name="role"
                  checked={role === position.key}
                  onChange={() => setRole(position.key)}
                />
              ))}
          </div>
        </FormField>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" disabled={isDisabled} onClick={handleSubmit}>
          팀원 추가하기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
