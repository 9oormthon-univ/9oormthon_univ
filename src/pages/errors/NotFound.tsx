import NotFoundImg from '../../assets/images/img-404-danpung.png';
import * as S from './style';

export default function NotFound() {
  return (
    <S.MainContainer>
      <S.MainWrapper>
        <S.NotFoundImg src={NotFoundImg} />
        <S.MainTitle>페이지를 찾을 수 없습니다.</S.MainTitle>
        <S.MainSubDescription>
          페이지의 주소가 잘못되었거나 변경되어 요청한 페이지를 찾을 수 없습니다. <br />
          다음의 내용을 확인하시고, 해결되지 않을 시 고객센터로 연락해 주시기 바랍니다.
        </S.MainSubDescription>
      </S.MainWrapper>
    </S.MainContainer>
  );
}
