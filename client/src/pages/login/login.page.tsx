import './login.css';
import { useState } from 'react';
import validator from 'validator';
import TextField from '../../components/atom/text-field/text-field';
import AuthService from '../../service/auth-service';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const {
        toastSuccess,
        toastWarning,
        toastError
    } = useToast();

    const validateData = () => {
        let isValid: boolean = true;
        if (!(validator.isEmail(email))) {
            isValid = false;
            toastWarning('Enter valid email!');
        };
        if (!(password.length >= 8 && password.length <= 25)) {
            isValid = false;
            toastWarning('Password length must be in range 8 to 25!');
        };
        return isValid;
    }

    const userLogin = async () => {
        if (!validateData()) {
            return;
        }
        try {
            const response = await AuthService.login({
                email,
                password
            });
            console.log(response);
            await login(response.data.accessToken);
            localStorage.setItem('Token', response.data.accessToken);

            navigate("/dashboard");
            toastSuccess(`Successfully logged in!`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error;
                if (response?.data.error.length > 0) {
                    toastError(response?.data.error);
                } else {
                    toastError('Incorrect Username or Password');
                }
            } else {
                toastError('An unknown error has occured. Please try again.');
            }
        }
    };

    const createAccount = () => {
        navigate('/register');
    }

    const handleEmailInput = (value: string) => {
        setEmail(value);
    };
    const handelPasswordInput = (value: string) => {
        setPassword(value);
    }
    return (
        <div className='auth-page'>

            <div className='auth-container'>

                <h3 className='auth-heading'>Sign in!</h3>
                <TextField
                    value={email}
                    onInput={handleEmailInput}
                    type='email'
                    placeholder='Email'
                    focus={true}


                />
                <div className='password-input-container'>
                    <TextField
                        value={password}
                        onInput={handelPasswordInput}
                        type='password'
                        placeholder='Password'
                        onKeyPress={(e: any) => {
                            if (e.key === "Enter") {
                                console.log("ok")
                                userLogin();
                            }
                        }}
                    />
                    <a href='#' className='forgot-pass-link'>Forgot password?</a>
                </div>
                <div className='auth-btn-container'>
                    <button className='auth-btn base-bg-btn' onClick={createAccount}>Create account</button>
                    <button className='auth-btn blue-bg-btn' onClick={userLogin}>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
