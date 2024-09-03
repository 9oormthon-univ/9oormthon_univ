import { OutIcon, PauseIcon, PlayIcon, SoundOffIcon, SoundOnIcon } from '@goorm-dev/gds-icons';
import { Button, Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactPlayer from 'react-player/file';
import { MainBannerSlogan } from '../../../assets';
import useIsMobile from '../../../hooks/useIsMobile';
import styles from './MainBanner.module.scss';

const cx = classNames.bind(styles);

export default function MainBanner() {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { isMobile } = useIsMobile();

  const onlyThumbnail = isMobile || hasError;

  const handleClickPlay = () => {
    setPlaying(!playing);
  };

  const handleClickSoundsOn = () => {
    setMuted(!muted);
  };

  const handleError = () => {
    setHasError(true);
  };

  const MoveToYoutube = () => {
    window.location.href = 'https://youtu.be/AqTSrinWXNs';
  };

  return (
    <div className={styles.playerUpper}>
      <div className={styles.playerFitter}>
        <div className={styles.playerWrapper}>
          {!onlyThumbnail && (
            <ReactPlayer
              onError={handleError}
              url="/src/assets/etc/구름톤유니브_벚꽃톤_v8.mp4"
              playing={playing}
              muted={muted}
              loop={true}
              controls={false}
              config={{
                attributes: {
                  style: {
                    objectFit: 'cover',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  },
                },
              }}
            />
          )}
        </div>
        {onlyThumbnail && (
          <div className={styles.thumbnailWrapper}>
            <img className="w-100" src="/src/assets/images/playerThumbnail.png" />
          </div>
        )}
        <div className={styles.buttonWrapper}>
          {!onlyThumbnail && (
            <>
              <Button onClick={handleClickPlay} size="lg" color="light">
                {playing ? <PauseIcon /> : <PlayIcon />}
              </Button>
              <Button onClick={handleClickSoundsOn} size="lg" color="light">
                {muted ? <SoundOffIcon /> : <SoundOnIcon />}
              </Button>
            </>
          )}
          <Button onClick={MoveToYoutube} size="lg" color="light">
            <OutIcon />
          </Button>
        </div>
        {(!playing || onlyThumbnail) && (
          <div className={styles.mainBanner}>
            <div className={cx('headerText')}>
              <Text typography={isMobile ? 'heading5' : 'heading3'} color="gray-300">
                사계절, 구름톤 유니브와 함께
              </Text>
              <MainBannerSlogan />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
