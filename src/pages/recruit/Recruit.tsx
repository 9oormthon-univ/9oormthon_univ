// import RecruitCalendar from '../../components/recruit/recruitCalendar/RecruitCalendar';
// import RecruitCaution from '../../components/recruit/recruitCaution/RecruitCaution';
// import RecruitFAQ from '../../components/recruit/recruitFAQ/RecruitFAQ';
import RecruitHeader from '../../components/recruit/recruitHeader/RecruitHeader';
// import RecruitTarget from '../../components/recruit/recruitTarget/RecruitTarget';
import styles from './styles.module.scss';

export default function Recruit() {
  return (
    <div className={styles.RecruitContainer}>
      <RecruitHeader />
      {/* <div className="container d-flex flex-column justify-content-center align-items-center ">
        <div className={styles.RecuritBody}>
          <RecruitCalendar />
          <RecruitTarget />
          <div className={styles.RecruitCautionWrapper}>
            <RecruitCaution />
          </div>
          <div className={styles.RecruitFAQContainer}>
            <RecruitFAQ />
          </div>
        </div>
      </div> */}
    </div>
  );
}
