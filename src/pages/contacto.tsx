import React, { useState } from 'react';

import { Content } from '../components/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Input } from '../components/input';
import { TextArea } from '../components/textArea';



const Contacto = () => {
  const [nombre,setNombre] = useState<string>();
  const [email,setEmail] = useState<string>();
  const [mensaje,setMensaje] = useState<string>();

  return (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <Content>
      <Input label="Nombre" name="nombre" setValue={setNombre}></Input>
      <Input label="Email o Telefono" name="email" setValue={setEmail}></Input>
      <TextArea label="Mensaje" name="mensaje" setValue={setMensaje}></TextArea>
      <button>Enviar</button>
    </Content>
  </Main>
)};

export default Contacto;
