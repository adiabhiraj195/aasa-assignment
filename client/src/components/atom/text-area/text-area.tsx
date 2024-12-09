import { resolveObjectURL } from 'buffer';
import React, { useState } from 'react'

interface TextAreaInterface {
    placeholder: string;
    cols: number;
    rows: number;
    onInput: Function;
    value: string;
}

export const TextArea = ({
    placeholder,
    cols,
    rows,
    onInput,
    value,
}: TextAreaInterface) => {
    const [documentState, setDocumentState] = useState("");
    return (
        <div>
            <textarea
                placeholder={placeholder}
                typeof='string'
                onChange={(e)=>onInput((e.target as HTMLTextAreaElement).value)}
                value = {value}
                cols={cols}
                rows={rows}
            />
        </div>
    )
}
