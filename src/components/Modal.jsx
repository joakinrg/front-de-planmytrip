import React from 'react';

const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    {children}
  </div>
);

export default Modal;
