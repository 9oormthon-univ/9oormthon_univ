import { Avatar, Text } from '@goorm-dev/vapor-components';
import styles from './form.module.scss';
import FormField from '../../../common/formField/FormField';

export default function MemberInfoView() {
  return (
    <div className={styles.infoContainer}>
      <Avatar name="Goorm" />
      <div className={styles.memberContainer}>
        <FormField label="이름">
          <Text typography="heading6" as="p" color="text-normal">
            김구름
          </Text>
        </FormField>
        <FormField label="팀 정보">
          <Text typography="heading6" as="p" color="text-normal">
            1팀 / 팀 이름
          </Text>
        </FormField>
        <FormField label="파트">
          <Text typography="heading6" as="p" color="text-normal">
            기획
          </Text>
        </FormField>
        <FormField label="학교">
          <Text typography="heading6" as="p" color="text-normal">
            구름대학교
          </Text>
        </FormField>
        <FormField label="이메일">
          <Text typography="heading6" as="p" color="text-normal">
            goorm@goorm.dev
          </Text>
        </FormField>
        <FormField label="전화번호">
          <Text typography="heading6" as="p" color="text-normal">
            010-1234-5678
          </Text>
        </FormField>
        <FormField label="참여 기수">
          <Text typography="heading6" as="p" color="text-normal">
            3기, 4기
          </Text>
        </FormField>
      </div>
    </div>
  );
}
