import React from 'react';
import { Tutorial, TutorialModule } from './Tutorial';

interface TutorialViewProps {}

export default function TutorialView(props: TutorialViewProps) {
  return (
    <div>
      <TutorialModule
        moduleNum="1"
        moduleTitle="Introduction to Machine Learning"
      />
      <Tutorial
        moduleNum="1.1"
        moduleTitle="What is Machine Learning?"
        link="https://www.youtube.com/watch?v=DLzxrzFCyOs"
      />
      <Tutorial
        moduleNum="1.2"
        moduleTitle="Why is Machine Learning Important?"
        link="https://www.youtube.com/watch?v=DLzxrzFCyOs"
      />
      <Tutorial
        moduleNum="1.3"
        moduleTitle="Why should you learn machine learning?"
        link="https://www.youtube.com/watch?v=DLzxrzFCyOs"
      />
      <Tutorial
        moduleNum="1.4"
        moduleTitle="Machine learning in the future"
        link="https://www.youtube.com/watch?v=DLzxrzFCyOs"
      />
    </div>
  );
}
