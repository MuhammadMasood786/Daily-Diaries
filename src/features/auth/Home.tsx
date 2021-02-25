import React, { FC } from "react";
import Editor from "../entry/Editor";
import Diaries from '.././diary/Diaries'

const Home: FC = () => {

    return (
        <div className="two-cols">
            <div className="left">
                <Diaries />
            </div>
            <div className="right">
                <Editor />
            </div>
        </div>
    )
}


export default Home;