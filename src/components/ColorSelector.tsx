import React from 'react';
import { RadioGroup } from '@headlessui/react'

export type IColorSelectorProps = {
  selectedColor: string;
  setColor:  (color: string) => void;
  colors: string[];
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const ColorSelector = (props: IColorSelectorProps) => (

<RadioGroup value={props.selectedColor} onChange={props.setColor} className="mt-4">
    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
    <div className="flex items-center space-x-3">
    {props.colors.map((color) => (
        <RadioGroup.Option
        key={color}
        value={color}
        style={{backgroundColor: color}}
        className={({ active, checked }) =>
            classNames(
            active && checked ? 'ring ring-offset-1' : '',
            !active && checked ? 'ring-2' : '',
            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
            )
        }
        >
        <RadioGroup.Label as="span" className="sr-only">
            {color}
        </RadioGroup.Label>
        <span
            style={{backgroundColor: color}}
            aria-hidden="true"
            className={classNames(
            'h-8 w-8 rounded-full border border-black border-opacity-10'
            )}
        />
        </RadioGroup.Option>
    ))}
    </div>
</RadioGroup>
);

export { ColorSelector };