import React, { useState } from "react";
import i18n from "../../../i18n";

function DropdownList() {


    const [language, setLanguage] = useState('pt')

    const changeLanguage = (languages: any) => {
        i18n.changeLanguage(languages);
        setLanguage(languages);
    }

    return (
        <div className="modal">

            {language === 'pt' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguage("es")}>
                        <img src="/flags/es.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('en')}>
                        <img src="/flags/us.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('cn')}>
                        <img src="/flags/cn.png" alt="" />
                    </div>

                </div>

            ) : language === 'es' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguage('pt')}>
                        <img src="/flags/br.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('en')}>
                        <img src="/flags/us.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('cn')}>
                        <img src="/flags/cn.png" alt="" />
                    </div>
                </div>
            ) : language === 'en' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguage('pt')}>
                        <img src="/flags/br.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('es')}>
                        <img src="/flags/es.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('cn')}>
                        <img src="/flags/cn.png" alt="" />
                    </div>
                </div>
            ) : language === 'cn' ? (
                <div>
                    <div className='flag' onClick={() => changeLanguage('pt')}>
                        <img src="/flags/br.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('es')}>
                        <img src="/flags/es.png" alt="" />
                    </div>

                    <div className='flag' onClick={() => changeLanguage('en')}>
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