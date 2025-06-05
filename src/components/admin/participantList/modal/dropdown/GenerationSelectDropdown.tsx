import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import { CloseOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './dropdown.module.scss';

interface GenerationSelectDropdownProps {
  value?: number[];
  onChange?: (generations: number[] | string[]) => void;
}

// 4기까지 존재
const GENERATIONS = [1, 2, 3, 4];

const formatGeneration = (generation: number) => `${generation}기`;

export default function GenerationSelectDropdown({ value = [], onChange }: GenerationSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState<number[]>(value);

  const toggle = () => setOpen(!open);

  const handleGenerationSelect = (generation: number) => {
    const newSelected = [...selectedGeneration, generation];
    setSelectedGeneration(newSelected);
    onChange?.(newSelected);
  };

  const handleGenerationRemove = (generation: number) => {
    const newSelected = selectedGeneration.filter((g) => g !== generation);
    setSelectedGeneration(newSelected);
    onChange?.(newSelected);
  };

  // 선택되지 않은 기수만 필터링
  const availableGenerations = GENERATIONS.filter((generation) => !selectedGeneration.includes(generation));

  return (
    <Dropdown isOpen={open} toggle={toggle} direction="down" size="lg" className={styles.dropdown}>
      <DropdownToggle caret color="select">
        {selectedGeneration.length > 0 ? (
          <div className={styles.badgeContainer}>
            {selectedGeneration.map((generation) => (
              <Badge
                key={generation}
                size="md"
                color="primary"
                onRemove={() => handleGenerationRemove(generation)}
                className={styles.badge}>
                <Text typography="subtitle2" as="p" color="text-primary">
                  {formatGeneration(generation)}
                </Text>
                <CloseOutlineIcon onClick={() => handleGenerationRemove(generation)} />
              </Badge>
            ))}
          </div>
        ) : (
          <Text typography="body2" as="p" color="text-hint">
            참여한 기수를 모두 선택해주세요
          </Text>
        )}
      </DropdownToggle>
      <DropdownMenu className={styles.dropdownMenu}>
        {availableGenerations.map((generation) => (
          <DropdownItem key={generation} onClick={() => handleGenerationSelect(generation)}>
            {formatGeneration(generation)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
