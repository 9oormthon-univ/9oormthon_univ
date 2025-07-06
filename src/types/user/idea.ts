// 아이디어 요약 조회
export interface Ideas {
  id: number;
  subject: string;
  title: string;
  summary: string;
  is_active: boolean;
  is_bookmarked: boolean;
}

export interface PageInfo {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_items: number;
}
