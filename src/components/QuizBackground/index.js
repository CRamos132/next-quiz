import styled from 'styled-components';
import db from '../../../db.json';

const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
`;

export default BackgroundImage;
