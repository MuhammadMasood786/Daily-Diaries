import React, { FC, useState } from "react";
import DiaryTile from "../diary/DiaryTile";
import Editor from "../entry/Editor";


const Home: FC = () => {

    return (
        <div className="auth">
            <div className="row">
                <div className="col-lg-8">
                    <Editor />
                </div>
                <div className="col-lg-8">
                    {/* <DiaryTile /> */}
                </div>
            </div>
        </div>
    )
}


export default Home;