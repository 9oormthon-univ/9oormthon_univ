import { Text, Button } from '@goorm-dev/vapor-components';
import { OpenInNewOutlineIcon, TrashIcon } from '@goorm-dev/vapor-icons';
import styles from './ideaManageRow.module.scss';

export const IdeaManageRow = () => {
  return (
    <tr>
      <td>
        <Text typography="body2" color="text-normal" className={styles.text}>
          아이디어 제목 아이디어 제목 아이디어 제목아이디어 제목
        </Text>
      </td>
      <td className={styles.subjectContainer}>
        <Text typography="body2" color="text-normal" className={styles.text}>
          해커톤 주제 해커톤 주제해커톤 주제
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-normal" className={styles.text}>
          김구름
        </Text>
      </td>
      <td>
        <Text typography="body2" color="text-success" className={styles.text}>
          모집 중
        </Text>
      </td>
      <td className={styles.buttonContainer}>
        <Button type="button" size="sm" color="secondary" icon={TrashIcon} />
        <Button type="button" size="sm" color="secondary" icon={OpenInNewOutlineIcon} iconSide="right">
          상세 보기
        </Button>
      </td>
    </tr>
  );
};
