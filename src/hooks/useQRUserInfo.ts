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

  useEffect(() => {
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
          setQrData(JSON.stringify(qrPayload));
        } else {
          const teamInfo = await getTeamInfo(GENERATION);

          const qrPayload: QRUserInfo = {
            name: encodeURIComponent(name),
            univ: encodeURIComponent(univ),
            teamId: teamInfo.number.toString(),
            teamName: encodeURIComponent(teamInfo.name),
          };

          setQrData(JSON.stringify(qrPayload));
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('QR team info fetch failed', err);
        }
      }
    };

    fetchTeamInfo();
  }, [name, univ]);

  return qrData;
};
