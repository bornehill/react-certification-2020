import React from 'react';

const Toggle = ({ label, ...rest }) => {
  return (
    <>
      <div>
        <label htmlFor="toggle" className="font-emphasis mr-2 text-xs text-gray-700">
          {label}
        </label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            {...rest}
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-onyx-300 cursor-pointer"
          ></label>
        </div>
      </div>
    </>
  );
};

export default Toggle;
