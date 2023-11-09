import React from "react";

interface IMapaProps {
    direccion:string;
    nombre: string;
}


 const Mapa= ( props: IMapaProps) => (
    <div className="text-sm">
        {props.direccion}
    </div>
 )

 export {Mapa};