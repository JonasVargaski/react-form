import React, { useState, useCallback } from 'react';

import FormContext from './FormContext'

export default function Form({ children, onSubmit, initialData ={}, schema }) {
    const [fields, setFields] = useState([])
    const [errors, setErrors] = useState({})

    const registerField = useCallback((name, ref) => {
        setFields(oldFields => [...oldFields, { name, ref }])
    }, []);

    const unregisterField = useCallback((name) => {
        setFields(oldFields =>  oldFields.filter(o=> o.name !== name));
    }, []);

    function resetForm(data = {}) {
        setErrors({});

        fields.forEach(({ name, ref }) => { 
           ref.value = data[name] ?? '';
        });
      }

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {};
        
        fields.forEach(f => {
            data[f.name] = f.ref.value 
        })
        
        try {
            if (schema) {
                setErrors({});
              await schema.validate(data, {
                abortEarly: false,
                stripUnknown: true,
              });
      
              data = schema.cast(data, {
                stripUnknown: true,
              });
            }
      
            onSubmit(data, { resetForm });
          } catch (err) {
            const validationErrors = {};

            if (!err.inner) {
              throw err;
            }
      
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });

            setErrors(validationErrors);
          }
    }

    return (
        <form onSubmit={handleSubmit} onReset={resetForm}>
            <FormContext.Provider value={{ registerField , errors, unregisterField, initialData}}>
                {children}
            </FormContext.Provider>
        </form>
    );
}
