import { useContext, useEffect } from 'react';

import FormContext from './FormContext';

export default function useField(name) {
  const {
    initialData,
    errors,
    unregisterField,
    registerField,
   } = useContext(FormContext);


  useEffect(() => () => unregisterField(name), [name, unregisterField]);

  const defaultValue = initialData[name];
  const error = errors[name];

  return {
    fieldName: name,
    registerField,
    defaultValue,
    error,
  };
}
