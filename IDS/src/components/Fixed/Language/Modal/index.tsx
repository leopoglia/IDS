import React, { useState, useEffect, useContext } from "react";
import i18n from "../../../../i18n";
import UserContext from "../../../../context/userContext";
import Language from "..";


type Language = 'pt' | 'es' | 'en' | 'cn';

interface Props {
  handleClick: (lang: Language) => void;
}

const DropdownList = ({ handleClick }: Props) => {
  const [language, setLanguage] = useState<Language>('pt');
  const worker = useContext(UserContext).worker;

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng') as Language;

    if (lang) {
      setLanguage(lang);
      i18n.changeLanguage(lang);
    } else if (worker) {
      setLanguage(worker.language as Language);
      i18n.changeLanguage(worker.language as Language);
    }


  }, [worker]);

  const changeLanguage = (lang: any) => {
    setLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    handleClick(lang);
    i18n.changeLanguage(lang);
  };

  const renderFlags = () => {
    const flags = [
      { lang: 'pt', src: '/flags/br.png' },
      { lang: 'es', src: '/flags/es.png' },
      { lang: 'en', src: '/flags/us.png' },
      { lang: 'cn', src: '/flags/cn.png' },
    ];

    return flags
      .filter((flag) => flag.lang !== language)
      .map((flag) => (
        <div className='flag' onClick={() => changeLanguage(flag.lang)} key={flag.lang}>
          <img src={flag.src} alt='' />
        </div>
      ));
  };

  return (
    <div className='modal'>
      {renderFlags()}
    </div>
  );
};

export default DropdownList;
