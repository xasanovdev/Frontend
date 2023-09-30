import React from 'react';

const Title = ({ title }) => {
  return (
    <>
      <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold">
        {title}
      </h1>
    </>
  );
};

export default Title;
