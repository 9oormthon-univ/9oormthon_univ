import { Text, Button } from '@goorm-dev/vapor-components';
import { OpenInNewOutlineIcon, TrashIcon } from '@goorm-dev/vapor-icons';
import styles from './ideaManageRow.module.scss';
import { Idea } from '../../../../types/admin/idea';

export const IdeaManageRow = ({ idea, onDeleteClick }: { idea: Idea; onDeleteClick: (idea: Idea) => void }) => {
  return (
    <tr>
      <td>
        <Text typography="body2" color="text-normal" className={styles.text}>
          {idea.title}
        </Text>
      </td>
      <td className={styles.subjectContainer}>
        <Text typography="body2" color="text-normal" className={styles.text}>
          {idea.subject}
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-normal" className={styles.text}>
          {idea.provider}
        </Text>
      </td>
      <td>
        <Text
          typography="body2"
          color={idea.team_building === 'RECRUITING' ? 'text-primary' : 'text-success'}
          className={styles.text}>
          {idea.team_building === 'RECRUITING' ? '모집 중' : '모집 완료'}
        </Text>
      </td>
      <td className={styles.buttonContainer}>
        <Button type="button" size="sm" color="secondary" icon={TrashIcon} onClick={() => onDeleteClick(idea)} />
        <Button
          type="button"
          size="sm"
          color="secondary"
          icon={OpenInNewOutlineIcon}
          iconSide="right"
          onClick={() => {
            window.open(`/hackathon/detail/${idea.id}`, '_blank');
          }}>
          상세 보기
        </Button>
      </td>
    </tr>
  );
};
