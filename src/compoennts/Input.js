import React, { useRef, useEffect } from 'react';

import useField from './useField'

export default function Input({ name, ...rest }) {
    const ref = useRef();

    const { defaultValue, fieldName, registerField, error } = useField(name);

    useEffect(() => {
        if (ref.current) {
            registerField(name, ref.current)
        }
    }, [name, registerField])

    const props = {
        ...rest,
        ref,
        name: fieldName,
        id:fieldName,
        defaultValue
    }

    return (
        <>
            <input {...props} />
            {error && (<span>{error}</span>)}
        </>
    );
}
