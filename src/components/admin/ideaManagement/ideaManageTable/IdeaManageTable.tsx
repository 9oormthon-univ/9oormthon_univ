import { BasicPagination, Text, toast } from '@goorm-dev/vapor-components';
import styles from './ideaManageTable.module.scss';
import { ControlCommonIcon } from '@goorm-dev/vapor-icons';
import { IdeaManageRow } from '../ideaManageRow/IdeaManageRow';
import { Idea, PageInfo, Sorting } from '../../../../types/admin/idea';
import { useState } from 'react';
import { deleteIdea } from '../../../../api/admin/idea';
import InformationModal from '../../../common/modal/InformationModal';

export default function IdeaManageTable({
  ideaList,
  pageInfo,
  onSortChange,
  onPageChange,
  onUpdate,
}: {
  ideaList: Idea[];
  pageInfo: PageInfo;
  onSortChange: (sorting: Sorting) => void;
  onPageChange: (page: number) => void;
  onUpdate: () => void;
}) {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedIdea) return;
    try {
      await deleteIdea(selectedIdea.id);
      setIsDeleteModalOpen(false);
      onUpdate();
      toast('아이디어를 삭제했습니다.', {
        type: 'primary',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <Text typography="body2" color="text-alternative">
                  아이디어 제목
                </Text>
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('TITLE')} />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  주제
                </Text>
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('SUBJECT')} />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  게시자
                </Text>
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('PROVIDER')} />
              </th>
              <th>
                <Text typography="body2" color="text-alternative">
                  팀 빌딩
                </Text>
                <ControlCommonIcon className={styles.icon} onClick={() => onSortChange('TEAM_BUILDING')} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ideaList.map((idea) => (
              <IdeaManageRow key={idea.id} idea={idea} onDeleteClick={handleDeleteClick} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <BasicPagination
          pageCount={pageInfo.total_pages}
          page={pageInfo.current_page}
          onPageChangeHandler={(page: number) => onPageChange(page)}
        />
      </div>
      <InformationModal
        isOpen={isDeleteModalOpen}
        toggle={() => setIsDeleteModalOpen(false)}
        title="아이디어 삭제"
        description={
          <>
            <Text typography="body2" color="text-normal">
              {selectedIdea?.title}을 삭제하시겠습니까?
            </Text>
            <Text typography="body2" color="text-normal">
              삭제된 아이디어 및 팀은 복구할 수 없습니다.
            </Text>
          </>
        }
        confirmLabel="삭제"
        onConfirm={handleConfirmDelete}
        confirmButtonColor="danger"
      />
    </div>
  );
}
