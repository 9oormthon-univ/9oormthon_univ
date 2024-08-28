import ActivityList from './ActivityList';

import { Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames/bind';
import styles from './Activity.module.scss';

const cx = classNames.bind(styles);

export default function Activity() {
  return (
    <div
      className={cx(
        'activity',
        'w-100 h-100 position-relative d-flex flex-column justify-content-center align-items-center',
      )}>
      <h2 className={cx('titleText', 'd-none d-xl-block w-100')}>지난 구름톤 유니브의 여정</h2>
      <Text typography="heading6" color="gray-500">
        이전 기수는 이런 활동을 했어요
      </Text>
      <h3 className={cx('titleTextSmall', 'd-block d-xl-none w-100')}>지난 구름톤 유니브의 여정</h3>
      <ActivityList />
    </div>
  );
}
