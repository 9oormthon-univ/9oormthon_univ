import styles from './styles.module.scss';
import { Button, Text } from '@goorm-dev/vapor-components';
import notFound from '../../assets/images/notFound.png';
import { ImageIcon, MailIcon, SchoolIcon } from '@goorm-dev/vapor-icons';
import FormEditor from '../../components/hackathon/ideaForm/FormEditor';
import StackSelector from '../../components/hackathon/ideaForm/StackSelector';
import FormLinkInput from '../../components/hackathon/ideaForm/FormLinkInput';

export default function MyPageEdit() {
  return (
    <div className={styles.editContainer}>
      <Text typography="heading3" color="gray-900">
        내 정보 수정
      </Text>
      <hr className={styles.hr} />
      <div className={styles.editFormContainer}>
        <div className={styles.editForm}>
          <div className={styles.editFormHeader}>
            <div className={styles.editFormHeaderLeft}>
              <div className={styles.profileImgContainer}>
                <img src={notFound} alt="profile" />
              </div>
              <Button color="secondary" size="md" icon={ImageIcon} outline>
                프로필 수정
              </Button>
            </div>
            <div className={styles.editFormHeaderRight}>
              <div className={styles.profileName}>
                <Text as="h6" typography="heading6" color="text-normal">
                  김구름
                </Text>
                <div className={styles.profileEmailUniv}>
                  <div className={styles.profileEmailUnivItem}>
                    <MailIcon />
                    <Text as="p" typography="body2" color="text-alternative">
                      goormthonuniv.official@gmail.com
                    </Text>
                  </div>
                  <div className={styles.profileEmailUnivItem}>
                    <SchoolIcon />
                    <Text as="p" typography="body2" color="text-alternative">
                      구름대학교
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.editFormBody}>
            <Text as="h6" typography="heading6" color="text-normal">
              세부 정보
            </Text>
            <FormEditor
              label="자기소개"
              nullable={false}
              value=""
              onChange={() => {}}
              placeholder="자기소개를 입력해주세요."
            />
            <FormLinkInput />
            <StackSelector selectedStacks={[]} setSelectedStacks={() => {}} label="기술 스택" />
          </div>
        </div>
        <Button size="xl">변경사항 저장</Button>
      </div>
    </div>
  );
}
