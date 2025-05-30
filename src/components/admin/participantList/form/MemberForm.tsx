import { Avatar, Button } from '@goorm-dev/vapor-components';
import FormField from '../../../common/formField/FormField';
import { Input } from '@goorm-dev/vapor-components';
import UnivSearchDropdown from '../modal/dropdown/UnivSearchDropdown';
import GenerationSelectDropdown from '../modal/dropdown/GenerationSelectDropdown';
import { Radio } from '@goorm-dev/vapor-components';
import styles from './form.module.scss';
import { ImageIcon } from '@goorm-dev/vapor-icons';

interface MemberFormProps {
  // mode: 'create' | 'edit';
  showProfileEdit?: boolean;
}

export default function MemberForm({ showProfileEdit }: MemberFormProps) {
  return (
    <div className={styles.modalBody}>
      <Avatar name="Goorm" />
      <div className={styles.memberContainer}>
        {showProfileEdit && (
          <Button size="md" color="secondary" onClick={() => {}} icon={ImageIcon} outline className={styles.iconButton}>
            프로필 수정
          </Button>
        )}
        <FormField label="이름" required>
          <Input bsSize="lg" placeholder="이름을 입력해주세요" />
        </FormField>
        <FormField label="학교" required>
          <UnivSearchDropdown />
        </FormField>
        <FormField label="이메일" required>
          <Input bsSize="lg" placeholder="이메일을 입력해주세요" />
        </FormField>
        <FormField label="전화번호" required>
          <Input bsSize="lg" placeholder="000-0000-0000" />
        </FormField>
        <FormField label="참여 기수" required>
          <GenerationSelectDropdown />
        </FormField>
        <FormField label="권한" required>
          <div className={styles.radioContainer}>
            <Radio id="user" label="참가자" name="role" />
            <Radio id="admin" label="중앙운영단" name="role" />
          </div>
        </FormField>
      </div>
    </div>
  );
}
