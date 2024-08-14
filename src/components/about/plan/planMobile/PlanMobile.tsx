import classNames from 'classnames/bind';
import styles from './PlanMobile.module.scss';
import Timeline from './Timeline';

const cx = classNames.bind(styles);

// 이 컴포넌트는 ~ container-md(1199px) 까지를 다룬다

export default function PlanMobile() {
  return (
    <div
      className={cx(
        'planMobile',
        'd-flex d-xl-none position-relative w-100 d-flex flex-column justify-content-center align-items-center',
      )}>
      <h3 className={cx('title')}>앞으로의 계획은요,</h3>
      <Timeline />
    </div>
  );
}
