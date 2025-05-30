import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge, Text } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import { CloseOutlineIcon } from '@goorm-dev/vapor-icons';
import styles from './dropdown.module.scss';

const GENERATIONS = ['1기', '2기', '3기', '4기'];

export default function GenerationSelectDropdown() {
  const [open, setOpen] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState<string[]>([]);

  const toggle = () => setOpen(!open);

  const handleGenerationSelect = (generation: string) => {
    setSelectedGeneration((prev) => [...prev, generation]);
  };

  const handleGenerationRemove = (generation: string) => {
    setSelectedGeneration((prev) => prev.filter((g) => g !== generation));
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
                  {generation}
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
            {generation}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
