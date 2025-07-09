import { PositionKey } from '../../constants/position';

export interface Member {
  name: string;
  img_url: string;
  team?: string;
  role: PositionKey;
  univ: {
    id: number;
    name: string;
  };
  email: string;
  phone_number: string;
  generations: number[];
}

export interface UserForm {
  name: string;
  univ_id: number;
  email: string;
  phone_number: string;
  generations: number[];
  img_url?: string;
}

export interface User {
  id: number;
  description: string;
}
