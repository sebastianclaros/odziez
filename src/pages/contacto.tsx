import React, { useState } from 'react';

import { Content } from '../components/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Input } from '../components/input';
import { TextArea } from '../components/textArea';
import { AppConfig } from '../utils/AppConfig';



function contacto(nombre?: string, email?: string, mensaje?: string) {
  const telefono = AppConfig.whatsapp;
  if ( nombre && email &&  mensaje ) {
      const msg = nombre +  email + mensaje;
      window.location.href = "https://api.whatsapp.com/send/?phone="+ telefono+ "&text=" + msg + "&type=phone_number";    
  }
}

const Contacto = () => {
  const [nombre,setNombre] = useState<string>();
  const [email,setEmail] = useState<string>();
  const [mensaje,setMensaje] = useState<string>();

  console.log()
  return (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <Content>
      <Input label="Nombre" name="nombre" setValue={setNombre}></Input>
      <Input label="Email o Telefono" name="email" setValue={setEmail}></Input>
      <TextArea label="Mensaje" name="mensaje" setValue={setMensaje}></TextArea>
      <button onClick={()=>contacto(nombre, email, mensaje)} >Enviar</button>
    </Content>
  </Main>
)};

export default Contacto;
