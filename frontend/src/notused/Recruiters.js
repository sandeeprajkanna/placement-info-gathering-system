import React from "react";

import MainFrame from "../../Components/MainFrame/MainFrame";

import Recruiter from "./Recruiter/Recruiter";

const recruiters = (props) => {
    return (
        <MainFrame>
            <h2>Recruiters</h2>
            <Recruiter
                name="Google Inc"
                description="Google Inc is a multinational, publicly-traded organization built around the company's hugely popular search engine. Google's other enterprises include Internet analytics, cloud computing, advertising technologies, and Web app, browser and operating system development."
                unread
            />
            <Recruiter
                name="Samsung Japan"
                description="Samsung Electronics is a multinational electronics and information technology company headquartered in Suwon and the flagship company of the Samsung Group.[89] Its products include air conditioners, computers, digital televisions, active-matrix organic light-emitting diodes (AMOLEDs), mobile phones, monitors, printers, refrigerators, semiconductors and telecommunications networking equipment"
                unread
            />
            <Recruiter
                name="Microsoft India"
                description="Its mission is to empower every person and every organization on the planet to achieve more. Microsoft set up its India operations in 1990. Microsoft in India offers its global cloud services from local data centers to accelerate digital transformation across Indian start-ups, businesses, and government agencies."
            />
        </MainFrame>
    );
};

export default recruiters;
