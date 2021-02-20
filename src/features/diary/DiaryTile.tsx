import React, { FC, useState } from "react";
import { Diary } from "../../interfaces/diary.interface";
import http from '../../services/api';
import { updateDiary } from "./diariesSlice";
import { setCanEdit, setActiveDiaryId, setCurrentEditing } from '../entry/editorSlice'
import { showAlert } from '../../util'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store'

interface Props {
    dairy: Diary
}

const buttonStyle: React.CSSProperties = {
    fontSize: '0.7em',
    margin: '0 0.5em'
}

const DiaryTile: FC<Props> = (props) => {
    const [diary, setDiary] = useState(props.dairy);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const totalEntries = props.dairy?.entryIds?.length

    const saveChange = () => {

    }
    return (
        <div className="diary-tile">
            <h2
                className="title"
                title='Click to edit'
                onClick={() => { setIsEditing(true) }}
                style={{ cursor: 'pointer' }}
            >
                {isEditing ? (
                    <input
                        value={diary.title}
                        onChange={(e) => {
                            setDiary({
                                ...diary,
                                title: e.target.value
                            });
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                saveChange()
                            }
                        }}
                    />
                ) : (
                        <span>{diary.title}</span>
                    )}
            </h2>
            <p className="subtitle">{totalEntries ?? '0'} save entries</p>
            <button
                style={buttonStyle}
                onClick={() => {
                    dispatch(setCanEdit(true))
                    dispatch(setActiveDiaryId(diary.id as string))
                    dispatch(setCurrentEditing(null))
                }}
            >
                Add New Entry
            </button>
            <Link to={`diary/${diary.id}`} style={{ width: '100%' }}>
                <button style={buttonStyle} className="secondary">
                    View all →
                </button>
            </Link>
        </div>
    )
}

export default DiaryTile