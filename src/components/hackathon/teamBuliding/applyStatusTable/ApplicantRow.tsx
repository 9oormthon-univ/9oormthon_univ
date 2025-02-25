import { useState } from 'react';
import { Button, Text } from '@goorm-dev/vapor-components';
import { OutOutlineIcon } from '@goorm-dev/vapor-icons';
import ApplyReasonModal from './ApplyReasonModal';
import styles from './styles.module.scss';

interface Applicant {
  id: number;
  preference: string;
  name: string;
  part: string;
  university: string;
  reason: string;
}

interface ApplicantRowProps {
  applicant: Applicant;
}

export default function ApplicantRow({ applicant }: ApplicantRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className={styles.row}>
        <td>
          <Text typography="body3">{applicant.preference}</Text>
        </td>
        <td>
          <Button size="sm" color="secondary" onClick={() => setIsOpen(true)}>
            지원 사유 보기
          </Button>
        </td>
        <td className={styles.nameContainer}>
          <Text typography="body3">{applicant.name}</Text>
          <OutOutlineIcon />
        </td>
        <td>
          <Text typography="body3">{applicant.part}</Text>
        </td>
        <td>
          <Text typography="body3">{applicant.university}</Text>
        </td>
        <td className={styles.actionButtons}>
          <Button size="sm" color="danger">
            거절
          </Button>
          <Button size="sm" color="success">
            수락
          </Button>
        </td>
      </tr>

      {isOpen && <ApplyReasonModal isOpen={isOpen} toggle={() => setIsOpen(false)} {...applicant} />}
    </>
  );
}
