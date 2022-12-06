import React, { useState, useEffect } from "react";
import { Link } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";



export default function DropdownList({ handleClick }: any): any {
    const { t } = useTranslation();

    const [language, setLanguage] = useState('pt');

    const changeLanguages = (languages: any) => {
        i18n.changeLanguage(languages);
        setLanguage(languages);
        localStorage.setItem('language', languages)
        handleClick(languages);
    }

    useEffect(() => {
        setLanguage(JSON.stringify(localStorage.getItem('language')))
    }, [])

    return (
        <div className="modal">

            {language === 'pt' || language === '"pt"' ? (
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

            ) : language === 'es' || language === '"es"' ? (
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
            ) : language === 'en' || language === '"en"' ? (
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
            ) : language === 'cn' || language === '"cn"' ? (
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
    )

}