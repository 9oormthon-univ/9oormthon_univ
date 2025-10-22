// src/components/common/input/RadioGroup/index.tsx

import { Radio } from '@goorm-dev/vapor-components';
import styles from './style.module.scss';
import { POSITIONS } from '@/constants/position';

interface RadioGroupProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroup({ value, onChange }: RadioGroupProps) {
  return (
    <div className={styles.radioContainer}>
      {Object.values(POSITIONS)
        .sort((a, b) => a.index - b.index)
        .map((position) => (
          <Radio
            key={position.key}
            label={position.name}
            id={position.key}
            name="role"
            checked={value === position.key}
            onChange={onChange}
          />
        ))}
    </div>
  );
}
