import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { BENEFIT_ITEM_DATA } from '../../../../utilities/AboutData';
import BenefitItem from './BenefitItem';

import classNames from 'classnames/bind';

import styles from './BenefitDesktop.module.scss';

const cx = classNames.bind(styles);

export default function HorizontalScroll() {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  const scrollPercentage = useMotionValue(0);

  const transform = useTransform(scrollPercentage, [0, 1], [0, -scrollRange + viewportW]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <div className={cx('horizontalScroll')}>
      <div className={cx('scroll', 'position-sticky')}>
        <motion.section className={cx('motionContainer')} ref={scrollRef} style={{ x: spring }}>
          {BENEFIT_ITEM_DATA.map((item) => (
            <BenefitItem key={item.title} title={item.title} description={item.description} url={item.url} />
          ))}
        </motion.section>
      </div>
      <div ref={ghostRef} />
    </div>
  );
}
