import React, {useEffect} from "react";
import Blockly from 'blockly';
import "./Home.css";
import PageLayout from "../components/PageLayout";

const toolbox: string = `
<xml id="toolbox" style="display: none">
	<category name="Control" colour="230">
		<block type="controls_if"/>
		<block type="controls_whileUntil"/>
		<block type="controls_for"/>
	</category>
	<category name="Logic" colour="210">
		<block type="logic_compare"/>
		<block type="logic_operation"/>
		<block type="logic_boolean"/>
	</category>
</xml>
`;

export default function Home(): React.ReactElement {
  useEffect(() => {
    Blockly.inject('codeEditor', {
    	toolbox
		});
  }, []);
  return (
    <PageLayout title="Kobra Studio">
      <div id="codeEditor" style={{height: "90vh", width: "100%"}}/>
    </PageLayout>
  );
};
