import { Button, Text } from '@goorm-dev/vapor-components';
import { ChevronRightIcon } from '@goorm-dev/vapor-icons';
import { Link } from 'react-router-dom';
import calendarGraphic from '../../../assets/svgs/img-calendar.svg';
import eventGraphic from '../../../assets/svgs/img-event.svg';
import studyGraphic from '../../../assets/svgs/img-study.svg';
import styles from './RecruitCaution.module.scss';

function RecruitCaution() {
  return (
    <div className={styles.container}>
      <Text as="h3" color="text-normal" typography="heading3" fontWeight="bold">
        유의 사항
      </Text>
      <div>
        <div className={styles.rowLayout}>
          {/* 카드 UI */}
          <div className={styles.cardLayout}>
            <div className={styles.textLayout}>
              {/* 반응형 적용 */}
              <Text className={styles.showOnSm} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                활동 기간
              </Text>
              <Text className={styles.showOnXs} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                활동 기간
              </Text>
              <Text className={styles.showOnSm} as="p" color="text-hint" typography="body1" fontWeight="regular">
                6월부터 12월까지 <br />
                활동 가능해야 합니다.
              </Text>
              <Text className={styles.showOnXs} as="p" color="text-hint" typography="body3" fontWeight="regular">
                6월부터 12월까지 <br />
                활동 가능해야 합니다.
              </Text>
            </div>
            <div>
              <img className={styles.img} src={calendarGraphic} alt="달력그래픽" />
            </div>
          </div>
          {/* 카드 UI */}
          <div className={styles.cardLayout}>
            <div className={styles.textLayout}>
              <Text className={styles.showOnSm} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                행사 참여
              </Text>
              <Text className={styles.showOnXs} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                행사 참여
              </Text>

              <Text className={styles.showOnSm} as="p" color="text-hint" typography="body1" fontWeight="regular">
                OT와 단풍톤에 <br />
                필수적으로 참여해야 합니다.
              </Text>
              <Text className={styles.showOnXs} as="p" color="text-hint" typography="body3" fontWeight="regular">
                OT와 단풍톤에 <br />
                필수적으로 참여해야 합니다.
              </Text>
            </div>
            <div>
              <img className={styles.img} src={eventGraphic} alt="해커톤그래픽" />
            </div>
          </div>
        </div>
        {/* 카드 UI */}
        <div className={`${styles.cardLayout} ${styles.widthFull}`}>
          <div className={styles.buttonLayout}>
            <div className={styles.textLayout}>
              <Text className={styles.showOnSm} as="h5" color="text-normal" typography="heading5" fontWeight="bold">
                스터디 참여
              </Text>
              <Text className={styles.showOnXs} as="h6" color="text-normal" typography="heading6" fontWeight="medium">
                스터디 참여
              </Text>
              <Text className={styles.showOnSm} as="p" color="text-hint" typography="body1" fontWeight="regular">
                KDC/KDT 1개 이상 수강 및 스터디 (3~4학년) <br />
                구름EDU 강의 1개 이상 수강 및 스터디(1~2학년)
              </Text>
              <Text className={styles.showOnXs} as="p" color="text-hint" typography="body3" fontWeight="regular">
                KDC/KDT 1개 이상 수강 및 스터디 (3~4학년) <br />
                구름EDU 강의 1개 이상 수강 및 스터디(1~2학년)
              </Text>
            </div>
            <div>
              <Link to={'https://kdc.goorm.io/goorm'} target="\_blank">
                <Button
                  color="primary"
                  size="lg"
                  tag="button"
                  iconSide="right"
                  icon={ChevronRightIcon}
                  className={styles.button}>
                  KDC/KDT 자세히 보기
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.showOnLg}>
            <img src={studyGraphic} alt="스터디그래픽" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitCaution;
