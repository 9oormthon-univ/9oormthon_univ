import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BENEFIT_ITEM_DATA } from '../../../../utilities/AboutData';
import BenefitItem from './BenefitItem';

import styles from './BenefitDesktop.module.scss';

export default function HorizontalScroll() {
  const scrollRef = useRef(null);

  return (
    <div>
      <motion.section className={styles.motionContainer} ref={scrollRef}>
        {BENEFIT_ITEM_DATA.map((item) => (
          <BenefitItem key={item.title} title={item.title} description={item.description} url={item.url} />
        ))}
      </motion.section>
    </div>
  );
}
