import { FormGroup, Radio } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import FormLabel from './FormLabel';
import { POSITIONS } from '../../../constants/position';

interface FormRadioProps {
  label: string;
  nullable: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormRadio({ label, nullable, value, onChange }: FormRadioProps) {
  return (
    <FormGroup>
      <FormLabel label={label} nullable={nullable} />
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
    </FormGroup>
  );
}
