import styles from './styles.module.scss';
import { Label, Text } from '@goorm-dev/vapor-components';

interface FormLabelProps {
  label: string;
  nullable: boolean;
}

export default function FormLabel({ label, nullable }: FormLabelProps) {
  return (
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
  );
}
