import React from 'react';

export default function Footer() {
  return (
    <div className="w-full relative py-4 border-t-2 border-slate-200">
      <footer className="container m-auto text-center">
        <p className="font-semibold">
          created with 🖤 by{' '}
          <a className='underline hover:no-underline' href="https://xasanov-dev.vercel.app/">xasanov.dev</a>
        </p>
      </footer>
    </div>
  );
}
