import styles from './RecruitUnivScrolling.module.scss';

interface itemsType {
  src: string;
  altText: string;
}

const items: itemsType[] = [
  {
    src: '/src/assets/svgs/univList1.svg',
    altText: 'Slide 1',
  },
  {
    src: '/src/assets/svgs/univList2.svg',
    altText: 'Slide 2',
  },
  {
    src: '/src/assets/svgs/univList3.svg',
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
