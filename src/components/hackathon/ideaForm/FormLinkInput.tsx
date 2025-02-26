import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Alert,
} from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { useState } from 'react';
import { LinkType, linkTypeList } from '../../../constants/linkType';
import { CloseOutlineIcon, PlusOutlineIcon, WarningIcon } from '@goorm-dev/vapor-icons';
import FormLabel from './FormLabel';

interface FormLinkInputProps {
  links: { id: number; linkType: LinkType | null; url: string }[];
  setLinks: (newLinks: { id: number; linkType: LinkType | null; url: string }[]) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

export default function FormLinkInput({ links, setLinks, errorMessage, setErrorMessage }: FormLinkInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorFields, setErrorFields] = useState<{ id: number; linkType: boolean; url: boolean }[]>([]);

  const toggle = () => setIsOpen(!isOpen);

  // 필드 유효성 검사
  const validateField = (link: { id: number; linkType: LinkType | null; url: string }) => {
    const errors: { id: number; linkType?: string; url?: string } = { id: link.id };

    if (!link.linkType) {
      errors.linkType = '링크 종류를 선택해주세요.';
      setErrorMessage('링크 종류를 선택해주세요.');
    }
    if (!link.url) {
      errors.url = '링크를 입력해주세요.';
      setErrorMessage('링크를 입력해주세요.');
    } else if (!link.url.startsWith('https://') && !link.url.startsWith('http://')) {
      errors.url = '유효한 URL을 입력해주세요.';
      setErrorMessage('유효한 URL을 입력해주세요.');
    }

    return errors;
  };

  // 링크 추가
  const addLink = () => {
    if (links.length >= 10) {
      setErrorMessage(`최대 10개까지 추가할 수 있습니다.`);
      return;
    }

    // 마지막 입력된 링크 검증
    const lastLink = links[links.length - 1];
    if (lastLink) {
      const validation = validateField(lastLink);

      // 유효성 검사 실패 시 에러 표시하고 추가 방지
      if (validation.linkType || validation.url) {
        setErrorFields((prev) => [
          ...prev.filter((e) => e.id !== lastLink.id),
          { id: lastLink.id, linkType: !!validation.linkType, url: !!validation.url },
        ]);
        return;
      }
    }

    // 에러 메시지 초기화 후 새 링크 추가
    setErrorMessage('');
    setLinks([...links, { id: Date.now(), linkType: null, url: '' }]);
  };

  // 링크 삭제
  const removeLink = (id: number) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);

    // 해당 링크의 에러 메시지도 제거
    setErrorFields((prev) => prev.filter((error) => error.id !== id));

    // 링크 삭제 후 에러 메시지가 남아 있다면 초기화
    if (updatedLinks.length === 0) {
      setErrorMessage('');
    }
  };

  // 입력 값 변경
  const handleChange = (id: number, field: 'linkType' | 'url', value: string | LinkType) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)));

    // 에러 해제
    setErrorFields((prev) => prev.map((error) => (error.id === id ? { ...error, [field]: false } : error)));
  };

  return (
    <FormGroup>
      <div className={styles.linkInputContainer}>
        <FormLabel label="링크" nullable />

        {links.map((link, index) => {
          const error = errorFields.find((e) => e.id === link.id);

          return (
            <div key={link.id} className={styles.linkInputItem}>
              <div className={styles.linkInputItemLabel}>
                <Dropdown isOpen={isOpen && index === links.length - 1} toggle={toggle}>
                  <DropdownToggle
                    caret
                    size="lg"
                    color="secondary"
                    outline
                    style={{
                      width: '7.5rem',
                      justifyContent: 'space-between',
                      border: error?.linkType ? '1px solid var(--danger)' : '1px solid var(--gray-300)',
                    }}>
                    {link.linkType ? linkTypeList.find((item) => item.value === link.linkType)?.label : '선택'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {linkTypeList.map((item) => (
                      <DropdownItem key={item.value} onClick={() => handleChange(link.id, 'linkType', item.value)}>
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Input
                  type="text"
                  placeholder="링크 입력"
                  size="lg"
                  value={link.url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(link.id, 'url', e.target.value)}
                  style={{
                    border: error?.url ? '1px solid var(--danger)' : '1px solid var(--gray-300)',
                  }}
                />

                <Button size="lg" color="secondary" icon={CloseOutlineIcon} onClick={() => removeLink(link.id)} />
              </div>
            </div>
          );
        })}

        {links.length < 10 && (
          <Button size="lg" color="secondary" icon={PlusOutlineIcon} onClick={addLink}>
            링크 추가
          </Button>
        )}

        {errorMessage && (
          <Alert color="danger" fade leftIcon={WarningIcon}>
            {errorMessage}
          </Alert>
        )}
      </div>
    </FormGroup>
  );
}
