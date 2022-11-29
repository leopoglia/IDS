import './style.css'
import React, { useState } from 'react'

export default function User() {

    const [modal, setModal] = useState(false)


    return (
        <div className="user">
            <div className="user" onClick={() => setModal(!modal)}>
                <div className="display-grid">

                    <span className="username">Jair</span>
                </div>

                <img className="person" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
            </div>

            {modal && (

                <div className="modal">

                    <div className="li">
                        <span className="material-symbols-outlined">
                            logout
                        </span>
                        <span>
                            Sair
                        </span>
                    </div>

                </div>
            )}
        </div>
    )
}