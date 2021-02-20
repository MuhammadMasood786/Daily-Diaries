import React, { FC, useState } from "react";
import { useForm } from 'react-hook-form'
import { User } from "../../interfaces/user.interface";
import * as Yup from 'yup';
import http from "../../services/api";
import { saveToken, setAuthState } from "./authSlice";
import { setUser } from "./userSlice";
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
    const { register, errors, handleSubmit } = useForm<User>({
        resolver: yupResolver(schema)
    })

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const submitForm = (data: User) => {
        const path = isLogin ? '/auth/login' : '/auth/signup'
        http
            .post<User, AuthResponse>(path, data)
            .then((res) => {
                if (res) {
                    const { user, token } = res;
                    dispatch(saveToken(token))
                    dispatch(setUser(user))
                    dispatch(setAuthState(true))
                }
            })
            .catch(
                (error) => {
                    console.log(error)
                }
            )
            .finally(
                () => { setLoading(false) }
            )
    }

    return (
        <div className="auth">
            <div className="card">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="inputWrapper">
                        <input
                            ref={register}
                            name="username" placeholder="Username" />
                        {
                            errors && errors.username && (<p className="error"> {errors.username.message}</p>)
                        }
                    </div>
                    <div className="inputWrapper">
                        <input
                            ref={register}
                            name="password" type="password" placeholder="Passoword" />
                        {
                            errors && errors.password && (<p className="error"> {errors.password.message}</p>)
                        }
                    </div>
                    {!isLogin && (<div className="inputWrapper">
                        <input
                            ref={register}
                            name="email" placeholder="Email (Optional)" />
                        {
                            errors && errors.email && (<p className="error"> {errors.email.message}</p>)
                        }
                    </div>
                    )}
                    <div className="inputWrapper">
                        <button type="submit" disabled={loading}>
                            {
                                isLogin ? 'Login' : "Created account"
                            }
                        </button>
                    </div>
                    <p
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'No account? Create one' : 'Already have account'}
                    </p>
                </form>
            </div>
        </div>
    )
}


export default Auth;