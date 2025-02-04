import * as S from './style';

function CustomFooter() {
  return (
    <S.FooterWrapper>
      <S.FooterContents>
        <S.FooterSlogan>Being All Seasons with 9oormthonUNIV</S.FooterSlogan>
        <S.SocialContainer>
          <S.SocialIcon
            href="https://www.instagram.com/9oormthonuniv.official/"
            target="_blank"
            rel="noopener noreferrer">
            <S.StyledInstagramIcon />
          </S.SocialIcon>
          <S.SocialIcon href="https://github.com/9oormthon-univ" target="_blank" rel="noopener noreferrer">
            <S.StyledGithubIcon />
          </S.SocialIcon>
        </S.SocialContainer>
      </S.FooterContents>
    </S.FooterWrapper>
  );
}
export default CustomFooter;
