import { Button, Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';

export default function IdeaApplyListItem() {
  return (
    <div className={styles.ideaApplyListItemContainer}>
      <div className={styles.ideaApplyListItemLeft}>
        <Text as="h4" typography="heading4" color="text-normal">
          1지망
        </Text>
        <div className={styles.ideaApplyListItemContent}>
          <Text as="h6" typography="heading6" color="text-normal">
            서비스 아이디어 이름
          </Text>
          <Text typography="body2" color="text-normal">
            기획 파트
          </Text>
        </div>
        <Text typography="body2" color="text-alternative">
          이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서
          함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고
          싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요.
          이래서 함께 하고 싶어요. 이래서 함께 하고 싶어요.
        </Text>
      </div>
      <div className={styles.ideaApplyListItemRight}>
        <div className={styles.ideaApplyListItemRightContent}>
          <Text as="h4" typography="heading4" color="text-primary">
            대기중
          </Text>
          <Text typography="subtitle2" color="text-hint">
            지원 비율 2:1
          </Text>
        </div>
        <Button size="sm" color="secondary">
          지원 취소
        </Button>
      </div>
    </div>
  );
}
