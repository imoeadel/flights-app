import React from 'react';

const BadRequest = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Bad Request</h1>
      <p>The parameters you entered are invalid. Please adjust them and try again.</p>
    </div>
  );
};

export default BadRequest;