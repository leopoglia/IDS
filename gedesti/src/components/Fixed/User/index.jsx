import './style.css'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import onClickOutside from "react-onclickoutside";
import Modal from './Modal'


function User() {
    const [modal, setModal] = useState(false)

    // Drop down
    User.handleClickOutside = () => {
        setModal(false);
    };


    return (
        <div className="user-component">
            <div className="user" onClick={() => setModal(!modal)}>
                <div className="display-grid">

                    <span className="username">Jair</span>
                </div>

                <img className="person" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
            </div>

            {modal ? <Modal /> : null}

        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => User.handleClickOutside,
};

export default onClickOutside(User, clickOutsideConfig);