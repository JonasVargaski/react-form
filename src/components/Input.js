import React, { useRef, useEffect } from 'react';

import useField from './useField'

export default function Input({ label, name, multiline = false, ...rest }) {
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
        'aria-label': fieldName,
        name: fieldName,
        id:fieldName,
        defaultValue
    }

    return (
        <>
        {label && <label htmlFor={fieldName}>{label}</label>}

        {multiline ? (
          <textarea {...props} />
        ) : (
          <input {...props} />
        )}

        {error && (<span>{error}</span>)}
        </>
    );
}
