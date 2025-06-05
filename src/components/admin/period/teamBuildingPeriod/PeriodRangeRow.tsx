import styles from './periodRangeRow.module.scss';
import { Input, Text } from '@goorm-dev/vapor-components';

interface PeriodRangeRowProps {
  label: string;
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

export default function PeriodRangeRow({ label, startDate, endDate, onChange }: PeriodRangeRowProps) {
  return (
    <div className={styles.container}>
      <Text typography="subtitle2" color="text-alternative">
        {label}
      </Text>
      <div className={styles.inputContainer}>
        <Input
          size="lg"
          type="date"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, endDate)}
        />
        <Text typography="body1" color="text-normal">
          ~
        </Text>
        <Input
          size="lg"
          type="date"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(startDate, e.target.value)}
        />
      </div>
    </div>
  );
}
