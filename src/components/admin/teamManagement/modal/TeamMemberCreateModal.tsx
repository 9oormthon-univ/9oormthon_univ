import { Modal, ModalHeader, ModalBody, Text, Button, ModalFooter, Input, Radio } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './teamMemberCreateModal.module.scss';
import { useState } from 'react';

interface TeamMemberCreateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function TeamMemberCreateModal({ isOpen, toggle }: TeamMemberCreateModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('PM');

  const isDisabled = name === '' || role === '';

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          팀원 추가하기
        </Text>
      </ModalHeader>
      <ModalBody className={styles.modalBody}>
        <FormField label="팀원 이름" required>
          <Input
            size="lg"
            placeholder="미르미 검색"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </FormField>
        <FormField label="파트 선택" required>
          <div className={styles.radioGroup}>
            <Radio label="기획" id="PM" name="role" checked={role === 'PM'} onChange={() => setRole('PM')} />
            <Radio label="디자인" id="PD" name="role" checked={role === 'PD'} onChange={() => setRole('PD')} />
            <Radio label="프론트엔드" id="FE" name="role" checked={role === 'FE'} onChange={() => setRole('FE')} />
            <Radio label="백엔드" id="BE" name="role" checked={role === 'BE'} onChange={() => setRole('BE')} />
          </div>
        </FormField>
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" disabled={isDisabled}>
          팀원 추가하기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
