import './style.css'
import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";


export default function Language() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('pt')
    const [modal, setModal] = useState(false)

    function searchLanguage() {
        if (localStorage.getItem('i18nextLng') !== null) {
            changeLanguage(localStorage.getItem('i18nextLng'))
            console.log(localStorage.getItem('i18nextLng'))
        }
    }


    useEffect(() => {
        searchLanguage();
    }, [])


    const changeLanguage = (languages: any) => {
        i18n.changeLanguage(languages);
        setLanguage(languages);
    }




    return (
        <div className='language' onClick={() => setModal(!modal)}>
            {language === 'pt' ? (
                <img src="../flags/br.png" alt="" />
            ) : language === 'es' ? (
                <img src="../flags/es.png" alt="" />
            ) : language === 'en' ? (
                <img src="../flags/us.png" alt="" />
            ) : language === 'cn' ? (
                <img src="../flags/cn.png" alt="" />
            ) : (
                <img src="../flags/br.png" alt="" />
            )}

            {

                modal && (
                    <div className="modal">

                        {language === 'pt' ? (
                            <div>
                                <div className='flag' onClick={() => changeLanguage("es")}>
                                    <img src="../flags/es.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('en')}>
                                    <img src="../flags/us.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('cn')}>
                                    <img src="../flags/cn.png" alt="" />
                                </div>

                            </div>

                        ) : language === 'es' ? (
                            <div>
                                <div className='flag' onClick={() => changeLanguage('pt')}>
                                    <img src="../flags/br.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('en')}>
                                    <img src="../flags/us.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('cn')}>
                                    <img src="../flags/cn.png" alt="" />
                                </div>
                            </div>
                        ) : language === 'en' ? (
                            <div>
                                <div className='flag' onClick={() => changeLanguage('pt')}>
                                    <img src="../flags/br.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('es')}>
                                    <img src="../flags/es.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('cn')}>
                                    <img src="../flags/cn.png" alt="" />
                                </div>
                            </div>
                        ) : language === 'cn' ? (
                            <div>
                                <div className='flag' onClick={() => changeLanguage('pt')}>
                                    <img src="../flags/br.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('es')}>
                                    <img src="../flags/es.png" alt="" />
                                </div>

                                <div className='flag' onClick={() => changeLanguage('en')}>
                                    <img src="../flags/us.png" alt="" />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className='flag'>
                                    <img src="../flags/br.png" alt="" />
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

