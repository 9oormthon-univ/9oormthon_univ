import { create } from 'zustand';
import { fetchPeriod } from '../api/system';

interface PeriodState {
  period:
    | 'IDEA_SUBMISSION'
    | 'PHASE1_TEAM_BUILDING'
    | 'PHASE1_CONFIRMATION'
    | 'PHASE2_TEAM_BUILDING'
    | 'PHASE2_CONFIRMATION'
    | 'PHASE3_TEAM_BUILDING'
    | 'PHASE3_CONFIRMATION'
    | 'NONE';
  fetchPeriodData: () => Promise<void>;
}

const usePeriodStore = create<PeriodState>((set) => ({
  period: 'NONE',
  fetchPeriodData: async () => {
    try {
      const response = await fetchPeriod();
      set({ period: response.data.period });
    } catch (error) {
      console.error('Error fetching period:', error);
    }
  },
}));

export default usePeriodStore;
