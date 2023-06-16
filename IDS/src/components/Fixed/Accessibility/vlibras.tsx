import React, { useEffect } from 'react';

const Accessibility: React.FC = () => {
  useEffect(() => {

    const script = document.createElement('script'); // Cria o elemento script
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'; // Seta o src do script
    script.async = true; // Seta o async do script
    document.body.appendChild(script); // Adiciona o script no body

    script.onload = () => {
      new (window as any).VLibras.Widget('https://vlibras.gov.br/app'); // Inicializa o vlibras
    };

    return () => {
      document.body.removeChild(script); // Remove o script do body
    };
  }, []);

  return (
    <div className="enabled">
      <div vw-access-button className="active"></div>
      <div vw-plugin-wrapper>
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
};

export default Accessibility;
