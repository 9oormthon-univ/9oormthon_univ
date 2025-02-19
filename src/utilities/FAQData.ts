export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQData: FAQItem[] = [
  {
    id: 2,
    question: '유니브 대표는 중앙 활동(해커톤) 참여가 불가능한가요?',
    answer: '대표는 해커톤에 직접 참가 또는 해커톤 현장 스태프, 둘 중 한 가지 방식으로 참여 가능합니다!',
  },
  {
    id: 3,
    question: '한 학교에서 여러 명이 유니브 대표를 지원하는 경우에는 어떻게 되나요?',
    answer: '대표 모집 시 진행되는 인터뷰를 기반으로 활동에 조금 더 적합하신 분을 대표로 선발합니다.',
  },
  {
    id: 4,
    question: '휴학생도 지원할 수 있나요?',
    answer:
      '당연히 가능합니다! 구름톤 유니브는 재학생, 휴학생, 졸업유예자까지 대학생 신분이라면 누구나 활동 가능합니다. ',
  },
  // {
  //   id: 5,
  //   question: '5기 모집은 언제인가요?',
  //   answer: '2025년 1월에 예정되어 있습니다!',
  // },
];

export default FAQData;
