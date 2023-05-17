import React, { useEffect } from 'react';

const Accessibility: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
    };

    return () => {
      document.body.removeChild(script);
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
