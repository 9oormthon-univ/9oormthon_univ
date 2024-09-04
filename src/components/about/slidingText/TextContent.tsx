import * as S from './style';

import AmpersandImg from '../../../assets/svgs/ampersand.svg';
import BeotkkotImg from '../../../assets/svgs/beotkkot.svg';
import DanpoongImg from '../../../assets/svgs/danpoong.svg';

export default function TextContent() {
  return (
    <div>
      <S.ThemeTextWrapper>
        <S.Img src={BeotkkotImg} />
        <S.Text>BEOTKKOT</S.Text>
      </S.ThemeTextWrapper>
      <S.ThemeTextWrapper>
        <S.Img src={AmpersandImg} />
        <S.Img src={DanpoongImg} />
      </S.ThemeTextWrapper>
      <S.Text>DANPOONG</S.Text>
    </div>
  );
}
