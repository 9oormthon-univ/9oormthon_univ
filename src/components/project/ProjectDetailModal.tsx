import { Modal, ModalHeader } from '@goorm-dev/vapor-components';
import styles from './projectStyles.module.scss';
import { Badge, Status, Text } from '@goorm-dev/gds-components';
import DividerIcon from '../../assets/svgs/divider.svg';
import { Button } from 'reactstrap';
import { ChevronDownIcon, ChevronRightIcon } from '@goorm-dev/gds-icons';
import { useEffect, useState } from 'react';

interface ModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  award?: string;
  title: string;
  content: string;
  backendLink: string;
  frontendLink: string;
  releaseLink?: string;
  image: any;
  pm: string;
  design: string;
  frontend: string[];
  backend: string[];
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ModalProps) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const toggleList = () => setIsListVisible((prev) => !prev);

  useEffect(() => {
    if (!isOpen) {
      setIsListVisible(false);
    }
  }, [isOpen]);

  return (
    // dialog 컴포넌트 import 안되어서 임의로 modal로 작업
    <Modal isOpen={isOpen} toggle={onClose} centered>
      <ModalHeader toggle={onClose}></ModalHeader>
      <div className={styles.modalBody}>
        <div className={styles.modalBodyTop}>
          <div className={styles.modalBodyTopState}>
            {project.award && (
              <Badge color="dark" className={styles.modalBadge}>
                {project.award}
              </Badge>
            )}
            {project.releaseLink && <Status label="서비스 중" />}
          </div>
          <Text as="h4" typography="heading4" color="text-normal">
            {project.title}
          </Text>
        </div>
        <Text as="p" typography="body2" color="text-normal">
          {project.content}
        </Text>
        <div className={styles.cardImgWrap}>
          <img src={project.image} alt={project.title} className={styles.modalProjImg} />
        </div>
        <div className={styles.memberList}>
          <div className={styles.listName}>
            <Text as="p" color="text-hint" typography="body2" className={styles.textWidth}>
              기획
            </Text>
            <img src={DividerIcon} alt="구분선" />
            <Text typography="body2" as="p">
              {project.pm}
            </Text>
          </div>
          <div className={styles.listName}>
            <Text as="p" color="text-hint" typography="body2" className={styles.textWidth}>
              디자인
            </Text>
            <img src={DividerIcon} alt="구분선" />
            <Text typography="body2" as="p">
              {project.design}
            </Text>
          </div>
          <div className={styles.listName}>
            <Text as="p" color="text-hint" typography="body2" className={styles.textWidth}>
              프론트
            </Text>
            <img src={DividerIcon} alt="구분선" />
            <Text typography="body2" as="p">
              {project.frontend.join(', ')}
            </Text>
          </div>
          <div className={styles.listName}>
            <Text as="p" color="text-hint" typography="body2" className={styles.textWidth}>
              백엔드
            </Text>
            <img src={DividerIcon} alt="구분선" />
            <Text typography="body2" as="p">
              {project.backend.join(', ')}
            </Text>
          </div>
        </div>
      </div>
      {/* DialogFooter가 불러와지지 않아서 div값으로 사용 */}
      <div className={styles.dialogFooter}>
        <Button size="lg" block color="primary">
          서비스 바로가기
        </Button>
        {/* Button GDS가 안되어서 임의로 제작 */}
        <button type="button" className={styles.githubButton} onClick={toggleList}>
          <Text typography="subtitle1" color="text-alternative">
            Github
          </Text>
          <ChevronDownIcon className={styles.iconSize} />
        </button>

        <ul className={`${styles.listMenu} ${isListVisible ? styles.listVisible : ''}`}>
          <li className={styles.listItem} onClick={() => window.open(project.frontendLink, '_blank')}>
            <Text as="p" typography="body2" color="text-normal">
              프론트엔드 Github
            </Text>
            <ChevronRightIcon />
          </li>
          <li className={styles.listItem} onClick={() => window.open(project.frontendLink, '_blank')}>
            <Text as="p" typography="body2" color="text-normal">
              백엔드 Github
            </Text>
            <ChevronRightIcon />
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;
