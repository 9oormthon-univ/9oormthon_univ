import { useEffect, useState } from 'react';
import { getTeamInfo } from '../api/teams';
import { GENERATION } from '../constants/common';
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

  console.log('useQRUserInfo called with:', { name, univ });

  useEffect(() => {
    console.log('useQRUserInfo useEffect triggered');
    const fetchTeamInfo = async () => {
      try {
        if (import.meta.env.DEV) {
          const teamInfo = await getMockTeamInfo();

          const qrPayload: QRUserInfo = {
            name: encodeURIComponent(name),
            univ: encodeURIComponent(univ),
            teamId: teamInfo.data.number?.toString() ?? '',
            teamName: encodeURIComponent(teamInfo.data.name ?? ''),
          };
          const jsonData = JSON.stringify(qrPayload);
          console.log('Setting QR data:', jsonData);
          setQrData(jsonData);
          setIsLoading(false);
        } else {
          const teamInfo = await getTeamInfo(GENERATION);
          console.log('팀 정보:', teamInfo);

          const qrPayload: QRUserInfo = {
            name: encodeURIComponent(name),
            univ: encodeURIComponent(univ),
            teamId: teamInfo?.number?.toString() ?? 'N/A',
            teamName: encodeURIComponent(teamInfo?.name ?? '팀 정보 없음'),
          };

          const jsonData = JSON.stringify(qrPayload);
          console.log('Setting QR data:', jsonData);
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
