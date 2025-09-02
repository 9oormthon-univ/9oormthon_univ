import { Modal, ModalHeader, ModalBody, Text, ModalFooter, Button } from '@goorm-dev/vapor-components';
import QRCode from 'react-qr-code';
import styles from './styles.module.scss';
import { useQRUserInfo } from '../../hooks/useQRUserInfo';

interface QRCheckInModalProps {
  isOpen: boolean;
  toggle: () => void;
  name: string;
  univ: string;
}

export const QRCheckInModal = ({ isOpen, toggle, name, univ }: QRCheckInModalProps) => {
  console.log('QRCheckInModal props:', { isOpen, name, univ });
  const qrData = useQRUserInfo(name, univ);
  console.log('QRCheckInModal qrData:', qrData);
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <Text typography="heading6" as="h6">
          현장 QR 체크인
        </Text>
      </ModalHeader>
      <ModalBody className={styles.modalBody}>
        <Text typography="body2" color="text-normal">
          스태프에게 해당 QR을 보여주세요.
        </Text>
        <QRCode
          size={256}
          style={{ height: 'auto', width: '16rem' }}
          value={qrData}
          viewBox={`0 0 256 256`}
          level="M"
        />
      </ModalBody>
      <ModalFooter>
        <Button size="lg" color="secondary" onClick={toggle}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};
