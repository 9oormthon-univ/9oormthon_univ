import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
} from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import FormLabel from './FormLabel';
import { useState } from 'react';
import { linkTypeList } from '../../../constants/linkType';
import { PlusOutlineIcon } from '@goorm-dev/vapor-icons';
// interface FormLinkInputProps {
//   label: string;
//   nullable: boolean;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// 최대 생성할 수 있는 링크 개수
const MAX_LINK_COUNT = 10;

export default function FormLinkInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [linkType, setLinkType] = useState(linkTypeList[0].label);

  const [links, setLinks] = useState([{ id: Date.now(), linkType: linkTypeList[0].label, url: '' }]);

  // 드롭다운 토글
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 링크 추가
  const addLink = () => {
    if (links.length >= MAX_LINK_COUNT) {
      alert('최대 10개까지만 추가할 수 있습니다.');
      return;
    }
    setLinks([...links, { id: Date.now(), linkType: linkTypeList[0].label, url: '' }]);
  };

  return (
    <FormGroup>
      <FormLabel label="링크" nullable={true} />
      <div className={styles.linkInputContainer}>
        <div className={styles.linkInputItem}>
          <div className={styles.linkInputItemLabel}>
            <Dropdown isOpen={isOpen} toggle={toggle}>
              <DropdownToggle
                caret
                size="lg"
                color="secondary"
                outline
                style={{ width: '7.5rem', justifyContent: 'space-between' }}>
                {linkType}
              </DropdownToggle>
              <DropdownMenu>
                {linkTypeList.map((item) => (
                  <DropdownItem key={item.value} onClick={() => setLinkType(item.label)}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Input type="link" placeholder="링크를 입력해주세요." size="lg" />
            <Button size="lg" color="secondary" icon={PlusOutlineIcon} onClick={addLink} />
          </div>
        </div>
      </div>
    </FormGroup>
  );
}
