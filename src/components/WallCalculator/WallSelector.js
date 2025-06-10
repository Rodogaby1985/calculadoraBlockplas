import React from 'react';

const WallSelector = ({ onSelectLayout }) => {
  const layouts = [
    {
      type: 'single',
      label: '1 Pared',
      imageSrc: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0EJzamQpMAYtFLWSDrwdC6mPuQOqy8zGja9l3'
    },
    {
      type: 'L',
      label: '2 Paredes (L)',
      imageSrc: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0l4DzYJXbcAaSYNqKr0LMw3z9nWTuy4eIjixU'
    },
    {
      type: 'U',
      label: '3 Paredes (U)',
      imageSrc: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc008xZa8oPyS6Nz5GRraqmfKLZjOQCH78nhAgu'
    },
    {
      type: 'square',
      label: '4 Paredes (□)',
      imageSrc: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0u6tS1MYvblOpQY7AJg0nTmsBhyINFZ6E3XCU'
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">Selecciona el tipo de construcción:</h3>
      <div className="grid grid-cols-2 gap-4"> 
        {layouts.map((layout) => (
          <button
            key={layout.type}
            onClick={() => onSelectLayout(layout.type)}
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {/* Aumentado el tamaño del contenedor de la imagen a w-40 h-40 (aprox 25% más grande que w-32 h-32) */}
            <div className="w-40 h-40 mb-2"> 
              <img 
                src={layout.imageSrc} 
                alt={layout.label} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium">{layout.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WallSelector;