import React from "react";
import "./Home.css";
import PageLayout from "../components/PageLayout";
import CodeEditor from '../components/CodeEditor';

export default function Home(): React.ReactElement {
  return (
    <PageLayout title="Kobra Studio">
			<CodeEditor />
    </PageLayout>
  );
}
