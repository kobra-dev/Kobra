import React from 'react';
import Tutorial from './Tutorial';

interface TutorialViewProps {}

export default function TutorialView(props: TutorialViewProps) {
  return (
    <div>
      <Tutorial
        moduleNum="1.1"
        moduleTitle="Hello World"
        link="https://www.youtube.com/watch?v=DLzxrzFCyOs"
      />
    </div>
  );
}
