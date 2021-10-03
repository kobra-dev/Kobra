import React from "react";
import { Tutorial, TutorialModule } from "./Tutorial";

interface TutorialViewProps {}

export default function TutorialView(
    props: TutorialViewProps
) {
    return (
        <div>
            <TutorialModule
                moduleNum="1"
                moduleTitle="Introduction to Machine Learning"
            />
            <Tutorial
                moduleNum="1.1"
                moduleTitle="What is Machine Learning?"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="1.2"
                moduleTitle="Why is Machine Learning Important?"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="1.3"
                moduleTitle="Why should you learn machine learning?"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="1.4"
                moduleTitle="Machine learning in the future"
                link="https://docs.kobra.dev/"
            />

            <TutorialModule
                moduleNum="2"
                moduleTitle="Linear Regression"
            />
            <Tutorial
                moduleNum="2.1"
                moduleTitle="What is a linear regression and wher is it used?"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="2.2"
                moduleTitle="Loading the dataset"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="2.3"
                moduleTitle="Data preprocessing and visualization"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="2.4"
                moduleTitle="Fitting a linear regression"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="2.5"
                moduleTitle="Predicting with our model"
                link="https://docs.kobra.dev/"
            />
            <Tutorial
                moduleNum="2.6"
                moduleTitle="Conclusion"
                link="https://docs.kobra.dev/"
            />
        </div>
    );
}
