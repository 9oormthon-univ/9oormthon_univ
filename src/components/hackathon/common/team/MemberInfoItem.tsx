import { useNavigate } from 'react-router-dom';
import useBreakPoint from '../../../../hooks/useBreakPoint';
import styles from './styles.module.scss';
import { Text } from '@goorm-dev/vapor-components';

interface MemberInfoItemProps {
  name: string;
  imgUrl: string;
  id: number;
}

export default function MemberInfoItem({ name, imgUrl, id }: MemberInfoItemProps) {
  const breakpoint = useBreakPoint();
  const navigate = useNavigate();

  return (
    <div
      className={['xs'].includes(breakpoint) ? styles.memberInfoItemMobile : styles.memberInfoItem}
      onClick={() => {
        navigate(`/user/${id}`);
      }}
    >
      <div className={styles.memberInfoImg}>
        <img src={imgUrl} alt="memberImg" />
      </div>
      <Text as="p" typography="body2" color="text-alternative">
        {name}
      </Text>
    </div>
  );
}
