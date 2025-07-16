import { Ideas } from '../types/user/idea';
import { mockTopics } from '../constants/mockData';

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
