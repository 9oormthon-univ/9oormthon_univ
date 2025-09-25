import { Ideas, IdeaInfoData, ProviderInfo, Requirements, Member } from '../types/user/idea';
import { TeamInfo, Applies, ApplyStatus, TeamMember } from '../types/user/team';
import { LinkType } from '../constants/linkType';

// Mock 주제 데이터
export const mockTopics = {
  idea_subjects: [
    { id: 1, name: 'AI/머신러닝' },
    { id: 2, name: '웹 개발' },
    { id: 3, name: '모바일 개발' },
    { id: 4, name: '게임' },
    { id: 5, name: '데이터 분석' },
  ],
};

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

// Mock 멤버 데이터
const mockMembers: Member[] = [
  {
    id: 1,
    img_url: 'https://via.placeholder.com/40',
    name: '김철수',
    univ: '서울대학교',
    is_leader: true,
  },
  {
    id: 2,
    img_url: 'https://via.placeholder.com/40',
    name: '이영희',
    univ: '연세대학교',
    is_leader: false,
  },
  {
    id: 3,
    img_url: 'https://via.placeholder.com/40',
    name: '박민수',
    univ: '고려대학교',
    is_leader: false,
  },
];

// Mock 아이디어 상세 데이터
export const mockIdeaDetails: Record<
  number,
  {
    idea_info: IdeaInfoData;
    provider_info: ProviderInfo;
    requirements: Requirements;
  }
> = {
  1: {
    idea_info: {
      id: 1,
      subject: 'AI/머신러닝',
      subject_id: 1,
      title:
        '🤖 AI 기반 개인 맞춤형 학습 플랫폼 🤖 AI 기반 개인 맞춤형 학습 플랫폼 🤖 AI 기반 개인 맞춤형 학습 플랫폼 🤖 AI 기반 개인 맞춤형 학습 플랫폼 🤖 AI 기반 개인 맞춤형 학습 플랫폼',
      is_active: true,
      summary:
        '사용자의 학습 패턴을 분석하여 개인화된 학습 경로를 제공하는 AI 플랫폼입니다. 머신러닝을 통해 최적의 학습 방법을 추천합니다.',
      content: `
## 프로젝트 개요
AI 기반 개인 맞춤형 학습 플랫폼은 사용자의 학습 패턴, 선호도, 성취도를 분석하여 최적의 학습 경로를 제공하는 혁신적인 교육 솔루션입니다.

## 주요 기능

### 1. 학습 패턴 분석
- 사용자의 학습 시간, 집중도, 선호하는 학습 방식을 AI가 분석
- 개인별 최적의 학습 시간대와 학습량을 추천

### 2. 개인화된 학습 경로
- 각 사용자의 수준에 맞는 커리큘럼 자동 생성
- 약점 보완을 위한 맞춤형 문제 추천

### 3. 실시간 피드백
- 학습 진행 상황을 실시간으로 모니터링
- 즉각적인 피드백과 개선 방안 제시

### 4. 학습 동기 부여
- 게임화 요소를 통한 학습 동기 유발
- 소셜 기능으로 다른 학습자와의 경쟁 및 협력

## 기술 스택
- **Frontend**: React, TypeScript, D3.js
- **Backend**: Python, FastAPI, PostgreSQL
- **ML**: TensorFlow, scikit-learn, pandas
- **Infrastructure**: AWS, Docker, Kubernetes

## 기대 효과
- 개인별 학습 효율성 40% 향상
- 학습 완료율 60% 증가
- 사용자 만족도 90% 이상

이 프로젝트를 통해 교육의 개인화를 실현하고, 모든 학습자가 자신만의 최적화된 학습 경험을 할 수 있도록 지원하겠습니다.
      `,
      is_bookmarked: false,
    },
    provider_info: {
      id: 101,
      name: '김다영',
      univ: '서울대학교',
      role: 'PM',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: '프로젝트 전반의 기획 및 관리를 담당할 PM을 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Figma', 'Notion', 'Jira'],
        current_members: [mockMembers[0]],
        ratio: '100%',
      },
      pd: {
        requirement: 'UX/UI 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Figma', 'Adobe XD', 'Sketch'],
        current_members: [mockMembers[1]],
        ratio: '50%',
      },
      fe: {
        requirement: 'React 및 TypeScript 경험이 있는 프론트엔드 개발자를 찾습니다.',
        current_count: 0,
        max_count: 2,
        required_tech_stacks: ['React', 'TypeScript', 'D3.js'],
        current_members: [],
        ratio: '0%',
      },
      be: {
        requirement: 'Python 및 AI/ML 경험이 있는 백엔드 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Python', 'FastAPI', 'TensorFlow', 'PostgreSQL'],
        current_members: [mockMembers[2], mockMembers[2], mockMembers[2]],
        ratio: '50%',
      },
    },
  },
  2: {
    idea_info: {
      id: 2,
      subject: '웹 개발',
      subject_id: 2,
      title: '🌐 실시간 협업 코딩 플랫폼',
      is_active: true,
      summary:
        '개발자들이 실시간으로 코드를 작성하고 리뷰할 수 있는 웹 기반 플랫폼입니다. 화상 통화와 코드 에디터가 통합되어 있습니다.',
      content: `
## 프로젝트 소개
실시간 협업 코딩 플랫폼은 원격 개발 환경에서 개발자들이 효율적으로 협업할 수 있도록 지원하는 통합 개발 플랫폼입니다.

## 핵심 기능

### 1. 실시간 코드 에디터
- 멀티 커서 지원으로 여러 개발자가 동시에 코드 작성
- 실시간 코드 하이라이팅 및 자동 완성
- 코드 버전 관리 및 변경 이력 추적

### 2. 통합 화상 통화
- 코드 에디터와 통합된 화상 통화 시스템
- 화면 공유 및 코드 포인팅 기능
- 음성 채팅 및 텍스트 채팅 지원

### 3. 코드 리뷰 시스템
- 라인별 코멘트 및 리뷰 기능
- 코드 변경사항 하이라이팅
- 리뷰 승인 및 머지 프로세스

### 4. 프로젝트 관리
- 태스크 관리 및 진행 상황 추적
- 브랜치 관리 및 충돌 해결
- 이슈 트래킹 시스템

## 기술 스택
- **Frontend**: React, TypeScript, Monaco Editor, WebRTC
- **Backend**: Node.js, Express, Socket.io, PostgreSQL
- **Real-time**: WebSocket, WebRTC, Redis
- **DevOps**: Docker, AWS, Nginx

## 타겟 사용자
- 원격 개발팀
- 오픈소스 프로젝트 기여자
- 코딩 교육 기관
- 개발 스터디 그룹

이 플랫폼을 통해 지리적 제약 없이 효율적인 협업 개발 환경을 제공하겠습니다.
      `,
      is_bookmarked: true,
    },
    provider_info: {
      id: 102,
      name: '이준호',
      univ: '연세대학교',
      role: 'FE',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: '프로젝트 일정 관리와 팀 조율을 담당할 PM을 찾습니다.',
        current_count: 0,
        max_count: 1,
        required_tech_stacks: ['Jira', 'Slack', 'Notion'],
        current_members: [],
        ratio: '0%',
      },
      pd: {
        requirement: '사용자 경험 설계 및 UI 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Figma', 'Adobe XD', 'Principle'],
        current_members: [mockMembers[1]],
        ratio: '100%',
      },
      fe: {
        requirement: 'React 및 WebRTC 경험이 있는 프론트엔드 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['React', 'TypeScript', 'WebRTC', 'Socket.io'],
        current_members: [mockMembers[0]],
        ratio: '50%',
      },
      be: {
        requirement: 'Node.js 및 실시간 통신 경험이 있는 백엔드 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Node.js', 'Express', 'Socket.io', 'Redis'],
        current_members: [mockMembers[2]],
        ratio: '50%',
      },
    },
  },
  3: {
    idea_info: {
      id: 3,
      subject: '모바일 개발',
      subject_id: 3,
      title: '📱 지역 커뮤니티 연결 모바일 앱',
      is_active: false,
      summary: '같은 지역에 거주하는 사람들을 연결하여 지역 소식, 모임, 중고 거래 등을 할 수 있는 모바일 앱입니다.',
      content: `
## 프로젝트 개요
지역 커뮤니티 연결 모바일 앱은 같은 지역에 거주하는 사람들을 연결하여 지역 기반 소통과 활동을 촉진하는 플랫폼입니다.

## 주요 기능

### 1. 지역 기반 커뮤니티
- GPS 기반 위치 인증 시스템
- 지역별 게시판 및 소식 공유
- 동네 이벤트 및 모임 정보

### 2. 중고 거래 시스템
- 지역 내 중고 물품 거래
- 안전한 거래를 위한 인증 시스템
- 거래 후기 및 평점 시스템

### 3. 지역 서비스 연결
- 지역 상점 및 서비스 업체 정보
- 할인 쿠폰 및 이벤트 정보
- 배달 음식 공동 주문 기능

### 4. 소셜 네트워킹
- 관심사 기반 소모임 매칭
- 지역 내 친구 찾기
- 동네 운동 메이트 찾기

## 기술 스택
- **Mobile**: React Native, TypeScript
- **Backend**: Node.js, Express, MongoDB
- **Map**: Google Maps API, Geolocation API
- **Push**: Firebase Cloud Messaging
- **Payment**: 아임포트 결제 시스템

## 기대 효과
- 지역 사회 활성화
- 로컬 비즈니스 지원
- 사회적 유대감 강화
- 지역 경제 활성화

지역 커뮤니티의 연결고리 역할을 하며, 더 따뜻한 이웃 사회를 만들어가겠습니다.
      `,
      is_bookmarked: false,
    },
    provider_info: {
      id: 103,
      name: '박서연',
      univ: '고려대학교',
      role: 'FE',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: '모바일 앱 프로젝트 경험이 있는 PM을 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Jira', 'Figma', 'Analytics'],
        current_members: [mockMembers[0]],
        ratio: '100%',
      },
      pd: {
        requirement: '모바일 UX/UI 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Figma', 'Sketch', 'Principle'],
        current_members: [mockMembers[1]],
        ratio: '100%',
      },
      fe: {
        requirement: 'React Native 경험이 있는 모바일 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['React Native', 'TypeScript', 'Redux'],
        current_members: [mockMembers[2]],
        ratio: '50%',
      },
      be: {
        requirement: 'Node.js 및 MongoDB 경험이 있는 백엔드 개발자를 찾습니다.',
        current_count: 0,
        max_count: 1,
        required_tech_stacks: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        current_members: [],
        ratio: '0%',
      },
    },
  },
  4: {
    idea_info: {
      id: 4,
      subject: '게임',
      subject_id: 4,
      title: '🎮 교육용 코딩 게임',
      is_active: true,
      summary:
        '어린이들이 게임을 통해 프로그래밍을 학습할 수 있는 교육용 게임입니다. 단계별 미션을 통해 코딩 개념을 익힐 수 있습니다.',
      content: `
## 프로젝트 개요
교육용 코딩 게임은 어린이들이 재미있게 프로그래밍을 배울 수 있도록 설계된 게임화된 학습 플랫폼입니다.

## 게임 특징

### 1. 단계별 학습 시스템
- 프로그래밍 기초 개념을 단계별로 학습
- 각 단계별 미션과 도전 과제 제공
- 진행 상황에 따른 배지 및 보상 시스템

### 2. 시각적 프로그래밍
- 드래그 앤 드롭 방식의 블록 코딩
- 시각적 피드백과 애니메이션 효과
- 코드 실행 결과의 즉각적인 확인

### 3. 스토리 기반 학습
- 흥미로운 스토리라인과 캐릭터
- 문제 해결 과정의 게임화
- 협동 미션과 경쟁 요소

### 4. 교육자 도구
- 학습 진도 관리 시스템
- 개별 학습자 분석 리포트
- 커리큘럼 커스터마이징 도구

## 기술 스택
- **Game Engine**: Unity, C#
- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, MongoDB
- **Graphics**: Adobe Illustrator, Blender
- **Analytics**: Google Analytics, Mixpanel

## 교육 효과
- 논리적 사고력 향상
- 문제 해결 능력 개발
- 창의적 사고 증진
- 프로그래밍 기초 습득

놀이를 통한 학습으로 아이들이 프로그래밍을 즐겁게 배울 수 있는 환경을 제공하겠습니다.
      `,
      is_bookmarked: true,
    },
    provider_info: {
      id: 104,
      name: '최민지',
      univ: '성균관대학교',
      role: 'PM',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: '게임 기획 및 교육 콘텐츠 기획 경험이 있는 PM을 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Unity', 'Game Design', 'Educational Content'],
        current_members: [mockMembers[0]],
        ratio: '100%',
      },
      pd: {
        requirement: '게임 UI/UX 디자인 및 캐릭터 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 0,
        max_count: 2,
        required_tech_stacks: ['Adobe Illustrator', 'Blender', 'Unity UI'],
        current_members: [],
        ratio: '0%',
      },
      fe: {
        requirement: '게임 개발 및 Unity 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Unity', 'C#', 'Game Development'],
        current_members: [mockMembers[1]],
        ratio: '50%',
      },
      be: {
        requirement: '게임 서버 및 사용자 데이터 관리 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Node.js', 'MongoDB', 'Analytics'],
        current_members: [mockMembers[2]],
        ratio: '100%',
      },
    },
  },
  5: {
    idea_info: {
      id: 5,
      subject: '데이터 분석',
      subject_id: 5,
      title: '📊 소상공인을 위한 매출 분석 도구',
      is_active: true,
      summary:
        '소상공인들이 쉽게 사용할 수 있는 매출 분석 및 예측 도구입니다. 간단한 데이터 입력만으로 매출 트렌드를 파악할 수 있습니다.',
      content: `
## 프로젝트 배경
소상공인들이 복잡한 매출 데이터를 쉽게 분석하고 비즈니스 인사이트를 얻을 수 있도록 지원하는 도구입니다.

## 주요 기능

### 1. 매출 데이터 분석
- 일별, 주별, 월별 매출 분석
- 상품별 매출 비교 분석
- 고객 구매 패턴 분석

### 2. 예측 분석
- 매출 트렌드 예측
- 재고 관리 최적화
- 계절성 분석 및 대응 방안

### 3. 시각화 대시보드
- 직관적인 차트와 그래프
- 주요 KPI 지표 모니터링
- 모바일 친화적 반응형 디자인

### 4. 리포트 생성
- 자동 매출 리포트 생성
- 개선 방안 제안
- 경쟁사 비교 분석

## 기술 스택
- **Frontend**: React, TypeScript, D3.js, Chart.js
- **Backend**: Python, Django, PostgreSQL
- **Data Analysis**: pandas, numpy, scikit-learn
- **Visualization**: Plotly, Tableau
- **Deploy**: AWS, Docker

## 타겟 사용자
- 소상공인 및 자영업자
- 중소기업 운영자
- 창업 준비자
- 마케팅 담당자

## 기대 효과
- 데이터 기반 의사결정 지원
- 매출 증대 방안 제시
- 운영 효율성 향상
- 비즈니스 성장 가속화

복잡한 데이터 분석을 단순화하여 누구나 쉽게 비즈니스 인사이트를 얻을 수 있도록 하겠습니다.
      `,
      is_bookmarked: false,
    },
    provider_info: {
      id: 105,
      name: '정하늘',
      univ: '한양대학교',
      role: 'BE',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: '데이터 분석 프로젝트 기획 경험이 있는 PM을 찾습니다.',
        current_count: 0,
        max_count: 1,
        required_tech_stacks: ['Data Analysis', 'Business Intelligence', 'Project Management'],
        current_members: [],
        ratio: '0%',
      },
      pd: {
        requirement: '대시보드 UI/UX 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Figma', 'Data Visualization', 'Dashboard Design'],
        current_members: [mockMembers[0]],
        ratio: '100%',
      },
      fe: {
        requirement: '데이터 시각화 및 대시보드 개발 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['React', 'D3.js', 'Chart.js', 'TypeScript'],
        current_members: [mockMembers[1]],
        ratio: '50%',
      },
      be: {
        requirement: '데이터 분석 및 머신러닝 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Python', 'Django', 'pandas', 'scikit-learn'],
        current_members: [mockMembers[2]],
        ratio: '50%',
      },
    },
  },
  6: {
    idea_info: {
      id: 6,
      subject: 'AI/머신러닝',
      subject_id: 1,
      title: '🎵 AI 음악 추천 서비스',
      is_active: false,
      summary:
        '사용자의 음악 취향과 현재 상황을 분석하여 최적의 음악을 추천하는 AI 서비스입니다. 날씨, 시간, 위치 정보를 활용합니다.',
      content: `
## 프로젝트 개요
AI 음악 추천 서비스는 사용자의 음악 취향, 현재 상황, 감정 상태를 종합적으로 분석하여 개인화된 음악 추천을 제공합니다.

## 핵심 기능

### 1. 상황 기반 추천
- 날씨 정보 연동한 음악 추천
- 시간대별 맞춤 플레이리스트
- 위치 기반 분위기 음악 제공

### 2. 감정 분석
- 사용자 입력 기반 감정 분석
- 음성 톤 분석을 통한 감정 인식
- 감정 상태별 음악 큐레이션

### 3. 학습 알고리즘
- 사용자 청취 패턴 학습
- 실시간 피드백 반영
- 협업 필터링 기반 추천

### 4. 소셜 기능
- 친구와 플레이리스트 공유
- 음악 취향 분석 리포트
- 커뮤니티 기반 음악 발견

## 기술 스택
- **AI/ML**: Python, TensorFlow, scikit-learn
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React Native, TypeScript
- **APIs**: Spotify API, Weather API, Location API
- **Deploy**: AWS, Docker

## 차별화 요소
- 다중 컨텍스트 분석
- 실시간 상황 인식
- 고도화된 개인화 알고리즘
- 직관적인 사용자 경험

음악과 AI의 만남으로 사용자에게 최적화된 음악 경험을 제공하겠습니다.
      `,
      is_bookmarked: false,
    },
    provider_info: {
      id: 106,
      name: '윤서우',
      univ: '서강대학교',
      role: 'BE',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: 'AI 프로젝트 기획 및 음악 서비스 기획 경험이 있는 PM을 찾습니다.',
        current_count: 0,
        max_count: 1,
        required_tech_stacks: ['AI Product Management', 'Music Industry', 'Data Analytics'],
        current_members: [],
        ratio: '0%',
      },
      pd: {
        requirement: '음악 앱 UX/UI 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Figma', 'Music App Design', 'User Research'],
        current_members: [mockMembers[0]],
        ratio: '100%',
      },
      fe: {
        requirement: '모바일 앱 개발 및 음악 API 연동 경험이 있는 개발자를 찾습니다.',
        current_count: 0,
        max_count: 2,
        required_tech_stacks: ['React Native', 'TypeScript', 'Music APIs'],
        current_members: [],
        ratio: '0%',
      },
      be: {
        requirement: 'AI/ML 및 추천 시스템 개발 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Python', 'TensorFlow', 'Recommendation System'],
        current_members: [mockMembers[1]],
        ratio: '50%',
      },
    },
  },
  7: {
    idea_info: {
      id: 7,
      subject: '웹 개발',
      subject_id: 2,
      title: '💰 개인 가계부 관리 플랫폼',
      is_active: true,
      summary:
        '가계부 작성부터 지출 분석, 예산 관리까지 한 번에 할 수 있는 웹 플랫폼입니다. 은행 계좌 연동을 통한 자동 분류 기능을 제공합니다.',
      content: `
## 프로젝트 소개
개인 가계부 관리 플랫폼은 개인의 재정 관리를 체계적이고 효율적으로 도와주는 종합 금융 관리 도구입니다.

## 주요 기능

### 1. 자동 가계부 작성
- 은행 계좌 연동을 통한 자동 입출금 기록
- 카드 사용 내역 실시간 반영
- 지출 항목 자동 분류 및 태그 기능

### 2. 예산 관리
- 월별/주별 예산 설정
- 카테고리별 지출 한도 관리
- 예산 초과 시 알림 기능

### 3. 분석 및 리포트
- 지출 패턴 시각화
- 월별/연별 재정 분석 리포트
- 절약 목표 달성률 추적

### 4. 목표 관리
- 저축 목표 설정 및 추적
- 투자 포트폴리오 관리
- 재정 목표 달성 로드맵

## 기술 스택
- **Frontend**: React, TypeScript, Chart.js
- **Backend**: Spring Boot, Java, PostgreSQL
- **Security**: OAuth 2.0, JWT, 데이터 암호화
- **APIs**: 오픈뱅킹 API, PG사 API
- **Deploy**: AWS, Docker, Kubernetes

## 보안 및 개인정보
- 금융 데이터 암호화 저장
- 2단계 인증 시스템
- 개인정보 보호 규정 준수
- 정기적인 보안 감사

## 비즈니스 모델
- 프리미엄 기능 구독 서비스
- 금융 상품 추천 수수료
- 개인 재정 컨설팅 서비스

체계적인 가계부 관리로 사용자의 재정 건강을 지키는 플랫폼을 만들겠습니다.
      `,
      is_bookmarked: true,
    },
    provider_info: {
      id: 107,
      name: '강지훈',
      univ: '중앙대학교',
      role: 'BE',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: '핀테크 또는 금융 서비스 기획 경험이 있는 PM을 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['FinTech', 'Financial Services', 'Compliance'],
        current_members: [mockMembers[0]],
        ratio: '100%',
      },
      pd: {
        requirement: '금융 앱 UX/UI 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Figma', 'Financial UX', 'Data Visualization'],
        current_members: [mockMembers[1]],
        ratio: '100%',
      },
      fe: {
        requirement: '금융 서비스 프론트엔드 개발 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['React', 'TypeScript', 'Chart.js', 'Security'],
        current_members: [mockMembers[2]],
        ratio: '50%',
      },
      be: {
        requirement: '금융 API 연동 및 보안 처리 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Spring Boot', 'Java', 'Financial APIs', 'Security'],
        current_members: [mockMembers[0]],
        ratio: '50%',
      },
    },
  },
  8: {
    idea_info: {
      id: 8,
      subject: '모바일 개발',
      subject_id: 3,
      title: '🌿 환경 보호 실천 앱',
      is_active: true,
      summary:
        '일상에서 환경 보호를 실천할 수 있는 방법들을 제안하고, 실천 내용을 기록하여 포인트를 적립할 수 있는 모바일 앱입니다.',
      content: `
## 프로젝트 미션
환경 보호 실천 앱은 개인의 일상 속 환경 친화적 행동을 촉진하고 지속 가능한 라이프스타일을 지원하는 플랫폼입니다.

## 핵심 기능

### 1. 일일 환경 챌린지
- 매일 새로운 환경 보호 실천 과제 제공
- 난이도별 챌린지 (쉬움/보통/어려움)
- 개인별 맞춤 챌린지 추천

### 2. 실천 인증 시스템
- 사진 인증을 통한 실천 기록
- GPS 기반 위치 인증
- 커뮤니티 검증 시스템

### 3. 포인트 및 리워드
- 실천 활동별 포인트 적립
- 포인트 기반 친환경 제품 할인
- 배지 및 레벨 시스템

### 4. 환경 영향 추적
- 개인 탄소 발자국 측정
- 환경 보호 효과 시각화
- 월별/연별 환경 기여도 리포트

### 5. 커뮤니티 활동
- 지역별 환경 보호 그룹
- 집단 챌린지 및 캠페인
- 환경 보호 팁 공유

## 기술 스택
- **Mobile**: Flutter, Dart
- **Backend**: Node.js, Express, MongoDB
- **AI**: Python, TensorFlow (이미지 인식)
- **Map**: Google Maps API
- **Push**: Firebase Cloud Messaging

## 파트너십
- 환경 단체 연계
- 친환경 기업 제품 할인
- 정부 환경 정책 연동
- 재활용 업체 협력

## 사회적 임팩트
- 개인 환경 의식 향상
- 집단 환경 보호 활동 증진
- 지속 가능한 소비 문화 조성
- 환경 보호 인식 확산

작은 실천이 큰 변화를 만드는 환경 보호 플랫폼을 구현하겠습니다.
      `,
      is_bookmarked: false,
    },
    provider_info: {
      id: 108,
      name: '송민아',
      univ: '이화여자대학교',
      role: 'PD',
      is_provider: true,
    },
    requirements: {
      pm: {
        requirement: '소셜 임팩트 또는 환경 관련 프로젝트 기획 경험이 있는 PM을 찾습니다.',
        current_count: 0,
        max_count: 1,
        required_tech_stacks: ['Social Impact', 'Environmental Projects', 'Community Building'],
        current_members: [],
        ratio: '0%',
      },
      pd: {
        requirement: '모바일 앱 UX/UI 디자인 경험이 있는 PD를 찾습니다.',
        current_count: 1,
        max_count: 1,
        required_tech_stacks: ['Figma', 'Mobile UX', 'Gamification Design'],
        current_members: [mockMembers[0]],
        ratio: '100%',
      },
      fe: {
        requirement: 'Flutter 모바일 앱 개발 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Flutter', 'Dart', 'Mobile Development'],
        current_members: [mockMembers[1]],
        ratio: '50%',
      },
      be: {
        requirement: 'Node.js 및 이미지 처리 경험이 있는 개발자를 찾습니다.',
        current_count: 1,
        max_count: 2,
        required_tech_stacks: ['Node.js', 'Express', 'Image Processing', 'AI'],
        current_members: [mockMembers[2]],
        ratio: '50%',
      },
    },
  },
};

// Mock 팀 멤버 데이터
const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: '김다영',
    img_url: 'https://via.placeholder.com/40',
    is_leader: true,
  },
  {
    id: 2,
    name: '이준호',
    img_url: 'https://via.placeholder.com/40',
    is_leader: false,
  },
  {
    id: 3,
    name: '박서연',
    img_url: 'https://via.placeholder.com/40',
    is_leader: false,
  },
  {
    id: 4,
    name: '최민지',
    img_url: 'https://via.placeholder.com/40',
    is_leader: false,
  },
];

// Mock 팀 정보 데이터
export const mockTeamInfo: TeamInfo = {
  team_building: 'RECRUITING',
  number: 1,
  name: 'AI 학습 플랫폼 팀',
  role: {
    pm: {
      max_count: 1,
      current_count: 1,
      members: [mockTeamMembers[0]],
    },
    pd: {
      max_count: 2,
      current_count: 1,
      members: [mockTeamMembers[1]],
    },
    fe: {
      max_count: 2,
      current_count: 0,
      members: [],
    },
    be: {
      max_count: 2,
      current_count: 1,
      members: [mockTeamMembers[2]],
    },
  },
};

// Mock 지원자 데이터
export const mockApplies: Applies[] = [
  {
    id: 1,
    preference: 1,
    motivation:
      'React와 TypeScript를 활용한 프론트엔드 개발 경험이 풍부하며, AI 기반 학습 플랫폼 개발에 관심이 많습니다.',
    role: 'FE',
    status: ApplyStatus.WAITING,
    user: {
      id: 101,
      name: '한지민',
      univ: '서울대학교',
    },
  },
  {
    id: 2,
    preference: 2,
    motivation: 'Vue.js와 Nuxt.js 경험이 있으며, 사용자 경험을 중시하는 프론트엔드 개발을 추구합니다.',
    role: 'FE',
    status: ApplyStatus.WAITING,
    user: {
      id: 102,
      name: '정소영',
      univ: '연세대학교',
    },
  },
  {
    id: 3,
    preference: 1,
    motivation: 'Python과 FastAPI를 활용한 백엔드 개발 경험이 있으며, 머신러닝 모델 서빙 경험도 있습니다.',
    role: 'BE',
    status: ApplyStatus.ACCEPTED,
    user: {
      id: 103,
      name: '김태현',
      univ: '고려대학교',
    },
  },
  {
    id: 4,
    preference: 3,
    motivation: 'Node.js와 Express를 주로 사용하며, 데이터베이스 설계 및 API 개발에 자신 있습니다.',
    role: 'BE',
    status: ApplyStatus.WAITING,
    user: {
      id: 104,
      name: '오민수',
      univ: '한양대학교',
    },
  },
  {
    id: 5,
    preference: 1,
    motivation: 'Adobe XD와 Figma를 활용한 UI/UX 디자인 경험이 있으며, 사용자 리서치에도 관심이 많습니다.',
    role: 'PD',
    status: ApplyStatus.WAITING,
    user: {
      id: 105,
      name: '이유진',
      univ: '성균관대학교',
    },
  },
  {
    id: 6,
    preference: 2,
    motivation: 'React Native 개발 경험이 있어 모바일 앱 개발도 가능하며, 반응형 웹 디자인에 능숙합니다.',
    role: 'FE',
    status: ApplyStatus.REJECTED,
    user: {
      id: 106,
      name: '박진우',
      univ: '중앙대학교',
    },
  },
  {
    id: 7,
    preference: 1,
    motivation: 'Spring Boot와 JPA를 활용한 백엔드 개발 경험이 있으며, 마이크로서비스 아키텍처에 관심이 많습니다.',
    role: 'BE',
    status: ApplyStatus.WAITING,
    user: {
      id: 107,
      name: '강민호',
      univ: '서강대학교',
    },
  },
  {
    id: 8,
    preference: 2,
    motivation: 'Sketch와 InVision을 활용한 프로토타이핑 경험이 있으며, 디자인 시스템 구축에 관심이 있습니다.',
    role: 'PD',
    status: ApplyStatus.WAITING,
    user: {
      id: 108,
      name: '윤서현',
      univ: '이화여자대학교',
    },
  },
];

// Mock 기간 정보 데이터
export const mockPeriod = {
  current_period: 'PHASE1_TEAM_BUILDING' as const,
  current_phase: 1,
  idea_submission_start: new Date('2024-02-15T00:00:00Z'),
  idea_submission_end: new Date('2024-02-29T23:59:59Z'),
  phase1_team_building_start: new Date('2024-03-01T00:00:00Z'),
  phase1_team_building_end: new Date('2024-03-10T23:59:59Z'),
  phase1_confirmation_start: new Date('2024-03-11T00:00:00Z'),
  phase1_confirmation_end: new Date('2024-03-15T23:59:59Z'),
  phase2_team_building_start: new Date('2024-03-16T00:00:00Z'),
  phase2_team_building_end: new Date('2024-03-25T23:59:59Z'),
  phase2_confirmation_start: new Date('2024-03-26T00:00:00Z'),
  phase2_confirmation_end: new Date('2024-03-30T23:59:59Z'),
  phase3_team_building_start: new Date('2024-04-01T00:00:00Z'),
  phase3_team_building_end: new Date('2024-04-10T23:59:59Z'),
  phase3_confirmation_start: new Date('2024-04-11T00:00:00Z'),
  phase3_confirmation_end: new Date('2024-04-15T23:59:59Z'),
  hackathon_start: new Date('2024-04-16T00:00:00Z'),
  hackathon_end: new Date('2024-04-18T23:59:59Z'),
};

// 각 차수별 지원 현황 데이터
export const mockAppliesByPhase: Record<number, Applies[]> = {
  1: mockApplies.filter((apply) => [1, 2, 3, 5].includes(apply.id)), // 1차 지원자들
  2: mockApplies.filter((apply) => [4, 6, 7].includes(apply.id)), // 2차 지원자들
  3: mockApplies.filter((apply) => [8].includes(apply.id)), // 3차 지원자들
};

// Mock 사용자 정보 데이터
export const mockUserInfo = {
  name: '김다영',
  email: 'dayoung.kim@example.com',
  univ: '서울대학교',
  img_url: 'https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png',
  introduction: `# 안녕하세요! 👋

저는 **프로덕트 매니저**로 활동하고 있으며, 사용자 중심의 서비스를 만드는 것에 열정을 가지고 있습니다.

## 🎯 관심 분야
- **AI/머신러닝** 기반 서비스 기획
- **사용자 경험 설계**
- **데이터 기반 의사결정**

## 💼 경험
- 구름톤 유니브 4기 참가
- 교육 플랫폼 서비스 기획 경험
- 사용자 리서치 및 분석

## 🌟 목표
혁신적인 기술과 사용자 경험을 결합하여 **사회에 긍정적인 영향**을 미치는 서비스를 만들고 싶습니다.

함께 멋진 프로젝트를 만들어갈 팀원들을 찾고 있어요! 🚀`,
  stacks: ['Figma', 'Notion', 'Google Analytics', 'Jira', 'Slack', 'Python', 'SQL'],
  links: [
    {
      type: LinkType.GITHUB,
      url: 'https://github.com/dayoung-kim',
    },
    {
      type: LinkType.BLOG,
      url: 'https://dayoung-kim.blog.com',
    },
    {
      type: LinkType.NOTION,
      url: 'https://notion.so/dayoung-kim',
    },
    {
      type: LinkType.LINKEDIN,
      url: 'https://linkedin.com/in/dayoung-kim',
    },
    {
      type: LinkType.LINKEDIN,
      url: 'https://linkedin.com/in/dayoung-kim',
    },
    {
      type: LinkType.LINKEDIN,
      url: 'https://linkedin.com/in/dayoung-kim',
    },
    {
      type: LinkType.LINKEDIN,
      url: 'https://linkedin.com/in/dayoung-kim',
    },
    {
      type: LinkType.LINKEDIN,
      url: 'https://linkedin.com/in/dayoung-kim',
    },
    {
      type: LinkType.LINKEDIN,
      url: 'https://linkedin.com/in/dayoung-kim',
    },
    {
      type: LinkType.LINKEDIN,
      url: 'https://linkedin.com/in/dayoung-kim',
    },
  ],
  is_me: true,
};

// Mock 다른 사용자들 정보
export const mockOtherUsers: Record<string, typeof mockUserInfo> = {
  '1': {
    name: '이준호',
    email: 'junho.lee@example.com',
    univ: '연세대학교',
    img_url: 'https://via.placeholder.com/150',
    introduction: `# 프론트엔드 개발자 이준호입니다! 💻

**React**와 **TypeScript**를 주로 사용하며, 사용자 친화적인 인터페이스를 만드는 것을 좋아합니다.

## 🛠️ 기술 스택
- **Frontend**: React, TypeScript, Next.js
- **Styling**: Styled-components, SCSS, Tailwind CSS
- **State Management**: Redux, Zustand
- **Testing**: Jest, React Testing Library

## 🎨 디자인 시스템
컴포넌트 재사용성과 일관성을 중시하며, **디자인 시스템** 구축에 관심이 많습니다.

## 📱 최근 프로젝트
- **실시간 협업 도구** 프론트엔드 개발
- **반응형 웹 애플리케이션** 구현
- **성능 최적화** 및 **접근성 개선**

항상 새로운 기술을 배우고 도전하는 개발자가 되고 싶습니다! 🌟`,
    stacks: ['React', 'TypeScript', 'Next.js', 'Styled-components', 'Redux', 'Jest', 'Figma'],
    links: [
      {
        type: LinkType.GITHUB,
        url: 'https://github.com/junho-lee',
      },
      {
        type: LinkType.BLOG,
        url: 'https://junho-dev.blog.com',
      },
    ],
    is_me: false,
  },
  '2': {
    name: '박서연',
    email: 'seoyeon.park@example.com',
    univ: '고려대학교',
    img_url: 'https://via.placeholder.com/150',
    introduction: `# UX/UI 디자이너 박서연입니다! 🎨

사용자의 **진짜 문제**를 찾고 해결하는 디자인을 추구합니다.

## 🎯 디자인 철학
> "Good design is as little design as possible" - Dieter Rams

사용자 중심의 **미니멀하고 직관적인** 디자인을 지향합니다.

## 🔍 디자인 프로세스
1. **User Research** - 사용자 인터뷰 및 설문조사
2. **Information Architecture** - 정보 구조 설계
3. **Wireframing & Prototyping** - 와이어프레임 및 프로토타입 제작
4. **Visual Design** - 시각적 디자인 완성
5. **Usability Testing** - 사용성 테스트 및 개선

## 🏆 수상 경력
- **대학생 UX 디자인 공모전** 대상 (2023)
- **모바일 앱 디자인 경진대회** 우수상 (2023)

함께 사용자에게 사랑받는 서비스를 만들어요! 💙`,
    stacks: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Photoshop', 'Illustrator', 'Miro'],
    links: [
      {
        type: LinkType.NOTION,
        url: 'https://notion.so/seoyeon-design',
      },
      {
        type: LinkType.BLOG,
        url: 'https://seoyeon-design.blog.com',
      },
      {
        type: LinkType.LINKEDIN,
        url: 'https://linkedin.com/in/seoyeon-park',
      },
    ],
    is_me: false,
  },
  '3': {
    name: '최민지',
    email: 'minji.choi@example.com',
    univ: '성균관대학교',
    img_url: 'https://via.placeholder.com/150',
    introduction: `# 백엔드 개발자 최민지입니다! ⚡

**확장 가능한 시스템**을 설계하고 **안정적인 서비스**를 만드는 것을 좋아합니다.

## 🏗️ 아키텍처 설계
- **MSA**(Microservices Architecture) 설계 경험
- **도커**를 활용한 컨테이너 환경 구축
- **쿠버네티스**를 통한 오케스트레이션

## 🗄️ 데이터베이스
- **PostgreSQL**, **MongoDB** 운영 경험
- **Redis**를 활용한 캐싱 전략
- **데이터 모델링** 및 **쿼리 최적화**

## 🔧 개발 환경
- **CI/CD** 파이프라인 구축
- **모니터링** 및 **로깅** 시스템 구축
- **성능 테스트** 및 **부하 테스트**

## 🎯 목표
대규모 트래픽을 처리할 수 있는 **견고한 백엔드 시스템**을 만들고 싶습니다.

좋은 코드는 **협업을 통해** 만들어진다고 생각합니다! 🤝`,
    stacks: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    links: [
      {
        type: LinkType.GITHUB,
        url: 'https://github.com/minji-choi',
      },
      {
        type: LinkType.BLOG,
        url: 'https://minji-backend.blog.com',
      },
      {
        type: LinkType.ETC,
        url: 'https://minji-dev.portfolio.com',
      },
    ],
    is_me: false,
  },
};

// Mock 지원 현황 데이터 (사용자가 지원한 아이디어들)
export const mockMyApplySummary = {
  applies: [
    {
      apply_info: {
        id: 1,
        status: ApplyStatus.WAITING,
        ratio: '1:2',
        preference: 1,
        motivation:
          'AI 기반 교육 플랫폼에 관심이 많고, 사용자 경험을 개선하는 PM 역할을 맡고 싶습니다. 교육 분야에서의 혁신을 통해 더 나은 학습 환경을 만들고 싶습니다.',
        role: 'PM' as const,
      },
      idea_info: {
        id: 1,
        title: '🤖 AI 기반 개인 맞춤형 학습 플랫폼',
      },
    },
    {
      apply_info: {
        id: 2,
        status: ApplyStatus.ACCEPTED,
        ratio: '1:1',
        preference: 2,
        motivation:
          '실시간 협업 도구의 기획과 사용자 경험 설계에 관심이 있습니다. 개발자들의 협업 효율성을 높이는 서비스를 만들고 싶습니다.',
        role: 'PM' as const,
      },
      idea_info: {
        id: 2,
        title: '🌐 실시간 협업 코딩 플랫폼',
      },
    },
    {
      apply_info: {
        id: 3,
        status: ApplyStatus.REJECTED,
        ratio: '3:1',
        preference: 3,
        motivation:
          '게임화된 교육 콘텐츠 기획에 도전해보고 싶습니다. 어린이들이 즐겁게 코딩을 배울 수 있는 환경을 만들어보고 싶습니다.',
        role: 'PM' as const,
      },
      idea_info: {
        id: 4,
        title: '🎮 교육용 코딩 게임',
      },
    },
  ],
};

// 각 차수별 지원 현황 데이터
export const mockMyApplySummaryByPhase: Record<number, typeof mockMyApplySummary> = {
  1: {
    applies: [
      {
        apply_info: {
          id: 1,
          status: ApplyStatus.WAITING,
          ratio: '1:2',
          preference: 1,
          motivation:
            'AI 기반 교육 플랫폼에 관심이 많고, 사용자 경험을 개선하는 PM 역할을 맡고 싶습니다. 교육 분야에서의 혁신을 통해 더 나은 학습 환경을 만들고 싶습니다.',
          role: 'PM' as const,
        },
        idea_info: {
          id: 1,
          title: '🤖 AI 기반 개인 맞춤형 학습 플랫폼',
        },
      },
      {
        apply_info: {
          id: 2,
          status: ApplyStatus.ACCEPTED,
          ratio: '1:1',
          preference: 2,
          motivation:
            '실시간 협업 도구의 기획과 사용자 경험 설계에 관심이 있습니다. 개발자들의 협업 효율성을 높이는 서비스를 만들고 싶습니다.',
          role: 'PM' as const,
        },
        idea_info: {
          id: 2,
          title: '🌐 실시간 협업 코딩 플랫폼',
        },
      },
    ],
  },
  2: {
    applies: [
      {
        apply_info: {
          id: 3,
          status: ApplyStatus.REJECTED,
          ratio: '3:1',
          preference: 1,
          motivation:
            '게임화된 교육 콘텐츠 기획에 도전해보고 싶습니다. 어린이들이 즐겁게 코딩을 배울 수 있는 환경을 만들어보고 싶습니다.',
          role: 'PM' as const,
        },
        idea_info: {
          id: 4,
          title: '🎮 교육용 코딩 게임',
        },
      },
      {
        apply_info: {
          id: 4,
          status: ApplyStatus.CONFIRMED,
          ratio: '1:1',
          preference: 2,
          motivation:
            '데이터 분석 도구의 사용자 경험을 개선하는 PM 역할을 맡고 싶습니다. 소상공인들이 쉽게 사용할 수 있는 인터페이스를 만들고 싶습니다.',
          role: 'PM' as const,
        },
        idea_info: {
          id: 5,
          title: '📊 소상공인을 위한 매출 분석 도구',
        },
      },
    ],
  },
  3: {
    applies: [
      {
        apply_info: {
          id: 5,
          status: ApplyStatus.WAITING,
          ratio: '2:1',
          preference: 1,
          motivation:
            '개인 가계부 관리 플랫폼의 기획과 사용자 경험 설계에 관심이 있습니다. 개인 재정 관리의 접근성을 높이는 서비스를 만들고 싶습니다.',
          role: 'PM' as const,
        },
        idea_info: {
          id: 7,
          title: '💰 개인 가계부 관리 플랫폼',
        },
      },
    ],
  },
};
