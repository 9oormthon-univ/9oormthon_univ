import RecuritCalendar from '../../components/recruit/recruitCalendar/RecuritCalendar';
import RecruitCaution from '../../components/recruit/recruitCaution/RecruitCaution';
import RecuritFAQ from '../../components/recruit/recruitFAQ/RecruitFAQ';
import RecuritHeader from '../../components/recruit/recuritHeader/RecuritHeader';
import RecuritTarget from '../../components/recruit/recuritTarget/RecuritTarget';
import styles from './styles.module.scss';

export default function Recruit() {
  return (
    <div className={styles.RecruitContainer}>
      <RecuritHeader />
      <div className="container d-flex flex-column justify-content-center align-items-center ">
        <div className={styles.RecuritBody}>
          {/* ---------------- 모집일정 ---------------- */}
          <RecuritCalendar />
          {/* ---------------- 지원 대상 ---------------- */}
          <RecuritTarget />

          {/* ---------------- 유의 사항 ---------------- */}
          <div className={styles.RecuritCautionWrapper}>
            <RecruitCaution />
          </div>
          {/* ---------------- 자주 묻는 질문 ---------------- */}
          <div className={styles.RecuritFAQContainer}>
            <RecuritFAQ />
          </div>
        </div>
      </div>
    </div>
  );
}
