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
    | 'HACKATHON'
    | 'NONE';
  phase1_period: string;
  phase2_period: string;
  phase3_period: string;
  idea_submission_period: string;
  phase1_team_building_period: string;
  phase1_confirmation_period: string;
  phase2_team_building_period: string;
  phase2_confirmation_period: string;
  phase3_team_building_period: string;
  phase3_confirmation_period: string;
  hackathon_period: string;
  current_phase: number;
  isTeamBuildingPeriod: () => boolean;
  isConfirmationPeriod: () => boolean;
  fetchPeriodData: () => Promise<void>;
  isFetched: boolean;
}

const usePeriodStore = create<PeriodState>((set, get) => ({
  current_period: 'NONE',
  phase1_period: '',
  phase2_period: '',
  phase3_period: '',
  idea_submission_period: '',
  phase1_team_building_period: '',
  phase1_confirmation_period: '',
  phase2_team_building_period: '',
  phase2_confirmation_period: '',
  phase3_team_building_period: '',
  phase3_confirmation_period: '',
  hackathon_period: '',
  current_phase: 0,
  isFetched: false,
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
      const currentPeriod = response.data.current_period;

      // current_period에 따라 current_phase 설정
      let currentPhase = 0;
      if (currentPeriod === 'PHASE1_TEAM_BUILDING' || currentPeriod === 'PHASE1_CONFIRMATION') {
        currentPhase = 1;
      } else if (currentPeriod === 'PHASE2_TEAM_BUILDING' || currentPeriod === 'PHASE2_CONFIRMATION') {
        currentPhase = 2;
      } else if (currentPeriod === 'PHASE3_TEAM_BUILDING' || currentPeriod === 'PHASE3_CONFIRMATION') {
        currentPhase = 3;
      }

      set({
        current_period: currentPeriod,
        current_phase: currentPhase,
        phase1_period: `${response.data.phase1_period}`,
        phase2_period: `${response.data.phase2_period}`,
        phase3_period: `${response.data.phase3_period}`,
        idea_submission_period: `${response.data.idea_submission_period}`,
        phase1_team_building_period: `${response.data.phase1_team_building_period}`,
        phase1_confirmation_period: `${response.data.phase1_confirmation_period}`,
        phase2_team_building_period: `${response.data.phase2_team_building_period}`,
        phase2_confirmation_period: `${response.data.phase2_confirmation_period}`,
        phase3_team_building_period: `${response.data.phase3_team_building_period}`,
        phase3_confirmation_period: `${response.data.phase3_confirmation_period}`,
        hackathon_period: `${response.data.hackathon_period}`,
        isFetched: true,
      });
    } catch (error) {
      console.error('Error fetching period:', error);
      set({ isFetched: true });
    }
  },
}));

export default usePeriodStore;
