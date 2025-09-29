import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import TeamPreferenceStep1 from '../../../components/hackathon/IdeaCreateEdit/TeamPreferenceStep1';
import TeamPreferenceStep2 from '../../../components/hackathon/IdeaCreateEdit/TeamPreferenceStep2';
import { PositionLowerKey } from '../../../constants/position';
import { toast } from '@goorm-dev/vapor-components';
import { useIdeaDetail } from '@/hooks/queries/useIdeaDetail';
import { useCreateIdeaMutation, useUpdateIdeaMutation } from '@/hooks/mutations/useIdeaMutations';
import { useUser } from '@/hooks/queries/useUser';

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

  const { data: ideaDetail, isSuccess } = useIdeaDetail();
  const { refetch: refetchUser } = useUser();
  const createIdea = useCreateIdeaMutation();
  const updateIdea = useUpdateIdeaMutation();

  // 수정 모드
  useEffect(() => {
    if (isEditMode && ideaDetail) {
      const mappedIdeaInfo = {
        ...ideaDetail.idea_info,
        provider_role: ideaDetail.provider_info.role,
        idea_subject_id: ideaDetail.idea_info.subject_id,
      };

      Object.entries(mappedIdeaInfo).forEach(([key, value]) => {
        updateIdeaInfo(key as keyof typeof idea_info, value);
      });

      Object.entries(ideaDetail.requirements).forEach(([key, value]) => {
        updateRequirements(key as PositionLowerKey, {
          requirement: value.requirement || '',
          capacity: value.max_count || 0,
          required_tech_stacks: value.required_tech_stacks || [],
        });
      });
    }
  }, [isEditMode, ideaDetail, isSuccess]);

  // Form 제출 (Create → POST, Edit → PUT)
  const submitForm = async () => {
    const payload = { idea_info, requirements };

    if (isEditMode) {
      updateIdea.mutate(
        { data: payload, id: Number(idea_id) },
        {
          onSuccess: () => {
            resetIdeaForm();
            navigate('/hackathon');
            toast('아이디어 수정이 완료되었습니다.', {
              type: 'primary',
            });
            refetchUser();
          },
        },
      );
    } else {
      createIdea.mutate(payload, {
        onSuccess: () => {
          resetIdeaForm();
          navigate('/hackathon');
          toast('아이디어 생성이 완료되었습니다.', {
            type: 'primary',
          });
          refetchUser();
        },
      });
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
