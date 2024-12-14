import styles from './RecruitUnivScrolling.module.scss';

import univList1 from '../../../assets/svgs/univList1.svg';
import univList2 from '../../../assets/svgs/univList2.svg';
import univList3 from '../../../assets/svgs/univList3.svg';

interface itemsType {
  src: string;
  altText: string;
}

const items: itemsType[] = [
  {
    src: univList1,
    altText: 'Slide 1',
  },
  {
    src: univList2,
    altText: 'Slide 2',
  },
  {
    src: univList3,
    altText: 'Slide 3',
  },
];

function RecruitUnivScrolling() {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.carouselWrapper}>
        {items.map((item, index) => (
          <div className={index === 1 ? styles.autoCarouselBoxRight : styles.autoCarouselBox}>
            <img src={item.src} alt={item.altText} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecruitUnivScrolling;
