import { CakeIcon, GroupIcon, LightbulbIcon, LightningIcon, SchoolIcon } from '@goorm-dev/gds-icons';

import { DanpoongSmall } from '../assets';
import Img1 from '../assets/images/about/activity1.png';
import Img2 from '../assets/images/about/activity2.png';
import Img4 from '../assets/images/about/activity4.png';
import UnivInJeju from '../assets/images/activity_9oorm.png';
import Hackerthon from '../assets/images/activity_hackathon.png';

interface timelineDataType {
  Icon: string | React.FC;
  title: string;
  description: string;
}

export const TIMELINE_DATA: timelineDataType[] = [
  {
    Icon: GroupIcon,
    title: '9oormthonUNIV 3기 모집!',
    description: '단풍톤을 함께 할 3기 운영진과 참가자를 모집해요.\n2024년을 함께 마무리해요!',
  },
  {
    Icon: SchoolIcon,
    title: 'ORIENTATION',
    description: '구름톤 유니브 3기는 어떻게 진행될까요?\n오리엔테이션에서 알아보아요!',
  },
  {
    Icon: LightbulbIcon,
    title: 'ONBOARDING',
    description: '해커톤을 시작하기 이전, 해커톤에 대해 알아봐요!\n다양한 연사자분께서 협업에 대해 알려주실 거에요!',
  },
  {
    Icon: LightningIcon,
    title: '유니브별 스터디 기간',
    description: '단풍톤이 시작하기 이전 교내 스터디를 운영해요! 해커톤까지 열심히 준비해보아요!',
  },
  {
    Icon: DanpoongSmall,
    title: '무박 2일, 단풍톤',
    description: '구름톤 유니브의 하이라이트, 단풍톤!\n모두가 밤을 새워 아이디어를 실현하는 장이에요.',
  },
  {
    Icon: CakeIcon,
    title: '구름톤 유니브 애프터 파티',
    description: '해커톤의 여운을 이어갈 수 있도록 현직자와 수상자의 세미나,\n그리고 마무리 회고를 진행해요.',
  },
];

export const ACTIVITY_DATA = [
  {
    imgSrc: Img2,
    title: '온보딩',
    title_en: 'Onboarding',
    description:
      '단풍톤/단풍톤 진행이전에 \n온보딩을 통해 해커톤에 대해 다양한 인사이트를 얻어가세요!\n한 단계 더 성장할 수 있는 도약대가 될 거예요!',
  },
  {
    imgSrc: Img1,
    title: '스터디',
    title_en: 'STUDY',
    description:
      '제공받은 IDE, EDU, 인프런 쿠폰을 사용하여\n교내 미르미 혹은 교외 미르미들과 자유롭게 스터디를 진행할 수 있습니다.',
  },
  {
    imgSrc: Hackerthon,
    title: '해커톤',
    title_en: 'HACKATHON',
    description:
      '기획 1명, 디자인 1명, 프론트엔드 2명, 백엔드 2명 총 6명으로 하나의 팀을 구성하여 \n해커톤 기간까지 기획과 디자인 및 개발을 합니다. 봄에는 단풍톤, 가을에는 단풍톤이 진행됩니다.',
  },
  {
    imgSrc: Img4,
    title: '애프터 파티',
    title_en: 'AFTER PARTY',
    description:
      '본 해커톤이 끝난 후 2개 이상의 유니브가 모여 연합 해커톤 세미나를 진행하여 타 대학과 네트워킹을 더 할 수 있는 시간을 가질 수 있어요.',
  },
  {
    imgSrc: UnivInJeju,
    title: '구름톤 유니브 in JEJU',
    title_en: '9oormthonUNIV in JEJU',
    description:
      '9UAP는 9oormthonUNIV After Party의 약자로, 해커톤 대상 및 최우수 수상자들과 현직 전문가들이 세미나를 진행합니다. 또한 지금까지의 과정을 회고하는 시간을 갖습니다.',
  },
];

export const BENEFIT_ITEM_DATA = [
  {
    title: 'KDC/KDT',
    description: '카카오X구름 구름톤 트레이닝',
    url: 'https://ide.goorm.io/',
  },
  {
    title: '구름EDU',
    description: '모두를 위한 맞춤형 IT교육 ',
    url: 'https://ide.goorm.io/',
  },
  {
    title: '인프런',
    description: '나에게 딱 맞는 강의',
    url: 'https://ide.goorm.io/',
  },
];
