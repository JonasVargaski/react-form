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

  return {
    fieldName: name,
    defaultValue: initialData[name],
    error: errors[name],
    registerField,
  };
}
