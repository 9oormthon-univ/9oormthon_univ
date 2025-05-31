import { SearchOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './styles.module.scss';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  SideNav,
  Text,
  toast,
} from '@goorm-dev/vapor-components';
import { MoreCommonOutlineIcon, PlusOutlineIcon } from '@goorm-dev/vapor-icons';
import { useEffect, useRef, useState } from 'react';
import UnivUpdateModal from '../modal/UnivUpdateModal';
import UnivCreateModal from '../modal/UnivCreateModal';
import InformationModal from '../../../common/modal/InformationModal';
import { GENERATION } from '../../../../constants/common';
import { deleteUnivAPI, fetchUnivListAPI } from '../../../../api/admin';

interface Univ {
  id: number;
  name: string;
}

export const UnivListSidebar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUnivUpdateModalOpen, setIsUnivUpdateModalOpen] = useState(false);
  const [isUnivDeleteModalOpen, setIsUnivDeleteModalOpen] = useState(false);
  const [isUnivCreateModalOpen, setIsUnivCreateModalOpen] = useState(false);
  const [selectedUnivId, setSelectedUnivId] = useState<number | null>(null);

  // 유니브별 드롭다운 구분
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  // API 데이터
  const [univList, setUnivList] = useState<Univ[]>([]);
  const [univCount, setUnivCount] = useState(0);

  // 검색 창 바깥 클릭 시 검색 창 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // API 연결 - 유니브 리스트 간단 조회
  const fetchUnivList = async () => {
    try {
      const res = await fetchUnivListAPI(GENERATION);
      setUnivList(res.data.univs);
      setUnivCount(res.data.count);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUnivList();
  }, []);

  // 유니브 삭제
  const handleDeleteUniv = async (univ_id: number) => {
    try {
      const res = await deleteUnivAPI(univ_id);
      console.log(res);
      fetchUnivList(); // 삭제 후 리스트 새로고침
      setIsUnivDeleteModalOpen(false);

      toast('유니브 삭제가 완료되었습니다', {
        type: 'primary',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 유니브 정보 수정 모달 열기
  const handleOpenUpdateModal = (univId: number) => {
    setSelectedUnivId(univId);
    setIsUnivUpdateModalOpen(true);
  };

  // 유니브 삭제 모달 열기
  const handleOpenDeleteModal = (univId: number) => {
    setSelectedUnivId(univId);
    setIsUnivDeleteModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        {isSearching ? (
          <Input
            size="md"
            ref={inputRef}
            placeholder="유니브명 검색"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onBlur={() => setIsSearching(false)}
            autoFocus
          />
        ) : (
          <>
            <div className={styles.listHeaderText}>
              <Text typography="heading6" as="h6" color="text-normal">
                유니브 리스트
              </Text>
              <Text typography="heading6" as="h6" color="text-primary">
                {univCount}
              </Text>
            </div>
            <SearchOutlineIcon size={24} onClick={() => setIsSearching(true)} className={styles.searchIcon} />
          </>
        )}
      </div>
      <SideNav className={styles.sideBar}>
        <SideNav.List className={styles.sideBarList}>
          <SideNav.Item>
            <SideNav.Link>전체</SideNav.Link>
          </SideNav.Item>

          {univList.map((univ) => (
            <SideNav.Item className={styles.univItem} key={univ.id}>
              <SideNav.Link>{univ.name}</SideNav.Link>
              <SideNav.Item.RightArea>
                <Dropdown
                  direction="down"
                  className={styles.univDropdown}
                  isOpen={openDropdownId === univ.id}
                  toggle={() => toggleDropdown(univ.id)}>
                  <DropdownToggle size="sm" color="secondary" className={styles.univDropdownToggle}>
                    <MoreCommonOutlineIcon className={styles.univDropdownIcon} />
                  </DropdownToggle>
                  <DropdownMenu right className={styles.univDropdownMenu}>
                    <DropdownItem onClick={() => handleOpenUpdateModal(univ.id)}>
                      <Text typography="body2" as="p" color="text-normal">
                        정보 수정
                      </Text>
                    </DropdownItem>
                    <DropdownItem onClick={() => handleOpenDeleteModal(univ.id)}>
                      <Text typography="body2" as="p" color="text-danger">
                        삭제하기
                      </Text>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </SideNav.Item.RightArea>
            </SideNav.Item>
          ))}
        </SideNav.List>
      </SideNav>
      <div className={styles.addUnivButton}>
        <Button icon={PlusOutlineIcon} color="secondary" block size="lg" onClick={() => setIsUnivCreateModalOpen(true)}>
          유니브 추가하기
        </Button>
      </div>
      <UnivUpdateModal
        isOpen={isUnivUpdateModalOpen}
        toggle={() => setIsUnivUpdateModalOpen((prev) => !prev)}
        univId={selectedUnivId}
        onSuccess={() => {
          fetchUnivList();
        }}
      />
      <InformationModal
        isOpen={isUnivDeleteModalOpen}
        toggle={() => setIsUnivDeleteModalOpen((prev) => !prev)}
        title="해당 유니브를 삭제할까요?"
        description={
          <>
            <Text typography="body2" color="text-normal" as="p">
              {univList.find((univ) => univ.id === selectedUnivId)?.name}을 유니브 리스트에서 삭제합니다.
            </Text>
            <Text typography="body2" color="text-normal" as="p">
              유니브 삭제가 완료되면 데이터를 되돌릴 수 없습니다.
            </Text>
          </>
        }
        confirmLabel="삭제"
        onConfirm={() => selectedUnivId && handleDeleteUniv(selectedUnivId)}
      />
      <UnivCreateModal
        isOpen={isUnivCreateModalOpen}
        toggle={() => setIsUnivCreateModalOpen((prev) => !prev)}
        onSuccess={() => {
          fetchUnivList();
        }}
      />
    </div>
  );
};
