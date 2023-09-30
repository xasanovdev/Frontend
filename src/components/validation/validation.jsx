import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function Validation() {
  const { error } = useSelector((state) => state.auth);


  return error !== null ? (
    <div className="m-auto text-center text-red-700 text-xl bg-red-200 w-full py-4 rounded-md">
      {console.log(error)}
    </div>
  ) : (
    <></>
  );
}
