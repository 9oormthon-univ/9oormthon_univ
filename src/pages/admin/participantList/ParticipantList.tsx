import styles from './participantList.module.scss';
import { Button, Text, toast } from '@goorm-dev/vapor-components';
import { UnivListSidebar } from '../../../components/admin/participantList/univListSideBar/UnivListSidebar';
import { MemberTable } from '../../../components/admin/participantList/memberTable/MemberTable';
import { useEffect, useRef, useState } from 'react';
import { createUserExcelAPI, fetchUserSummaryListAPI } from '../../../api/admin/users';
import { useDebounce } from '../../../hooks/useDebounce';
import { Univ } from '../../../types/admin/univ';
import { PageInfo, Sorting, SortType, UserOverview } from '../../../types/admin/user';
import { AttachFileOutlineIcon } from '@goorm-dev/vapor-icons';
import { USER_EXCEL_UPLOAD_ERROR_MESSAGES } from '../../../constants/errorMessage';
import { useUnivList } from '@/hooks/queries/admin/useUnivList';

export default function ParticipantList() {
  const [selectedUnivId, setSelectedUnivId] = useState<number | null>(null);
  const [members, setMembers] = useState<UserOverview[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_page: 0,
    current_items: 0,
    page_size: 0,
    total_pages: 0,
    total_items: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: univList, isLoading: isUnivListLoading } = useUnivList();
  const [selectedUniv, setSelectedUniv] = useState<Univ | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 유저 목록 조회
  const getUserList = async (
    page: number,
    univId: number | null,
    search?: string,
    sorting?: Sorting,
    sortType?: SortType,
  ) => {
    const searchParam = search?.trim() === '' ? undefined : search;
    const res = await fetchUserSummaryListAPI(page, 10, univId || undefined, searchParam, sorting, sortType);
    setMembers(res.data.users);
    setPageInfo(res.data.page_info);
  };

  useEffect(() => {
    getUserList(currentPage, selectedUnivId, debouncedSearchQuery, sorting, sortType);
  }, [currentPage, selectedUnivId, debouncedSearchQuery, sorting, sortType]);

  // 유니브 선택 콜백 / 유니브를 아무것도 선택하지 않았을 때 미르미 전체 조회
  const handleSelectUniv = (univId: number | null) => {
    setSelectedUnivId(univId);
    setCurrentPage(1);
    setSelectedUniv(univList.univs.find((univ: Univ) => univ.id === univId) || null);
  };

  // 정렬 콜백
  const handleSorting = (newSorting: Sorting) => {
    if (sorting !== newSorting) {
      setSorting(newSorting);
      setSortType(SortType.ASC);
    } else {
      setSortType(sortType === SortType.ASC ? SortType.DESC : SortType.ASC);
    }
    setCurrentPage(1);
  };

  // 파일 첨부 콜백
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await createUserExcelAPI(formData);
      toast('유저 정보 업로드에 성공했습니다.', { type: 'success' });
    } catch (error: any) {
      const errorCode = error.response.data.error?.code;
      toast(USER_EXCEL_UPLOAD_ERROR_MESSAGES[errorCode] || '유저 정보 업로드에 실패했습니다.', {
        type: 'danger',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <Text typography="heading4" as="h4">
            미르미 리스트
          </Text>
          <>
            <Button
              icon={AttachFileOutlineIcon}
              color="secondary"
              size="md"
              type="button"
              onClick={handleFileButtonClick}>
              파일 첨부
            </Button>
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </>
        </div>

        <div className={styles.listContent}>
          {univList && !isUnivListLoading && (
            <UnivListSidebar
              onSelectUniv={handleSelectUniv}
              univList={univList.univs || []}
              univCount={univList.count || 0}
            />
          )}
          <MemberTable
            selectedUniv={selectedUniv || null}
            members={members}
            pageInfo={pageInfo}
            onPageChange={(page) => setCurrentPage(page)}
            onSearchChange={(query) => setSearchQuery(query)}
            onUpdate={() => getUserList(currentPage, selectedUnivId, searchQuery, sorting, sortType)}
            onSortChange={handleSorting}
          />
        </div>
      </div>
    </div>
  );
}
