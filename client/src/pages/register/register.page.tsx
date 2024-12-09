import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/atom/text-field/text-field';
import AuthService from "../../service/auth-service";
import useToast from '../../hooks/useToast';
import axios from 'axios';

const Register = () => {
  const [fName, setFName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const {
    toastError,
    toastSuccess,
    toastWarning
  } = useToast();

  const validateData: () => boolean = () => {
    let isValid: boolean = true;

    if (!(validator.isEmail(email))) {
      isValid = false;
      toastWarning('Enter valid email!');
      return isValid;
    }
    if (!(password.length >= 8 && password.length <= 25)) {
      isValid = false;
      toastWarning('Password length must be in range 8 to 25!');
      return isValid;
    }
    if (password !== confirmPassword) {
      isValid = false;
      toastWarning('Passwords are not matching');
      return isValid;
    }
    return isValid;
  }

  const registerUser = async (e: any) => {
    e.preventDefault();
    console.log("clicked");

    if (!validateData()) return;

    try {
      await AuthService.register({
        fName,
        email,
        password,
      });

      navigate("/");
      toastSuccess(`Hi ${fName}! login here`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.data.error.length > 0) {
          toastError(response?.data.error);
        } else {
          toastError('An unknown error has occurred. Please try again');
        }
      } else {
        toastError('An unknown error has occurred. Please try again');
      }
    }
  }

  const handleInputName = (value: string) => {
    setFName(value);
  }
  const handleInputPassword = (value: string) => {
    setPassword(value);
  }
  const handleInputEmail = (value: string) => {
    setEmail(value);
  }
  const handleInputConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  }
  const loginAccount = () => {
    navigate('/');
  }
  return (
    <div className='auth-page'>
      <div className='auth-container'>

        <h3 className='auth-heading'>Register!</h3>
        <TextField
          type='text'
          value={fName}
          placeholder='Full Name'
          onInput={handleInputName}
          focus={true}
        />
        <TextField
          type='email'
          value={email}
          placeholder='Email'
          onInput={handleInputEmail}
        />
        <TextField
          type='password'
          value={password}
          placeholder='Password'
          onInput={handleInputPassword}
        />
        <div className='password-input-container'>
          <TextField
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onInput={handleInputConfirmPassword}
          />
        </div>
        <div className='auth-btn-container'>
          <button className=' auth-btn base-bg-btn' onClick={loginAccount}>Sign in</button>
          <button className=' auth-btn blue-bg-btn' onClick={registerUser}>Register</button>
        </div>

      </div>
    </div>
  )
}

export default Register;
