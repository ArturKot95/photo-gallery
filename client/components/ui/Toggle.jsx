import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';

export const Toggle = React.forwardRef(
  ({ enabled: pEnabled, label, onChange, className, inverted }, ref) => {
    const [enabled, setEnabled] = useState(!!pEnabled);

    useEffect(() => {
      setEnabled(!!pEnabled);
    }, [pEnabled]);

    const handleChange = (v) => {
      setEnabled(v);
      onChange?.(v);
    };

    return (
      <div className={classNames('py-2 flex items-center', className)}>
        {inverted && (
          <div
            className="mr-2 cursor-default"
            onClick={() => handleChange(!enabled)}
          >
            {label}
          </div>
        )}
        <Switch
          ref={ref}
          checked={enabled}
          onChange={handleChange}
          // TODO: styling for disabled
          className={`${enabled ? 'bg-green-500' : 'bg-gray-500'}
        relative inline-flex flex-shrink-0 h-[25px] w-[49px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">{label}</span>
          <span
            aria-hidden="true"
            style={{ position: 'relative', top: '0.5px', left: '0.5px' }}
            className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
          pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
        {!inverted && (
          <div
            className="ml-2 cursor-default"
            onClick={() => handleChange(!enabled)}
          >
            {label}
          </div>
        )}
      </div>
    );
  }
);
