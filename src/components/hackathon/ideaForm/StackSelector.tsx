import FormLabel from './FormLabel';
import { FormGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '@goorm-dev/vapor-components';
import { useState } from 'react';
import styles from './styles.module.scss';
import { STACKS_WITH_NAMES } from '../../../constants/Stacks';
import StackBadge from './stackInput/StackBadge';
import { SearchOutlineIcon, ErrorCircleIcon } from '@goorm-dev/vapor-icons';

interface StackSelectorProps {
  selectedStacks: string[];
  setSelectedStacks: (stacks: string[]) => void;
  disabled?: boolean;
}

export default function StackSelector({ selectedStacks, setSelectedStacks, disabled }: StackSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [searchTerm, setSearchTerm] = useState('');

  // 입력 필드 초기화
  const handleClearInput = () => {
    setSearchTerm('');
  };

  const filteredStacks = STACKS_WITH_NAMES.filter((stack) =>
    stack.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleStackClick = (stackId: string) => {
    if (selectedStacks.length < 5 && !selectedStacks.includes(stackId)) {
      setSelectedStacks([...selectedStacks, stackId]);
    }
  };

  const handleRemoveStack = (stack: string) => {
    setSelectedStacks(selectedStacks.filter((s) => s !== stack));
  };

  return (
    <FormGroup>
      <FormLabel label="필요 스택 (최대 5개)" nullable={true} />
      <Dropdown size="lg" isOpen={isOpen} toggle={toggle} disabled={disabled}>
        <DropdownToggle caret color="select" className={styles.dropdown}>
          {selectedStacks.length > 0 ? (
            <div className={styles.selectedStacks}>
              {selectedStacks.map((stackId) => (
                // 사용자에게 name을 보여주고, 데이터는 id를 저장
                <StackBadge
                  key={stackId}
                  label={STACKS_WITH_NAMES.find((stack) => stack.id === stackId)?.name || ''}
                  onRemove={() => handleRemoveStack(stackId)}
                />
              ))}
            </div>
          ) : (
            '스택을 선택해주세요'
          )}
        </DropdownToggle>
        <DropdownMenu className={styles.dropdownMenu}>
          {/* event오류로 직접 제작 */}
          <div className={styles.searchInputContainer}>
            {searchTerm.length === 0 && <SearchOutlineIcon className={styles.searchIcon} />}
            <input
              type="text"
              placeholder="스택명을 입력해 주세요"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm.length > 0 && <ErrorCircleIcon className={styles.cancelIcon} onClick={handleClearInput} />}
          </div>

          <DropdownItem divider />
          <div className={styles.stackMenu}>
            {filteredStacks.map((stack) => (
              <DropdownItem
                key={stack.id}
                onClick={() => {
                  handleStackClick(stack.id);
                  setSearchTerm('');
                }}>
                {stack.name}
              </DropdownItem>
            ))}
          </div>
        </DropdownMenu>
      </Dropdown>
    </FormGroup>
  );
}
