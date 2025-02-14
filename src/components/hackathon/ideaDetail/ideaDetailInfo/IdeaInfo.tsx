import MDEditor from '@uiw/react-md-editor';
import styles from './styles.module.scss';

interface IdeaInfoProps {
  ideaInfo: string;
}

export default function IdeaInfo({ ideaInfo }: IdeaInfoProps) {
  return (
    <div className={styles.ideaInfoContainer}>
      <MDEditor.Markdown source={ideaInfo} />
    </div>
  );
}
