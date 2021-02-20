import React, { useState, FC, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import { RootState } from '../../rootReducers'
import http from '../../services/api';
import { Entry } from "../../interfaces/entry.interface";
import entriesSlice, { setEntries } from "../entry/entriesSlice";
import { setCurrentEditing, setCanEdit } from "../entry/editorSlice";
import dayjs from 'dayjs';
import { useAppDispatch } from "../../store";


const DiaryEntriesList: FC = () => {
    const entries = useSelector((state: RootState) => { state })
    const dispatch = useAppDispatch();
    const { id } = useParams()

    useEffect(() => {
        if (id != null) {
            http
                .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
                .then(({ entries: _entries }) => {
                    if (_entries) {
                        const sortByLastUpdated = _entries.sort((a, b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
                        });
                        dispatch(setEntries(sortByLastUpdated))
                    }
                })
        }
    }, [id, dispatch])

    return (
        <div className="entries">
            <header>
                <Link to='/'>
                    <h3>←  Go back</h3>
                </Link>
            </header>
            <ul>
                {
                    entries.map((entry) => {
                        <li
                            key={entry.id}
                            onClick={() => {
                                dispatch(setCurrentEditing(entry))
                                dispatch(setCanEdit(true))
                            }}
                        >
                            {entry.title}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}