import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import Input from '../src/components/TextInput';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();
  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
  };
  return (
    <QuizBackground>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            Dale
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input type="text" placeholder="Enter your name" name="name" onChange={handleChange} value={name} />
              <Button type="submit" disabled={name.length === 0}>
                Play
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h2>
              Quizes da galera
            </h2>
            <ul>
              {db.external.map((link, index) => {
                const key = `link_${index}`;
                const [project, user] = link.replace('https://', '').replace('.vercel.app/', '').split('.');
                return (
                  <li key={key}>
                    <Widget.Topic as={Link} href={`/quiz/${project}*${user}`}>{`${project}/${user}`}</Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/HeitorRamos132" />
    </QuizBackground>
  );
}
