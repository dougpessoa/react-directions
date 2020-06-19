import styled from 'styled-components';

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 20px;
  color: #4CB245;
  font-style: italic;
`;

export const Social = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const Img = styled.img`
  max-width: 30px;
  max-height: 30px;
  margin: 12px 6px 0 6px;
  cursor: pointer;
`;

export const Subtitle = styled(Title)`
  font-size: 17px;
`;

