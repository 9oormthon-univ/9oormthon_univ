import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import { createIdeaAPI, fetchIdeaDetailById, updateIdeaAPI } from '../../../api/idea';
import TeamPreferenceStep1 from '../../../components/hackathon/IdeaCreateEdit/TeamPreferenceStep1';
import TeamPreferenceStep2 from '../../../components/hackathon/IdeaCreateEdit/TeamPreferenceStep2';
import { ERROR_MESSAGES } from '../../../constants/errorMessage';

interface TeamPreferenceFormProps {
  isEditMode?: boolean;
  step: number;
}

export default function TeamPreferenceForm({ isEditMode = false, step }: TeamPreferenceFormProps) {
  const navigate = useNavigate();
  const { ideaId } = useParams();
  const { idea_info, requirements, resetIdeaForm } = useIdeaFormStore();
  const [formData, setFormData] = useState<any>(
    isEditMode
      ? { idea_info: {}, requirements: {} } // NULL 참조 오류 방지
      : { idea_info, requirements },
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Edit 모드일 경우 API에서 데이터 불러오기
  useEffect(() => {
    if (isEditMode && ideaId) {
      const fetchData = async () => {
        try {
          const response = await fetchIdeaDetailById(ideaId);

          const formattedProviderRole = response.data.provider_info.role.toLowerCase();

          setFormData({
            idea_info: {
              ...response.data.idea_info,
              provider_role: formattedProviderRole,
            },
            requirements: response.data.requirements,
          });
        } catch (error) {
          console.error('Error fetching idea details:', error);
        }
      };
      fetchData();
    }
  }, [isEditMode, ideaId]);

  // Form 제출 (Create → POST, Edit → PUT)
  const submitForm = async () => {
    try {
      if (isEditMode) {
        await updateIdeaAPI(formData, Number(ideaId));
      } else {
        await createIdeaAPI(formData);
        resetIdeaForm();
      }
      navigate('/hackathon');
    } catch (error: any) {
      if (error.response) {
        const serverMessage = error.response.data.error?.code;
        setErrorMessage(ERROR_MESSAGES[serverMessage] || '알 수 없는 오류가 발생하였습니다.');
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  // Step 이동 시 URL 업데이트
  const goToNextStep = () => {
    if (isEditMode) {
      navigate(`/hackathon/edit/${ideaId}/step2`);
    } else {
      navigate('/hackathon/create/step2');
    }
  };

  // Step 이전으로 이동 시 URL 업데이트
  const goToPreviousStep = () => {
    if (isEditMode) {
      return `/hackathon/edit/${ideaId}/step1`;
    } else {
      return '/hackathon/create/step1';
    }
  };

  return formData ? (
    step === 1 ? (
      <TeamPreferenceStep1
        formData={formData.idea_info}
        updateFormData={(key, value) =>
          setFormData((prev: any) => ({
            ...prev,
            idea_info: { ...(prev?.idea_info || {}), [key]: value }, // prev가 없으면 빈 객체를 할당
          }))
        }
        nextStep={goToNextStep}
      />
    ) : (
      <TeamPreferenceStep2
        formData={formData.requirements}
        submitForm={submitForm}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        goToPreviousStep={goToPreviousStep}
      />
    )
  ) : null;
}
