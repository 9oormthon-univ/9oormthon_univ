import { Ideas } from '../types/user/idea';
import { Applies, TeamInfo, ApplyStatus } from '../types/user/team';
import { Sorting, SortType } from '../types/user/idea';
import {
  mockTopics,
  mockIdeaDetails,
  mockTeamInfo,
  mockApplies,
  mockAppliesByPhase,
  mockPeriod,
  mockUserInfo,
  mockOtherUsers,
  mockMyApplySummary,
  mockMyApplySummaryByPhase,
} from '../constants/mockData';

// Mock 데이터 필터링 함수
export const filterMockIdeas = (
  ideas: Ideas[],
  topicId: number,
  isActive: boolean,
  isBookmarked: boolean | undefined,
  searchQuery: string,
  currentPage: number,
  pageSize: number,
) => {
  let filteredIdeas = [...ideas];

  // 주제 필터링
  if (topicId !== 0) {
    const selectedTopicName = mockTopics.find((topic) => topic.id === topicId)?.name;
    filteredIdeas = filteredIdeas.filter((idea) => idea.subject === selectedTopicName);
  }

  // 상태 필터링
  filteredIdeas = filteredIdeas.filter((idea) => idea.is_active === isActive);

  // 북마크 필터링
  if (isBookmarked !== undefined) {
    filteredIdeas = filteredIdeas.filter((idea) => idea.is_bookmarked === isBookmarked);
  }

  // 검색 필터링
  if (searchQuery) {
    filteredIdeas = filteredIdeas.filter(
      (idea) =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.summary.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  // 페이지네이션
  const totalItems = filteredIdeas.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedIdeas = filteredIdeas.slice(startIndex, endIndex);

  return {
    ideas: paginatedIdeas,
    page_info: {
      current_page: currentPage,
      page_size: pageSize,
      total_pages: totalPages,
      total_items: totalItems,
    },
  };
};

// Mock 아이디어 북마크 상태 업데이트
export const updateMockIdeaBookmark = (ideas: Ideas[], ideaId: number): boolean => {
  const ideaIndex = ideas.findIndex((idea) => idea.id === ideaId);
  if (ideaIndex !== -1) {
    ideas[ideaIndex].is_bookmarked = !ideas[ideaIndex].is_bookmarked;
    return true;
  }
  return false;
};

// Mock 아이디어 상세 정보 가져오기
export const getMockIdeaDetailById = (ideaId: string) => {
  const id = parseInt(ideaId);
  const ideaDetail = mockIdeaDetails[id];

  if (!ideaDetail) {
    throw new Error(`아이디어 ID ${ideaId}를 찾을 수 없습니다.`);
  }

  return {
    data: ideaDetail,
  };
};

// Mock 내 아이디어 상세 정보 가져오기 (임시로 첫 번째 아이디어 반환)
export const getMockMyIdeaDetail = () => {
  return {
    data: mockIdeaDetails[1], // 첫 번째 아이디어를 내 아이디어로 가정
  };
};

// Mock 아이디어 상세 북마크 상태 업데이트
export const updateMockIdeaDetailBookmark = (ideaId: number): boolean => {
  const ideaDetail = mockIdeaDetails[ideaId];
  if (ideaDetail) {
    ideaDetail.idea_info.is_bookmarked = !ideaDetail.idea_info.is_bookmarked;
    return true;
  }
  return false;
};

// ===== 팀 빌딩 관련 Mock Utils =====

// Mock 팀 정보 조회
export const getMockTeamInfo = (): Promise<{ data: TeamInfo }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockTeamInfo,
      });
    }, 300); // 네트워크 지연 시뮬레이션
  });
};

// Mock 지원 현황 조회
export const getMockIdeaApplyStatus = ( 
  phase: number,
  sorting?: Sorting,
  sortType?: SortType,
): Promise<{ data: { counts: number; applies: Applies[] } }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let applies = mockAppliesByPhase[phase] || [];

      // 정렬 적용
      if (sorting && sortType) {
        applies = sortMockApplies(applies, sorting, sortType);
      }

      resolve({
        data: {
          counts: applies.length,
          applies: applies,
        },
      });
    }, 300);
  });
};

// Mock 팀 빌딩 확정
export const confirmMockTeamBuilding = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 팀 빌딩 확정 조건 검사 (예: 최소 인원 충족)
      const teamRoles = mockTeamInfo.role;
      const hasMinMembers = teamRoles.pm?.current_count || 0 > 0;

      if (!hasMinMembers) {
        reject({
          response: {
            data: {
              error: {
                code: 'INSUFFICIENT_MEMBERS',
              },
            },
          },
        });
        return;
      }

      // 팀 빌딩 상태를 확정으로 변경
      mockTeamInfo.team_building = 'END';
      resolve();
    }, 500);
  });
};

// Mock 기간 정보 조회
export const getMockPeriod = (): Promise<{ data: typeof mockPeriod }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockPeriod,
      });
    }, 200);
  });
};

// Mock 지원자 정렬 함수
const sortMockApplies = (applies: Applies[], sorting: Sorting, sortType: SortType): Applies[] => {
  const sortedApplies = [...applies];

  switch (sorting) {
    case 'UNIV':
      sortedApplies.sort((a, b) => {
        const comparison = a.user.univ.localeCompare(b.user.univ);
        return sortType === 'ASC' ? comparison : -comparison;
      });
      break;
    case 'ROLE':
      sortedApplies.sort((a, b) => {
        const comparison = a.role.localeCompare(b.role);
        return sortType === 'ASC' ? comparison : -comparison;
      });
      break;
    case 'PREFERENCE':
      sortedApplies.sort((a, b) => {
        const comparison = a.preference - b.preference;
        return sortType === 'ASC' ? comparison : -comparison;
      });
      break;
    default:
      break;
  }

  return sortedApplies;
};

// Mock 지원자 상태 업데이트
export const updateMockApplyStatus = (applyId: number, status: 'ACCEPTED' | 'REJECTED'): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const apply = mockApplies.find((a) => a.id === applyId);
      if (apply) {
        apply.status = status === 'ACCEPTED' ? ApplyStatus.ACCEPTED : ApplyStatus.REJECTED;

        // 수락된 경우 팀 정보에도 반영
        if (status === 'ACCEPTED') {
          const roleKey = apply.role.toLowerCase() as keyof typeof mockTeamInfo.role;
          const roleInfo = mockTeamInfo.role[roleKey];
          if (roleInfo && roleInfo.current_count < roleInfo.max_count) {
            roleInfo.current_count += 1;
            roleInfo.members?.push({
              id: apply.user.id,
              name: apply.user.name,
              img_url: 'https://via.placeholder.com/40',
              is_leader: false,
            });
          }
        }
      }
      resolve();
    }, 300);
  });
};

// Mock 아이디어 제공자 권한 확인 (현재 사용자가 아이디어 제공자인지)
export const checkMockIdeaProvider = (): boolean => {
  return true; // 개발 환경에서는 항상 true로 설정
};

// Mock 현재 사용자 정보 (팀 빌딩에 필요한 정보)
export const getMockCurrentUser = () => {
  return {
    id: 1,
    name: '김다영',
    univ: '서울대학교',
    role: 'PM',
  };
};

// ===== MyPage 관련 Mock Utils =====

// Mock 내 정보 조회
export const getMockMyInfo = (): Promise<{ data: typeof mockUserInfo }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockUserInfo,
      });
    }, 300);
  });
};

// Mock 다른 사용자 정보 조회
export const getMockUserInfo = (userId: string): Promise<{ data: typeof mockUserInfo }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userInfo = mockOtherUsers[userId];
      if (userInfo) {
        resolve({
          data: userInfo,
        });
      } else {
        reject(new Error(`사용자 ID ${userId}를 찾을 수 없습니다.`));
      }
    }, 300);
  });
};

// ===== ApplicantPage 관련 Mock Utils =====

// Mock 내 지원 현황 조회
export const getMockMyApplySummary = (phase: number): Promise<{ data: typeof mockMyApplySummary }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applySummary = mockMyApplySummaryByPhase[phase] || { applies: [] };
      resolve({
        data: applySummary,
      });
    }, 300);
  });
};

// Mock 지원 취소
export const deleteMockApply = (applyId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 지원 취소 가능한 조건 확인 (예: WAITING 상태인지)
      const allApplies = Object.values(mockMyApplySummaryByPhase).flatMap((phase) => phase.applies);
      const applyToDelete = allApplies.find((apply) => apply.apply_info.id === applyId);

      if (!applyToDelete) {
        reject(new Error('지원 내역을 찾을 수 없습니다.'));
        return;
      }

      if (applyToDelete.apply_info.status !== ApplyStatus.WAITING) {
        reject(new Error('대기 중인 지원만 취소할 수 있습니다.'));
        return;
      }

      // 실제로는 목업 데이터에서 해당 지원을 제거해야 하지만,
      // 여기서는 단순히 성공 응답만 반환
      resolve();
    }, 500);
  });
};
