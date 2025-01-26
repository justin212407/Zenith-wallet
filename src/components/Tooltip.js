import React from 'react';

function Tooltip({ message }) {
  return (
    <span className="relative group cursor-pointer">
      ℹ️
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-1 rounded shadow-lg">
        {message}
      </span>
    </span>
  );
}

export default Tooltip;
