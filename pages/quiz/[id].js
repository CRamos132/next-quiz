/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Quiz from '../../src/screens/Quiz';

const QuizBackground = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-color: ${({ theme }) => theme.colors.mainBg};
  flex: 1;
  @media screen and (max-width: 500px) {
    background-image: none;
    &:after {
      content: "";
      background-size: cover;
    background-position: center;
      background-image:
        linear-gradient(transparent, ${({ theme }) => theme.colors.mainBg}),
        url(${({ backgroundImage }) => backgroundImage});
      display: block;
      width: 100%;
      height: 210px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    *:first-child {
      position: relative;
      z-index: 10;
    }
  }
`;

const ExternalQuiz = ({ dbExterno }) => (
  <QuizBackground backgroundImage={dbExterno.bg}>
    <Quiz db={dbExterno} />
  </QuizBackground>
);

export async function getServerSideProps(context) {
  const data = context.query.id.replace('*', '.');
  try {
    const dbExterno = await fetch(`https://${data}.vercel.app/api/db`).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('ops');
    })
      .then((response) => response).catch((err) => console.log(err));
    return {
      props: { dbExterno },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default ExternalQuiz;
