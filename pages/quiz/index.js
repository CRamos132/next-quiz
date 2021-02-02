/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Widget from '../../src/components/Widget';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';
import db from '../../db.json';
import BackLinkArrow from '../../src/components/BackLinkArrow';

const ResultWidget = ({ result }) => (
  <Widget>
    <Widget.Header>
      Resultado
    </Widget.Header>

    <Widget.Content>
      <p>
        Parabéns, você fez
        {' '}
        {result.reduce((sum, item) => {
          const isCorrect = item === true;
          if (isCorrect) {
            return sum + 1;
          }
          return sum;
        }, 0)}
        {' '}
        pontos
      </p>
      <ul>
        {result.map((item, index) => {
          const key = `result_item_${index}`;
          return (
            <li key={key}>{`#${index < 10 ? '0' : ''}${index} - ${item ? 'Acertou' : 'Errou'}`}</li>
          );
        })}
      </ul>
    </Widget.Content>
  </Widget>
);

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>

    <Widget.Content>
      [Desafio do Loading]
    </Widget.Content>
  </Widget>
);

const QuestionWidget = ({
  question, index, handleSubmit, total,
}) => {
  const [selected, setSelected] = useState(undefined);
  const [isSubmited, setSubmited] = useState(false);
  const isCorrect = selected === question.answer;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        {`Pergunta ${index + 1} de ${total}`}
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setSubmited(true);
            setTimeout(() => {
              setSubmited(false);
              setSelected(undefined);
              handleSubmit(index, isCorrect);
            }, 1000);
          }}
        >
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          {question.alternatives.map((alternative, number) => {
            const selectedStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selected === number;
            const key = `alternative_${number}`;
            return (
              <Widget.Topic
                htmlFor={`question_${number}`}
                as="label"
                key={key}
                data-selected={isSelected}
                data-status={isSubmited && selectedStatus}
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name={`question_${index}`}
                  value={number}
                  id={`question_${number}`}
                  onChange={() => { setSelected(number); }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={selected === undefined}>
            Next
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const Quiz = () => {
  const [selected, setSelected] = useState(0);
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [result, setResult] = useState([]);
  const question = db.questions[selected];
  const total = db.questions.length;
  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2000);
  }, []);
  const handleSubmit = (index, isCorrect) => {
    const newResult = result;
    newResult[index] = isCorrect;
    setResult(newResult);
    if (selected + 1 !== total) {
      setSelected(selected + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizBackground>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            index={selected}
            handleSubmit={handleSubmit}
            total={total}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget result={result} />}
      </QuizContainer>
    </QuizBackground>
  );
};

export default Quiz;
