import { FormGroup, Radio } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import FormLabel from './FormLabel';

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
        <Radio label="기획" id="pm" name="role" checked={value === 'pm'} onChange={onChange} />
        <Radio label="디자인" id="pd" name="role" checked={value === 'pd'} onChange={onChange} />
        <Radio label="프론트엔드" id="fe" name="role" checked={value === 'fe'} onChange={onChange} />
        <Radio label="백엔드" id="be" name="role" checked={value === 'be'} onChange={onChange} />
      </div>
    </FormGroup>
  );
}
