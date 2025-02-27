import { create } from 'zustand';
import { fetchPeriod } from '../api/system';

interface PeriodState {
  current_period:
    | 'IDEA_SUBMISSION'
    | 'PHASE1_TEAM_BUILDING'
    | 'PHASE1_CONFIRMATION'
    | 'PHASE2_TEAM_BUILDING'
    | 'PHASE2_CONFIRMATION'
    | 'PHASE3_TEAM_BUILDING'
    | 'PHASE3_CONFIRMATION'
    | 'NONE';
  phase1_period: string;
  phase2_period: string;
  phase3_period: string;
  isTeamBuildingPeriod: () => boolean;
  isConfirmationPeriod: () => boolean;
  fetchPeriodData: () => Promise<void>;
}

const usePeriodStore = create<PeriodState>((set, get) => ({
  current_period: 'NONE',
  phase1_period: '',
  phase2_period: '',
  phase3_period: '',

  // 팀 빌딩 기간인지 확인
  isTeamBuildingPeriod: () => {
    const state = get();
    return ['PHASE1_TEAM_BUILDING', 'PHASE2_TEAM_BUILDING', 'PHASE3_TEAM_BUILDING'].includes(state.current_period);
  },

  // 확정 기간인지 확인
  isConfirmationPeriod: () => {
    const state = get();
    return ['PHASE1_CONFIRMATION', 'PHASE2_CONFIRMATION', 'PHASE3_CONFIRMATION'].includes(state.current_period);
  },

  fetchPeriodData: async () => {
    try {
      const response = await fetchPeriod();
      set({
        current_period: response.data.current_period,
        phase1_period: `${response.data.phase1_period}`,
        phase2_period: `${response.data.phase2_period}`,
        phase3_period: `${response.data.phase3_period}`,
      });
    } catch (error) {
      console.error('Error fetching period:', error);
    }
  },
}));

export default usePeriodStore;
