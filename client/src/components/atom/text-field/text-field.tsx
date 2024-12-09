import { useState } from 'react';
import './textField.css';

interface TextFieldProps {
    value: string;
    onInput: Function;
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    ref?: any;
    focus?: boolean;
    onKeyPress?: Function;
}

const TextField = ({
    value,
    onInput,
    type,
    placeholder,
    ref,
    focus,
    onKeyPress,
}: TextFieldProps) => {
    const [borderColor, setBorderColor] = useState('gray');
    const [bgColor, setBgColor] = useState('');
    return (
        <div className='input-wrap'>
            {type !== "password" ? (

                <input
                    type={type}
                    value={value}
                    className='register-input'
                    placeholder={placeholder}
                    onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
                    ref={ref}
                    autoFocus={focus}
                    onFocus={() => { setBorderColor('rgb(0, 81, 255)'); setBgColor('rgba(0, 181, 252, 0.171)') }}
                    onBlur={() => { setBorderColor('gray'); setBgColor('') }}
                    style={{ borderColor: `${borderColor}`, backgroundColor: `${bgColor}` }}
                    onKeyDown={onKeyPress && onKeyPress()}
                />) :
                <input
                    type='password'
                    value={value}
                    className='register-input'
                    placeholder={placeholder}
                    onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
                    onFocus={() => { setBorderColor('rgb(0, 81, 255)'); setBgColor('rgba(0, 181, 252, 0.171)') }}
                    onBlur={() => { setBorderColor('gray'); setBgColor('') }}
                    style={{ borderColor: `${borderColor}`, backgroundColor: `${bgColor}` }}
                />
            }
        </div>
    )
}

export default TextField;
