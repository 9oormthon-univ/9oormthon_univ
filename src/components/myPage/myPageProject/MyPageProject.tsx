import { ChangeEvent, useState } from 'react';
import styles from './myPageProject.module.scss';
import {
  Text,
  Input,
  Button,
  Checkbox,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  ListGroupItem,
  ListGroup,
} from '@goorm-dev/vapor-components';
import { ImageIcon } from '@goorm-dev/gds-icons';

interface Project {
  title: string;
  season: string;
  hackathon: string;
  image: any;
}

export default function MyPageProject({ title, image, season, hackathon }: Project) {
  return (
    <div className={styles.projectContainer}>
      <hr className={styles.divider} />
      <Text typography="heading6">나의 프로젝트</Text>
      <div className={styles.projectRow}>
        <div className={styles.projcetColumn}>
          <img className={styles.cardImg} src={image} />
          <div className={styles.projectContent}>
            <Text typography="heading5">제목</Text>
            <Text typography="subtitle2" color="text-hint">
              2기 / 단풍톤
            </Text>
          </div>
        </div>
        <div className={styles.projcetColumn}>
          <img className={styles.cardImg} src={image} />
          <div className={styles.projectContent}>
            <Text typography="heading5">제목</Text>
            <Text typography="subtitle2" color="text-hint">
              2기 / 단풍톤
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.projectRow}>
        <div className={styles.projcetColumn}>
          <img className={styles.cardImg} src={image} />
          <div className={styles.projectContent}>
            <Text typography="heading5">제목</Text>
            <Text typography="subtitle2" color="text-hint">
              2기 / 단풍톤
            </Text>
          </div>
        </div>
        <div className={styles.projcetColumn}>
          <img className={styles.cardImg} src={image} />
          <div className={styles.projectContent}>
            <Text typography="heading5">제목</Text>
            <Text typography="subtitle2" color="text-hint">
              2기 / 단풍톤
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
