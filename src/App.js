import React  from 'react';
import * as Yup from 'yup';

import './app.css'

import Form from './components/Form';
import Input from './components/Input';

function App() {

  const schema = Yup.object().shape({
    name: Yup.string().min(5),
    lastName: Yup.string().min(10),
  })

  const initialData = {
    name: "Jonas",
    lastName: 'Vargaski'
  }

  function submit(data, { resetForm }) {
    alert(JSON.stringify(data))
    resetForm({ name: 'Other' })
  }

  return (
    <div className="container">
      <Form onSubmit={submit} schema={schema} initialData={initialData}>
        <Input label="Name" name="name" />
        <Input label="Last name" name="lastName" />
        <button type="submit">Save</button>
      </Form>
    </div>
  );
}

export default App;
