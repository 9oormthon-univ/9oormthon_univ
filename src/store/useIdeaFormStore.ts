import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface IdeaFormStore {
  idea_info: {
    idea_subject_id: number;
    title: string;
    summary: string;
    content: string;
    generation: number; // 현 기수
    provider_role: 'PM' | 'PD' | 'FE' | 'BE';
  };
  requirements: {
    pm:
      | {
          requirement: string;
          capacity: number;
          required_tech_stacks: string[] | null;
        }
      | undefined;
    pd:
      | {
          requirement: string;
          capacity: number;
          required_tech_stacks: string[] | null;
        }
      | undefined;
    fe:
      | {
          requirement: string;
          capacity: number;
          required_tech_stacks: string[] | null;
        }
      | undefined;
    be:
      | {
          requirement: string;
          capacity: number;
          required_tech_stacks: string[] | null;
        }
      | undefined;
  };

  updateIdeaInfo: (key: keyof IdeaFormStore['idea_info'], value: any) => void;
  updateRequirements: (key: keyof IdeaFormStore['requirements'], value: any) => void;
  resetIdeaForm: () => void;
}

export const useIdeaFormStore = create<IdeaFormStore>()(
  persist(
    (set) => ({
      idea_info: {
        idea_subject_id: 0,
        title: '',
        summary: '',
        content: '',
        generation: 4,
        provider_role: 'PM',
      },
      requirements: {
        pm: undefined,
        pd: undefined,
        fe: undefined,
        be: undefined,
      },
      updateIdeaInfo: (key, value) => set((state) => ({ idea_info: { ...state.idea_info, [key]: value } })),
      updateRequirements: (key, value) => set((state) => ({ requirements: { ...state.requirements, [key]: value } })),
      resetIdeaForm: () =>
        set({
          idea_info: {
            idea_subject_id: 0,
            title: '',
            summary: '',
            content: '',
            generation: 4,
            provider_role: 'PM',
          },
          requirements: {
            pm: undefined,
            pd: undefined,
            fe: undefined,
            be: undefined,
          },
        }),
    }),
    {
      name: 'idea_form',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
