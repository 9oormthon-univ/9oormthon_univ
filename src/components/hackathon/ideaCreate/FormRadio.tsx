import { FormGroup, Label, Radio, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
interface FormRadioProps {
  label: string;
  nullable: boolean;
}

export default function FormRadio({ label, nullable }: FormRadioProps) {
  return (
    <FormGroup>
      <Label className={styles.labelWrap}>
        <Text typography="subtitle2" color="text-alternative">
          {label}
        </Text>
        {!nullable && (
          <Text typography="body3" color="text-danger">
            *
          </Text>
        )}
      </Label>
      <div className={styles.radioContainer}>
        <Radio label="기획" id="PM" name="role" />
        <Radio label="디자인" id="PD" name="role" />
        <Radio label="프론트엔드" id="FE" name="role" />
        <Radio label="백엔드" id="BE" name="role" />
      </div>
    </FormGroup>
  );
}
