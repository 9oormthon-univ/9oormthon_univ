import { useEffect, useState } from 'react';
import { getTeamInfo } from '../api/teams';
import { getMockTeamInfo } from '../utilities/mockUtils';

interface QRUserInfo {
  name: string;
  univ: string;
  teamId: string;
  teamName: string;
}

export const useQRUserInfo = (name: string, univ: string) => {
  const [qrData, setQrData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        if (import.meta.env.DEV) {
          const teamInfo = await getMockTeamInfo();

          const qrPayload: QRUserInfo = {
            name: encodeURIComponent(name),
            univ: encodeURIComponent(univ),
            teamId: teamInfo?.number?.toString() ?? '',
            teamName: encodeURIComponent(teamInfo.name ?? ''),
          };
          const jsonData = JSON.stringify(qrPayload);
          setQrData(jsonData);
          setIsLoading(false);
        } else {
          const teamInfo = await getTeamInfo();
          const qrPayload: QRUserInfo = {
            name: encodeURIComponent(name),
            univ: encodeURIComponent(univ),
            teamId: teamInfo?.number?.toString() ?? 'N/A',
            teamName: encodeURIComponent(teamInfo?.name ?? '팀 정보 없음'),
          };

          const jsonData = JSON.stringify(qrPayload);
          setQrData(jsonData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('QR team info fetch failed', err);
        setIsLoading(false);
      }
    };

    fetchTeamInfo();
  }, [name, univ]);

  return { qrData, isLoading };
};
