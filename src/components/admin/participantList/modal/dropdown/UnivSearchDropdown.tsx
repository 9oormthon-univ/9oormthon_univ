import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Text } from '@goorm-dev/vapor-components';
import { SearchOutlineIcon } from '@goorm-dev/vapor-icons';
import { useState } from 'react';

export default function UnivSearchDropdown() {
  const schoolList = ['구름대학교', '성공회대학교', '서울대학교', '고려대학교']; // 예시
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  const filteredList = schoolList.filter((school) => school.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelect = (school: string) => {
    setSelectedSchool(school);
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={() => setIsOpen((prev) => !prev)} className="dropdown" size="lg">
      <DropdownToggle color="select" caret size="lg" className="w-full">
        <Text typography="body2" as="p">
          {selectedSchool || '대학교를 선택해주세요'}
        </Text>
      </DropdownToggle>
      <DropdownMenu className="w-full">
        <div style={{ padding: '0.5rem 1rem' }}>
          <Input
            size="md"
            placeholder="학교명을 입력해 주세요"
            icon={SearchOutlineIcon}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredList.map((school) => (
          <DropdownItem key={school} onClick={() => handleSelect(school)}>
            {school}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
