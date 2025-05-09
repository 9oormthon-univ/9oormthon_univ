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
        <Radio label="기획" id="PM" name="role" checked={value === 'PM'} onChange={onChange} />
        <Radio label="디자인" id="PD" name="role" checked={value === 'PD'} onChange={onChange} />
        <Radio label="프론트엔드" id="FE" name="role" checked={value === 'FE'} onChange={onChange} />
        <Radio label="백엔드" id="BE" name="role" checked={value === 'BE'} onChange={onChange} />
      </div>
    </FormGroup>
  );
}
