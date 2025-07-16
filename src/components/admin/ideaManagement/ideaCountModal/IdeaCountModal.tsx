import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Text, toast } from '@goorm-dev/vapor-components';
import { useEffect, useState } from 'react';
import { getPeriod, setIdeaCount } from '../../../../api/admin/system';

export default function IdeaCountModal({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  const [count, setCount] = useState<number>(0);

  // 아이디어 개수 조회
  useEffect(() => {
    const fetchPeriod = async () => {
      const response = await getPeriod();
      setCount(response.data.max_idea_number);
    };
    fetchPeriod();
  }, []);

  const handleSubmit = async () => {
    try {
      await setIdeaCount(count);
      toast('아이디어 개수가 설정되었습니다.', { type: 'primary' });
      toggle();
    } catch (error: any) {
      toast(error.response.data.error?.message || '아이디어 개수 설정에 실패했습니다.', { type: 'danger' });
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading5" color="text-normal">
          아이디어 개수 설정
        </Text>
      </ModalHeader>
      <ModalBody>
        <Input
          bsSize="lg"
          placeholder="아이디어 개수"
          type="number"
          value={count}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))}
        />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          취소
        </Button>
        <Button size="lg" color="primary" onClick={handleSubmit}>
          저장
        </Button>
      </ModalFooter>
    </Modal>
  );
}
