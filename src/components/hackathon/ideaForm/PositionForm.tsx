// 포지션 별 폼 컴포넌트
import { Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import FormTextarea from './FormTextarea';
import FormDropdown from './FormDropdown';
import StackSelector from './StackSelector';
import { POSITIONS, RequirementKey } from '../../../constants/position';
import { useEffect } from 'react';

interface PositionFormProps {
  position: {
    key: RequirementKey;
    name: string;
    index: number;
  };
  isDisabled: boolean;
}

export default function PositionForm({ position, isDisabled }: PositionFormProps) {
  const { requirements, updateRequirements } = useIdeaFormStore();

  const currentValue = requirements[position.key] || {
    requirement: '',
    capacity: requirements[position.key]?.capacity || 0,
    required_tech_stacks: [],
  };

  // capacity 값이 0이 되면 다른 필드 초기화 -> 빈 값이 보내질 수 있도록
  useEffect(() => {
    if (currentValue.capacity === 0) {
      updateRequirements(position.key, {
        ...currentValue,
        requirement: '',
        required_tech_stacks: [],
      });
    }
  }, [currentValue.capacity]);

  // 포지션 별 최대 인원 수 (드롭다운)
  const getMaxCapacity = (positionKey: string) => {
    if (positionKey === 'pm' || positionKey === 'pd') {
      return 1;
    }
    return 3;
  };

  // 포지션 별 폼 값 변경
  const handleChange = (value: any) => {
    updateRequirements(position.key, {
      ...currentValue,
      ...value,
    });
  };

  return (
    <div className={isDisabled ? styles.positionFormContainerDisabled : styles.positionFormContainer}>
      <Text as="h6" typography="heading6" color="text-normal" style={{ marginBottom: 'var(--space-200)' }}>
        {`${position.index + 1}. ${POSITIONS[position.key as keyof typeof POSITIONS].name}`}
      </Text>
      <FormDropdown
        label="필요 인원 (본인 포함)"
        nullable={false}
        selectedValue={currentValue?.capacity?.toString() || '0'}
        placeholder="인원을 선택해주세요"
        // 직군에 따라 최대 팀원 수 다름
        options={Array.from({ length: getMaxCapacity(position.key) + 1 }, (_, i) => ({ id: i, name: i.toString() }))}
        onChange={(e) => handleChange({ capacity: parseInt(e.target.value) })}
        disabled={isDisabled}
      />
      <FormTextarea
        label="원하는 팀원상"
        nullable={true}
        placeholder="이런 팀원과 함께 하고싶어요"
        value={currentValue.requirement}
        onChange={(e) => handleChange({ requirement: e.target.value })}
        disabled={isDisabled}
      />
      <StackSelector
        label="필요 스택 (최대 5개)"
        maxStacks={5}
        disabled={isDisabled}
        selectedStacks={currentValue.required_tech_stacks || []}
        setSelectedStacks={(stacks) => handleChange({ required_tech_stacks: stacks })}
      />
    </div>
  );
}
