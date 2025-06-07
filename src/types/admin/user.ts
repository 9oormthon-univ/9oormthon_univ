export interface UserOverview {
  id: number;
  role: 'USER' | 'ADMIN';
  name: string;
  email: string;
  team_building: boolean;
  generations: string;
}
