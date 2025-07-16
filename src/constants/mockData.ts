import { Ideas } from '../types/user/idea';

// Mock 주제 데이터
export const mockTopics = [
  { id: 0, name: '전체 주제' },
  { id: 1, name: 'AI/머신러닝' },
  { id: 2, name: '웹 개발' },
  { id: 3, name: '모바일 개발' },
  { id: 4, name: '게임' },
  { id: 5, name: '데이터 분석' },
];

// Mock 아이디어 데이터
export const mockIdeas: Ideas[] = [
  {
    id: 1,
    subject: 'AI/머신러닝',
    title: '🤖 AI 기반 개인 맞춤형 학습 플랫폼',
    summary:
      '사용자의 학습 패턴을 분석하여 개인화된 학습 경로를 제공하는 AI 플랫폼입니다. 머신러닝을 통해 최적의 학습 방법을 추천합니다.',
    is_active: true,
    is_bookmarked: false,
  },
  {
    id: 2,
    subject: '웹 개발',
    title: '🌐 실시간 협업 코딩 플랫폼',
    summary:
      '개발자들이 실시간으로 코드를 작성하고 리뷰할 수 있는 웹 기반 플랫폼입니다. 화상 통화와 코드 에디터가 통합되어 있습니다.',
    is_active: true,
    is_bookmarked: true,
  },
  {
    id: 3,
    subject: '모바일 개발',
    title: '📱 지역 커뮤니티 연결 모바일 앱',
    summary: '같은 지역에 거주하는 사람들을 연결하여 지역 소식, 모임, 중고 거래 등을 할 수 있는 모바일 앱입니다.',
    is_active: false,
    is_bookmarked: false,
  },
  {
    id: 4,
    subject: '게임',
    title: '🎮 교육용 코딩 게임',
    summary:
      '어린이들이 게임을 통해 프로그래밍을 학습할 수 있는 교육용 게임입니다. 단계별 미션을 통해 코딩 개념을 익힐 수 있습니다.',
    is_active: true,
    is_bookmarked: true,
  },
  {
    id: 5,
    subject: '데이터 분석',
    title: '📊 소상공인을 위한 매출 분석 도구',
    summary:
      '소상공인들이 쉽게 사용할 수 있는 매출 분석 및 예측 도구입니다. 간단한 데이터 입력만으로 매출 트렌드를 파악할 수 있습니다.',
    is_active: true,
    is_bookmarked: false,
  },
  {
    id: 6,
    subject: 'AI/머신러닝',
    title: '🎵 AI 음악 추천 서비스',
    summary:
      '사용자의 음악 취향과 현재 상황을 분석하여 최적의 음악을 추천하는 AI 서비스입니다. 날씨, 시간, 위치 정보를 활용합니다.',
    is_active: false,
    is_bookmarked: false,
  },
  {
    id: 7,
    subject: '웹 개발',
    title: '💰 개인 가계부 관리 플랫폼',
    summary:
      '가계부 작성부터 지출 분석, 예산 관리까지 한 번에 할 수 있는 웹 플랫폼입니다. 은행 계좌 연동을 통한 자동 분류 기능을 제공합니다.',
    is_active: true,
    is_bookmarked: true,
  },
  {
    id: 8,
    subject: '모바일 개발',
    title: '🌿 환경 보호 실천 앱',
    summary:
      '일상에서 환경 보호를 실천할 수 있는 방법들을 제안하고, 실천 내용을 기록하여 포인트를 적립할 수 있는 모바일 앱입니다.',
    is_active: true,
    is_bookmarked: false,
  },
];
