// src/components/common/input/TextArea/index.tsx

import { Text } from '@goorm-dev/vapor-components';
import styles from './style.module.scss';

interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export default function TextArea({ placeholder, value, onChange, disabled }: TextAreaProps) {
  const maxLength = 250;
  const currentLength = value.length;
  const isNearMax = currentLength >= maxLength * 0.8; // 80% 이상일 때
  const isAtMax = currentLength >= maxLength; // 100%일 때

  return (
    <>
      <textarea
        placeholder={placeholder}
        className={styles.textArea}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
      />
      <div className={styles.characterCount}>
        <Text typography="body3" color={isAtMax ? 'text-danger' : isNearMax ? 'text-warning' : 'text-hint'}>
          {currentLength}/{maxLength}
        </Text>
      </div>
    </>
  );
}
