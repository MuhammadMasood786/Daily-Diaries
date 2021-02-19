import React, { FC, useState } from "react";
import { useForm } from 'react-hook-form'
import { User } from "../../interfaces/user.interface";
import * as Yup from 'yup';
import http from "../../services/api";
// import { saveToken, setAuthState, } from "./authSlice";
// import { setUser } from "./userSlice";
import { AuthResponse } from "../../services/mirage/routes/user";
import { useAppDispatch } from '../../store'
import { yupResolver } from '@hookform/resolvers/yup';


const schema = Yup.object().shape({
    username: Yup.string()
        .required("What? No username")
        .max(15, ''),
    password: Yup.string()
        .required('Without password '),
    email: Yup.string()
        .email('Enter Valid Email')
})


const Auth: FC = () => {
    const {register,errors,handleSubmit}= useForm<User>({
        resolver:yupResolver(schema)
    })
    return (
        <div className="auth">
            <div className="card">
                <form onSubmit={ }>
                    <div className="inputWrapper">
                        <input
                        ref={register}
                        name="username" placeholder="Username" />
                    </div>
                    <div className="inputWrapper">
                        <input 
                        ref={register}
                        name="password" type="password" placeholder="Passoword" />
                    </div>
                    <div className="inputWrapper">
                        <input 
                        ref={register}
                        name="email" placeholder="Email" />
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Auth;