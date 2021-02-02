import styled, { keyframes } from 'styled-components';

const enter = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  80%{
    opacity: 1;
  }
  90% {
    transform: translateX(5%);
  }

  100% {
    transform: translateX(0%);
  }
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  animation: ${enter} 0.8s linear normal;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default QuizContainer;
