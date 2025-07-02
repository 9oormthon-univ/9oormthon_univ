import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Position, RequirementKey } from '../constants/position';
import { GENERATION } from '../constants/common';

interface PositionRequirement {
  requirement: string;
  capacity: number;
  required_tech_stacks?: string[];
}

interface IdeaFormStore {
  idea_info: {
    idea_subject_id: number;
    title: string;
    summary: string;
    content: string;
    generation: number; // 현 기수
    provider_role: Position;
  };
  requirements: {
    [key in RequirementKey]: PositionRequirement;
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
        generation: GENERATION,
        provider_role: Position.NULL,
      },
      requirements: {
        pm: {
          requirement: '',
          capacity: 0,
          required_tech_stacks: [],
        },
        pd: {
          requirement: '',
          capacity: 0,
          required_tech_stacks: [],
        },
        fe: {
          requirement: '',
          capacity: 0,
          required_tech_stacks: [],
        },
        be: {
          requirement: '',
          capacity: 0,
          required_tech_stacks: [],
        },
      },
      updateIdeaInfo: (key, value) =>
        set((state) => {
          if (key === 'provider_role') {
            const previousRole = state.idea_info.provider_role;
            const newRole = value as Position;
            const updatedRequirements = { ...state.requirements };

            if (previousRole && updatedRequirements[previousRole.toLowerCase() as RequirementKey]) {
              updatedRequirements[previousRole.toLowerCase() as RequirementKey]!.capacity = Math.max(
                updatedRequirements[previousRole.toLowerCase() as RequirementKey]!.capacity - 1,
                0,
              );
            }

            if (newRole && updatedRequirements[newRole.toLowerCase() as RequirementKey]) {
              updatedRequirements[newRole.toLowerCase() as RequirementKey]!.capacity = Math.max(
                updatedRequirements[newRole.toLowerCase() as RequirementKey]!.capacity + 1,
                1,
              );
            }

            return {
              idea_info: { ...state.idea_info, [key]: value },
              requirements: updatedRequirements,
            };
          }

          return {
            idea_info: { ...state.idea_info, [key]: value },
          };
        }),

      updateRequirements: (key, value) =>
        set((state) => ({
          requirements: { ...state.requirements, [key]: value },
        })),

      resetIdeaForm: () =>
        set({
          idea_info: {
            idea_subject_id: 0,
            title: '',
            summary: '',
            content: '',
            generation: GENERATION,
            provider_role: Position.NULL,
          },
          requirements: {
            pm: {
              requirement: '',
              capacity: 0,
              required_tech_stacks: [],
            },
            pd: {
              requirement: '',
              capacity: 0,
              required_tech_stacks: [],
            },
            fe: {
              requirement: '',
              capacity: 0,
              required_tech_stacks: [],
            },
            be: {
              requirement: '',
              capacity: 0,
              required_tech_stacks: [],
            },
          },
        }),
    }),
    {
      name: 'idea_form',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
