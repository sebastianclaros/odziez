import React from 'react';
import { Disclosure } from '@headlessui/react'
import { Content } from '../components/Content';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Mapa } from '../components/Mapa';

interface ISucursalProps {
  nombre: string;
  direccion: string;
  horarios: {dia:string, horario:string}[];
}

const horarios = [  
  { dia: "Lunes", horario: "9 a 18hs" },
  { dia: "Martes", horario: "9 a 18hs" },
  { dia: "Miercoles", horario: "9 a 18hs" },
  { dia: "Jueves", horario: "9 a 18hs" },
  { dia: "Viernes", horario: "9 a 18hs" }
]

const Sucursal = (props: ISucursalProps) => (
  <>
    <h2>{props.nombre}</h2>
    <div className='grid-cols-3'>
      <div className='w-2/3'>
        <p className="text-sm">{props.direccion}</p>
        <Disclosure>
          <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
            <span>Horarios</span>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <ul>
            {props.horarios.map(item=>(
              <li className='grid-cols-2'>
                <div className="1/3">{item.dia}</div>
                <div  className="1/3 text-right">{item.horario}</div>
              </li>
            ))}
            </ul>
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className='w-1/3'>
          <Mapa nombre={props.nombre} direccion={props.direccion}></Mapa>
      </div>

    </div>

  </>
)

const Sucursales = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <Content>
      <Sucursal nombre="Londres" direccion="Clifford St 33, Savile Row, Londres" horarios={horarios} ></Sucursal>
      <Sucursal nombre="Buenos Aires" direccion="Leandro Alem 350, San Isidro, Buenos Aires" horarios={horarios} ></Sucursal>
      <Sucursal nombre="Tokio" direccion="2 Chome, Haginaka, Tokio, Japan" horarios={horarios} ></Sucursal>
      <Sucursal nombre="Miami" direccion="NW 12th Av, Miami, Florida, USA" horarios={horarios} ></Sucursal>
    </Content>
  </Main>
);


export default Sucursales;


