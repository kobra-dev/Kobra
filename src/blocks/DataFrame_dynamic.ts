import Blockly from "blockly/core";
// @ts-ignore
import DataFramesToolboxXML from "./dataframes.xml";

const xmlChildren = Array.from(
    Blockly.Xml.textToDom(DataFramesToolboxXML).children
);

export function flyoutCategory(workspace: Blockly.Workspace): Element[] {
    const datasets = Object.entries(globalThis.uploadedDatasets) as any;
    let xmlList: Element[] =
        datasets.length > 0 ? flyoutCategoryBlocks(datasets) : [];
    xmlList = xmlList.concat(xmlChildren);
    return xmlList;
}

export function flyoutCategoryBlocks(datasets: [string, string][]): Element[] {
    let xmlList: Element[] = [];
    const label = Blockly.utils.xml.createElement("label");
    label.setAttribute("text", "Uploaded datasets");
    xmlList.push(label);

    datasets.forEach(([key]) => {
        const block = Blockly.utils.xml.createElement("block");
        block.setAttribute("type", "df_load_file");
        const val = Blockly.utils.xml.createElement("value");
        val.setAttribute("name", "NAME_VAL");
        const shadow = Blockly.utils.xml.createElement("shadow");
        shadow.setAttribute("type", "text");
        const field = Blockly.utils.xml.createElement("field");
        field.setAttribute("name", "TEXT");
        xmlList.push(
            [
                Blockly.utils.xml.createTextNode(key),
                field,
                shadow,
                val,
                block
            ].reduce((a, b) => {
                b.appendChild(a);
                return b;
            }) as Element
        );
    });

    const divider = Blockly.utils.xml.createElement("svg");
    divider.setAttribute("link", "divider.svg");
    divider.setAttribute("height", "1.5");
    xmlList.push(divider);

    return xmlList;
}
