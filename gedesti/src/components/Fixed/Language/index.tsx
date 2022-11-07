import './style.css'
import React, { useState } from 'react'

export default function Language() {

    const [language, setLanguage] = useState('br')
    const [modal, setModal] = useState(false)





    return (
        <div className='language' onClick={() => setModal(!modal)}>
            {language === 'br' ? (
                <img src="../flags/br.png" alt="" />
            ) : language === 'es' ? (
                <img src="../flags/es.png" alt="" />
            ) : language === 'us' ? (
                <img src="../flags/us.png" alt="" />
            ) : language === 'cn' ? (
                <img src="../flags/cn.png" alt="" />
            ) : (
                <img src="../flags/br.png" alt="" />
            )}


            <span className="material-symbols-outlined"   >expand_more</span>

            {

                modal && (
                    <div className="modal">

                        {language === 'br' ? (
                            <div>
                                <div className='flag' onClick={()=> setLanguage('es')}>
                                    <img src="../flags/es.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('us')}>
                                    <img src="../flags/us.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('cn')}>
                                    <img src="../flags/cn.png" alt="" />
                                </div>

                            </div>

                        ) : language === 'es' ? (
                            <div>
                                <div className='flag' onClick={()=> setLanguage('br')}>
                                    <img src="../flags/br.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('us')}>
                                    <img src="../flags/us.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('cn')}>
                                    <img src="../flags/cn.png" alt="" />
                                </div>
                            </div>
                        ) : language === 'us' ? (
                            <div>
                                <div className='flag' onClick={()=> setLanguage('br')}>
                                    <img src="../flags/br.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('es')}>
                                    <img src="../flags/es.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('cn')}>
                                    <img src="../flags/cn.png" alt="" />
                                </div>
                            </div>
                        ) : language === 'cn' ? (
                            <div>
                                <div className='flag' onClick={()=> setLanguage('br')}>
                                    <img src="../flags/br.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('es')}>
                                    <img src="../flags/es.png" alt="" />
                                </div>

                                <div className='flag' onClick={()=> setLanguage('us')}>
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