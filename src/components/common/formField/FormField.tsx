import styles from './styles.module.scss';
import { Label, Text } from '@goorm-dev/vapor-components';
interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, required = false, children }: FormFieldProps) {
  return (
    <div className={styles.formField}>
      <Label className={styles.labelWrap}>
        <Text typography="subtitle2" color="text-alternative">
          {label}
        </Text>
        {required && (
          <Text typography="body3" color="text-danger">
            *
          </Text>
        )}
      </Label>
      {children}
    </div>
  );
}
