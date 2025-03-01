// 포지션 별 폼 컴포넌트
import { Text } from '@goorm-dev/vapor-components';
import styles from './styles.module.scss';
import { useIdeaFormStore } from '../../../store/useIdeaFormStore';
import FormTextarea from './FormTextarea';
import FormDropdown from './FormDropdown';
import StackSelector from './StackSelector';
import { POSITIONS } from '../../../constants/position';

interface PositionFormProps {
  position: {
    key: keyof typeof POSITIONS;
    name: string;
    index: number;
  };
  isDisabled: boolean;
}

export default function PositionForm({ position, isDisabled }: PositionFormProps) {
  const { requirements, updateRequirements } = useIdeaFormStore();

  // const isDisabled = position.key === idea_info.provider_role;
  const currentValue = requirements[position.key as keyof typeof POSITIONS] || {
    requirement: '',
    capacity: requirements[position.key as keyof typeof POSITIONS]?.capacity || 0,
    required_tech_stacks: [],
  };

  const getMaxCapacity = (positionKey: string) => {
    if (positionKey === 'pm' || positionKey === 'pd') {
      return 1;
    }
    return 3;
  };

  const handleChange = (value: any) => {
    updateRequirements(position.key as keyof typeof POSITIONS, {
      ...currentValue,
      ...value,
    });
  };

  return (
    <div className={isDisabled ? styles.positionFormContainerDisabled : styles.positionFormContainer}>
      <Text as="h6" typography="heading6" color="text-normal" style={{ marginBottom: 'var(--space-200)' }}>
        {`${position.index + 1}. ${POSITIONS[position.key as keyof typeof POSITIONS]}`}
      </Text>
      <FormTextarea
        label="원하는 팀원상"
        nullable={false}
        placeholder="이런 팀원과 함께 하고싶어요"
        value={currentValue.requirement}
        onChange={(e) => handleChange({ requirement: e.target.value })}
        disabled={isDisabled}
      />
      <FormDropdown
        label="필요 인원"
        nullable={false}
        selectedValue={currentValue?.capacity?.toString() || '0'}
        placeholder="인원을 선택해주세요"
        // 직군에 따라 최대 팀원 수 다름
        options={Array.from({ length: getMaxCapacity(position.key) + 1 }, (_, i) => ({ id: i, name: i.toString() }))}
        onChange={(e) => handleChange({ capacity: parseInt(e.target.value) })}
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
