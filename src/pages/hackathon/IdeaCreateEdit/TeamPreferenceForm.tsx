import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import { createIdeaAPI, fetchMyIdeaDetail, updateIdeaAPI } from '../../../api/idea';
import TeamPreferenceStep1 from '../../../components/hackathon/IdeaCreateEdit/TeamPreferenceStep1';
import TeamPreferenceStep2 from '../../../components/hackathon/IdeaCreateEdit/TeamPreferenceStep2';
import { IDEA_ADD_ERROR_MESSAGES } from '../../../constants/errorMessage';
import { RequirementKey } from '../../../constants/position';

interface TeamPreferenceFormProps {
  isEditMode: boolean;
  step: number;
}

export default function TeamPreferenceForm({ isEditMode, step }: TeamPreferenceFormProps) {
  const navigate = useNavigate();
  const { idea_id } = useParams();
  // create모드일 때 전역 관리 사용 / edit일 경우 step1 -> step2 이동시 사용
  const { idea_info, requirements, updateIdeaInfo, updateRequirements, resetIdeaForm } = useIdeaFormStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && idea_id) {
      const fetchData = async () => {
        try {
          const response = await fetchMyIdeaDetail();

          const mappedIdeaInfo = {
            ...response.data.idea_info,
            provider_role: response.data.provider_info.role,
            idea_subject_id: response.data.idea_info.subject_id,
          };

          // 현재 코드 매핑 필요
          const mappedRequirements = {
            pm: {
              requirement: response.data.requirements.pm.requirement || '',
              capacity: response.data.requirements.pm.max_count || 0,
              required_tech_stacks: response.data.requirements.pm.required_tech_stacks || [],
            },
            pd: {
              requirement: response.data.requirements.pd.requirement || '',
              capacity: response.data.requirements.pd.max_count || 0,
              required_tech_stacks: response.data.requirements.pd.required_tech_stacks || [],
            },
            fe: {
              requirement: response.data.requirements.fe.requirement || '',
              capacity: response.data.requirements.fe.max_count || 0,
              required_tech_stacks: response.data.requirements.fe.required_tech_stacks || [],
            },
            be: {
              requirement: response.data.requirements.be.requirement || '',
              capacity: response.data.requirements.be.max_count || 0,
              required_tech_stacks: response.data.requirements.be.required_tech_stacks || [],
            },
          };

          // Edit모드도 전역 관리
          Object.entries(mappedIdeaInfo).forEach(([key, value]) => {
            updateIdeaInfo(key as keyof typeof idea_info, value);
          });
          Object.entries(mappedRequirements).forEach(([key, value]) => {
            updateRequirements(key as RequirementKey, value);
          });
        } catch (error) {
          console.error('Error fetching idea details:', error);
        }
      };
      fetchData();
    }
  }, [isEditMode, idea_id]);

  // Form 제출 (Create → POST, Edit → PUT)
  const submitForm = async () => {
    try {
      // 수정모드
      if (isEditMode) {
        await updateIdeaAPI({ idea_info, requirements }, Number(idea_id));
        resetIdeaForm();
      } else {
        // 생성모드
        await createIdeaAPI({ idea_info, requirements });
        resetIdeaForm();
      }
      navigate('/hackathon');
    } catch (error: any) {
      if (error.response) {
        const serverMessage = error.response.data.error?.code;
        setErrorMessage(IDEA_ADD_ERROR_MESSAGES[serverMessage] || '알 수 없는 오류가 발생하였습니다.');
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  // Step 이동 시 URL 업데이트
  const goToNextStep = () => {
    if (isEditMode) {
      navigate(`/hackathon/edit/${idea_id}/step2`);
    } else {
      navigate('/hackathon/create/step2');
    }
  };

  // Step 이전으로 이동 시 URL 업데이트
  const goToPreviousStep = () => {
    if (isEditMode) {
      return `/hackathon/edit/${idea_id}/step1`;
    } else {
      return '/hackathon/create/step1';
    }
  };

  return step === 1 ? (
    <TeamPreferenceStep1 formData={{ idea_info, requirements }} nextStep={goToNextStep} />
  ) : (
    <TeamPreferenceStep2
      formData={{ idea_info, requirements }}
      submitForm={submitForm}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      goToPreviousStep={goToPreviousStep}
    />
  );
}
