import React from 'react';

export default function Input({ placeholder, type = 'text', state, setState }) {
  return (
    <>
      <label className="w-full">
        <input
          className="w-full border border-violet-200 py-4 pl-4 text-xs lg:text-xl sm:text-sm md:text-md rounded-md shadow-sm outline-none focus:border-violet-400"
          type={type}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
    </>
  );
}
