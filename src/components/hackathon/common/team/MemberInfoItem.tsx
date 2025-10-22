import { useNavigate } from 'react-router-dom';
import useBreakPoint from '@/hooks/useBreakPoint';
import styles from './styles.module.scss';
import { Badge, Text } from '@goorm-dev/vapor-components';

interface MemberInfoItemProps {
  name: string;
  img_url?: string;
  id?: number;
  is_leader?: boolean;
}

export default function MemberInfoItem({ name, img_url, id, is_leader }: MemberInfoItemProps) {
  const breakpoint = useBreakPoint();
  const navigate = useNavigate();
  const isNoMember = name === '팀원 없음';

  return (
    <div
      className={[
        ['xs'].includes(breakpoint) ? styles.memberInfoItemMobile : styles.memberInfoItem,
        isNoMember ? styles.noMember : '',
      ].join(' ')}
      onClick={() => {
        if (id && !isNoMember) {
          navigate(`/user/${id}`);
        }
      }}>
      {img_url && (
        <div className={styles.memberInfoImg}>
          <img src={img_url} alt="memberImg" />
        </div>
      )}
      <div className={styles.memberInfoName}>
        <Text as="p" typography="body2" color="text-alternative">
          {name}
        </Text>
        {is_leader && (
          <Badge size="sm" color="hint">
            팀장
          </Badge>
        )}
      </div>
    </div>
  );
}
