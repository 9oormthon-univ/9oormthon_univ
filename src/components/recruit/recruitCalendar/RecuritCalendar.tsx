import styles from './RecruitCalendar.module.scss';
import newCalendar from '../../../assets/images/newCalendar.png';
import { Text } from '@goorm-dev/vapor-components';

function RecuritCalendar() {
  return (
    <div className={styles.container}>
      <Text as="h3" color="gray-900" typography="heading3" fontWeight="bold">
        3기 모집 일정
      </Text>
      <div className={styles.wrapper}>
        <div className={styles.rightSection}>
          <img className={styles.calendarImg} src={newCalendar} alt="4기 달력" />
        </div>
        <div className={styles.leftSection}>
          <div className={styles.leftBottomSection}>
            <div className={styles.smSchedule}>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  1. 대표 모집 :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  1월 21일 ~ 1월 30일
                </Text>
              </div>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  2. 대표 OT :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  2월 17일
                </Text>
              </div>
            </div>
            <div className={styles.smSchedule}>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  3. 미르미 모집 :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  1월 21일 - 2월 11일
                </Text>
              </div>
              <div className={styles.scheduleDiv}>
                <Text color="text-alternative" typography="subtitle1" fontWeight="medium">
                  4. 전체 OT :
                </Text>
                <Text color="text-hint" typography="subtitle2" fontWeight="medium">
                  2월 17일
                </Text>
              </div>
            </div>
          </div>
          <div className={styles.leftTopSection}>
            <Text className={styles.showOnLg} color="text-hint" typography="subtitle1" fontWeight="medium">
              유니브 별로 모집일정이 상이하니
              <br /> 자세한 일정은 각 유니브 인스타를 참고하세요
            </Text>
            <Text className={styles.showOnMd} as="span" color="text-hint" typography="subtitle2" fontWeight="medium">
              유니브 별로 모집일정이 상이하니 자세한 일정은 각 유니브 인스타를 참고하세요
            </Text>
            <Text className={styles.showOnXs} as="span" color="text-hint" typography="subtitle2" fontWeight="medium">
              유니브 별로 모집일정이 상이하니 자세한 일정은 <br /> 각 유니브 인스타를 참고하세요
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuritCalendar;
