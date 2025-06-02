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
import { useEffect, useState } from 'react';
import { fetchUnivDetailAPI, updateUnivAPI } from '../../../../api/admin';

interface UnivUpdateModalProps {
  isOpen: boolean;
  toggle: () => void;
  univId: number | null;
  onSuccess: () => void;
}

export default function UnivUpdateModal({ isOpen, toggle, univId, onSuccess }: UnivUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    instagram_url: '',
  });

  const hasChanged = form.name !== '' && form.instagram_url !== '';

  // 상세 조회
  // TODO : 유니브 대표 추가 필요
  const fetchUnivInfo = async () => {
    if (!univId) return;
    try {
      const res = await fetchUnivDetailAPI(univId);
      setForm({
        name: res.data.name,
        instagram_url: res.data.instagram_url,
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
      // TODO : 유니브 대표 추가 필요
      const res = await updateUnivAPI(univId, form.name, form.instagram_url);
      console.log(res);
      onSuccess();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

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
            value={form.instagram_url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, instagram_url: e.target.value })}
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
                {/* TODO : 리더 내용 추가 필요 */}
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
        <Button size="lg" color="primary" disabled={!hasChanged} onClick={handleUpdateUniv}>
          수정 완료
        </Button>
      </ModalFooter>
    </Modal>
  );
}
