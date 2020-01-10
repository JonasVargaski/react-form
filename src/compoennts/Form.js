import React, { useState, useCallback, useEffect } from 'react';

import FormContext from './FormContext'

export default function Form({ children, onSubmit, initialData }) {
    const [fields, setFields] = useState([])
    const [errors, setErrors] = useState({})

    const registerField = useCallback((name, ref) => {
        setFields(oldFields => [...oldFields, { name, ref }])
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const values = {};
        const err = {};

        fields.forEach(f => {
            values[f.name] = f.ref.value 
            err[f.name] = 'ERRRRROOOO' 
        })

        setErrors(err);
        onSubmit(values)
    }

    useEffect(() => {
        fields.forEach(f => {
            if (initialData[f.name]) {
                f.ref.value = initialData[f.name];
            }
        })
    }, [fields, initialData])

    return (
        <form onSubmit={handleSubmit}>
            <FormContext.Provider value={{ registerField , errors, unregisterField: ()=> {}, initialData}}>
                {children}
            </FormContext.Provider>
        </form>
    );
}
