import { OutOutlineIcon, PauseIcon, PlayIcon, SoundOffIcon, SoundOnIcon } from '@goorm-dev/vapor-icons';
import { Button, Text } from '@goorm-dev/vapor-components';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/file';
import { MainBannerSlogan } from '../../../assets';
import mainVideo from '../../../assets/etc/구름톤유니브_벚꽃톤_v8.mp4';
import playerThumbnail from '../../../assets/images/playerThumbnail.png';

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 900;
      if (window.scrollY > scrollThreshold && playing) {
        setPlaying(false);
      } else if (window.scrollY <= scrollThreshold && !playing) {
        setPlaying(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [playing]);

  return (
    <div className={styles.playerUpper}>
      <div className={styles.playerFitter}>
        <div className={styles.playerWrapper}>
          {!onlyThumbnail && (
            <ReactPlayer
              onError={handleError}
              url={mainVideo}
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
                    backgroundColor: 'rgba(0, 0, 0, 0.32)',
                  },
                },
              }}
            />
          )}
        </div>
        {onlyThumbnail && (
          <div className={styles.thumbnailWrapper}>
            <img className="w-100" src={playerThumbnail} alt="playerThumbnail" />
          </div>
        )}
        <div className={styles.buttonWrapper}>
          {!onlyThumbnail && (
            <>
              <Button onClick={handleClickPlay} size="xl" color="secondary" className={styles.button}>
                {playing ? <PauseIcon className={styles.icon} /> : <PlayIcon className={styles.icon} />}
              </Button>
              <Button onClick={handleClickSoundsOn} size="xl" color="secondary" className={styles.button}>
                {muted ? <SoundOffIcon className={styles.icon} /> : <SoundOnIcon className={styles.icon} />}
              </Button>
            </>
          )}
          <Button onClick={MoveToYoutube} size="xl" color="secondary" className={styles.button}>
            <OutOutlineIcon className={styles.icon} />
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
