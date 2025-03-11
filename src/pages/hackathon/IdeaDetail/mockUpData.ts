export const MOCK_IDEA_DETAIL = {
  idea_info: {
    id: 1,
    subject: 'AI 기반 추천 시스템',
    title: '인공지능을 활용한 맞춤 추천 서비스',
    is_active: true,
    summary: '사용자의 행동을 분석해 최적의 추천을 제공하는 AI 서비스',
    content: '이 프로젝트는 머신러닝을 활용하여 사용자 선호도를 분석하고, 맞춤형 추천을 제공하는 것을 목표로 합니다.',
    is_bookmarked: false,
  },
  provider_info: {
    id: 1,
    name: '홍길동',
    univ: '서울대학교',
    is_provider: false,
  },
  requirements: {
    pm: {
      requirement:
        '이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요! 이런 팀원과 함께 하고 싶어요!',
      current_count: 1,
      max_count: 2,
      required_tech_stacks: ['figma', 'bootstrap', 'cpp', 'cs', 'clion'],
      current_members: [
        {
          id: 1,
          img_url: 'https://via.placeholder.com/50',
          name: '김기획',
          univ: '서울대학교',
        },
        {
          id: 3,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
        {
          id: 4,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
        {
          id: 5,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
      ],
    },
    fe: {
      requirement: 'React 숙련자',
      current_count: 1,
      max_count: 2,
      required_tech_stacks: ['react', 'typescript', 'nextjs', 'nodejs', 'mongodb'],
      current_members: [
        {
          id: 2,
          img_url: 'https://via.placeholder.com/50',
          name: '이프론트',
          univ: '고려대학교',
        },
      ],
    },
    be: {
      requirement: 'Node.js 경험자',
      current_count: 0,
      max_count: 2,
      required_tech_stacks: ['nodejs', 'mongodb'],
      current_members: [],
    },
    pd: {
      requirement: 'UI/UX 디자인 경험자',
      current_count: 1,
      max_count: 1,
      required_tech_stacks: ['figma', 'aws'],
      current_members: [
        {
          id: 3,
          img_url: 'https://via.placeholder.com/50',
          name: '박디자인',
          univ: '연세대학교',
        },
      ],
    },
  },
};
