import React, { useState, useEffect } from "react";
import i18n from "../../../i18n";

function DropdownList({ handleClick }: any) {

    const [language, setLanguage] = useState('pt');

    const changeLanguages = (languages: any) => {
        i18n.changeLanguage(languages);
        setLanguage(languages);
        localStorage.setItem('language', languages)
        handleClick(languages);
    }

    return (
        <div className="modal">

            {language === 'pt' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguages("es")}>
                        <img src="/flags/es.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('en')}>
                        <img src="/flags/us.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('cn')}>
                        <img src="/flags/cn.png" alt="" />
                    </div>

                </div>

            ) : language === 'es' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguages('pt')}>
                        <img src="/flags/br.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('en')}>
                        <img src="/flags/us.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('cn')}>
                        <img src="/flags/cn.png" alt="" />
                    </div>
                </div>
            ) : language === 'en' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguages('pt')}>
                        <img src="/flags/br.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('es')}>
                        <img src="/flags/es.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('cn')}>
                        <img src="/flags/cn.png" alt="" />
                    </div>
                </div>
            ) : language === 'cn' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguages('pt')}>
                        <img src="/flags/br.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('es')}>
                        <img src="/flags/es.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguages('en')}>
                        <img src="/flags/us.png" alt="" />
                    </div>
                </div>
            ) : (
                <div>
                    <div className='flag'>
                        <img src="/flags/br.png" alt="" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownList;