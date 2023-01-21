import './style.css'
import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";
import Modal from './Modal'


function User() {
    const [modal, setModal] = useState(false)

    const worker = localStorage.getItem('worker');
    const name = (JSON.parse(worker).name).split(' ')[0]
    const image = name.substr(0, 1)

    // Drop down
    User.handleClickOutside = () => {
        setModal(false);
    };


    return (
        <div className="user-component">
            <div className="user" onClick={() => setModal(!modal)}>
                <div className="display-grid">

                    <span className="username">{name}</span>
                </div>

                <div className="person">{image}</div>
            </div>

            {modal ? <Modal /> : null}

        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => User.handleClickOutside,
};

export default onClickOutside(User, clickOutsideConfig);