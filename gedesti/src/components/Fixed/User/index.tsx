import './style.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function User() {
    const { t, i18n } = useTranslation()
    const [modal, setModal] = useState(false)


    return (
        <div className="user-component">
            <div className="user" onClick={() => setModal(!modal)}>
                <div className="display-grid">

                    <span className="username">Jair</span>
                </div>

                <img className="person" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
            </div>

            {modal && (

                <div className="modal">

                    <Link to="/configuration">
                        <div className="li li-settings">
                            <span className="material-symbols-outlined">
                                settings
                            </span>
                            <span>
                                {t("configurations")}
                            </span>
                        </div>
                    </Link>

                    <Link to="/">
                        <div className="li">
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <span>
                                {t("logout")}
                            </span>
                        </div>
                    </Link>

                </div>
            )}
        </div>
    )
}