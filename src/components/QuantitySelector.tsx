import React from 'react';

export type IQtySelectorProps = {
  qty: number;
  setQuantity:  (qty: number) => void;
};

const quantities = [1,2,3,4,5,6,7,8,9];

const QuantitySelector = (props: IQtySelectorProps) => (
    <>
        <select defaultValue={props.qty} onChange={(e)=> props.setQuantity(Number(e.target.value))} className="text-5">
            {quantities.map((qty) => (
                <option key={qty} value={qty}>{qty}</option>
            ))}
        </select>
    </>
);

export { QuantitySelector };