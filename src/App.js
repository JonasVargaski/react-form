import React from 'react';

import Form from './compoennts/Form';
import Input from './compoennts/Input';

function App() {

  const initialData = {
    nome: "jonas",
    sobrenome: 'Vargaski'
  }

  function submit(data) {
    console.log(data)
  }

  return (
    <div className="App">
      <Form onSubmit={submit} initialData={initialData}>
        <Input name="nome" />
        <Input name="sobrenome" />
        <button type="submit">Salvar</button>
      </Form>
    </div>
  );
}

export default App;
