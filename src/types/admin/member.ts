import { PositionWithoutNull } from '../../constants/position';

export interface Member {
  name: string;
  img_url: string;
  team?: string;
  role: PositionWithoutNull;
  univ: {
    id: number;
    name: string;
  };
  email: string;
  phone_number: string;
  generations: number[];
}

export interface MemberUpdateForm {
  name: string;
  univ_id: number;
  email: string;
  phone_number: string;
  generations: number[];
}

export interface User {
  id: number;
  description: string;
}
