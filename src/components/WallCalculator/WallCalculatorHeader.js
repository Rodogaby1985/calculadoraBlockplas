import React from 'react';

const WallCalculatorHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <img 
        src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0D1f3RDAClE5QWIJ7Vmfjash4qouSygRTxLZ1" 
        alt="Logo Blockplas" 
        className="mx-auto mb-4" 
        style={{ width: '200px' }} 
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculadora Profesional de Ladrillos</h1>
      <p className="text-gray-600">
        Selecciona el tipo de construcción y completa las medidas
      </p>
    </div>
  );
};

export default WallCalculatorHeader;