import MDEditor from '@uiw/react-md-editor';
import styles from './styles.module.scss';

interface IdeaInfoProps {
  ideaInfo: string;
}

export default function IdeaInfoTab({ ideaInfo }: IdeaInfoProps) {
  return (
    <div className={styles.ideaInfoContainer} data-color-mode="light">
      <MDEditor.Markdown source={ideaInfo} className={styles.ideaInfo} />
    </div>
  );
}
