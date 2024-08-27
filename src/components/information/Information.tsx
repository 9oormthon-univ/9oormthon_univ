import styles from './information.module.scss';
import { BackPageIcon, PlusIcon } from '@goorm-dev/gds-icons';
import {
  Text,
  Input,
  Button,
  Checkbox,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '@goorm-dev/vapor-components';
import { useState } from 'react';

export default function information() {
  const [openSeason, setOpenSeason] = useState(false);
  const [openPart, setOpenPart] = useState(false);
  const toggleSeason = () => setOpenSeason((prev) => !prev);
  const togglePart = () => setOpenPart((prev) => !prev);

  return (
    <div className={styles.informationContainer}>
      <div className={styles.informationHeader}>
        <Button icon={BackPageIcon} color="link"></Button>
        <Text typography="heading3" color="gray-900">
          정보 입력
        </Text>
      </div>
      <hr className={styles.divider} />
      <div className={styles.inputContainer}>
        <div className={styles.inputContent}>
          <div className={styles.inputTitle}>
            <Text color="text-alternative">이름</Text>
            <Text color="red-500">*</Text>
          </div>
          <Input size="lg"></Input>
        </div>
        <div className={styles.inputContent}>
          <div className={styles.inputTitle}>
            <Text color="text-alternative">소속 유니브</Text>
            <Text color="red-500">*</Text>
          </div>
          <Input size="lg"></Input>
        </div>
        <div className={styles.seasonPartContainer}>
          <div className={styles.inputRow}>
            <div className={styles.inputContent}>
              <div className={styles.inputTitle}>
                <Text color="text-alternative">기수</Text>
                <Text color="red-500">*</Text>
              </div>
              <Dropdown isOpen={openSeason} toggle={toggleSeason} direction="down">
                <DropdownToggle className={styles.toggleStyle} caret size="lg" color="hint">
                  선택
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>3기</DropdownItem>
                  <DropdownItem>2기</DropdownItem>
                  <DropdownItem>1기</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className={styles.inputContent}>
              <div className={styles.inputTitle}>
                <Text color="text-alternative">파트</Text>
                <Text color="red-500">*</Text>
              </div>
              <Dropdown isOpen={openPart} toggle={togglePart} direction="down">
                <DropdownToggle className={styles.toggleStyle} caret size="lg" color="hint">
                  선택
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>기획</DropdownItem>
                  <DropdownItem>디자인</DropdownItem>
                  <DropdownItem>프론트엔드</DropdownItem>
                  <DropdownItem>백엔드</DropdownItem>
                  <DropdownItem>AI</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Button icon={PlusIcon} block color="link" size="lg" disabled={false}>
            기수/파트 추가
          </Button>
        </div>
        <div className={styles.checkBoxStyle}>
          <div className={styles.checkBoxTitle}>
            <Checkbox>
              <Text typography="body2" fontWeight="regular" color="gray-900">
                새 기능, 이벤트 홍보, 대회 안내 등의 알림 수신
              </Text>
            </Checkbox>
            <Text typography="subtitle2" color="text-hint" fontWeight="medium">
              (선택)
            </Text>
          </div>
          <Text typography="body3" fontWeight="regular" color="text-hint">
            이용약관의 변경이나 관계 법령에 따라 회원님께 안내되어야 할 중요<br></br> 고지 사항은 메일 수신 동의 여부에
            상관없이 안내될 수 있습니다.
          </Text>
        </div>
        <Button className={styles.confirmBtn} size="xl" disabled>
          회원 가입
        </Button>
      </div>
    </div>
  );
}
