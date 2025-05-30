import {
  ModalBody,
  ModalHeader,
  Text,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalFooter,
  Button,
  Modal,
} from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import styles from './univUpdateModal.module.scss';
import { useState } from 'react';

interface UnivUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function UnivUpdateModal({ isOpen, toggle }: UnivUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    link: '',
  });

  const hasChanged = form.name !== '' && form.link !== '';

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
          />
        </FormField>
        <FormField label="소개 링크" required={true}>
          <Input
            bsSize="lg"
            value={form.link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, link: e.target.value })}
          />
        </FormField>
        <FormField label="유니브 대표" required={false}>
          <Dropdown size="lg" isOpen={open} toggle={() => setOpen(!open)}>
            <DropdownToggle caret color="select" className={styles.dropdownToggle}>
              <Text typography="body2" as="p" color="text-hint">
                해당 유니브 대표를 선택해주세요.
              </Text>
            </DropdownToggle>
            <DropdownMenu className={styles.dropdownMenu}>
              <DropdownItem header>이름/학교명</DropdownItem>
              <DropdownItem>
                <Text typography="body2" as="p">
                  김구름/구름대학교/010-1234-1234
                </Text>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
        <Button size="lg" color="primary" disabled={!hasChanged}>
          수정 완료
        </Button>
      </ModalFooter>
    </Modal>
  );
}
