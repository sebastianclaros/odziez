import React from 'react';
import { RadioGroup } from '@headlessui/react'

export type ISizeSelectorProps = {
  selectedSize: string;
  setSize:  (Size: string) => void;
  sizes: string[];
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// Not in Stock: 'cursor-not-allowed bg-gray-50 text-gray-200'
const SizeSelector = (props: ISizeSelectorProps) => (
    <RadioGroup value={props.selectedSize} onChange={props.setSize} className="mt-4">
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
        {props.sizes.map((size) => (
            <RadioGroup.Option
            key={size}
            value={size}
            disabled={!size}
            className={({ active }) =>
                classNames(
                'cursor-pointer bg-white text-gray-900 shadow-sm', 
                active ? 'ring-2 ring-indigo-500' : '',
                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                )
            }
            >
            {({ active, checked }) => (
                <>
                <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                {size ? (
                    <span
                    className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-md'
                    )}
                    aria-hidden="true"
                    />
                ) : (
                    <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                    >
                    <svg
                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        stroke="currentColor"
                    >
                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                    </svg>
                    </span>
                )}
                </>
            )}
            </RadioGroup.Option>
        ))}
        </div>
    </RadioGroup>
);

export { SizeSelector };

