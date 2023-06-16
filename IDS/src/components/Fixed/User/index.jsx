import { useState, useContext } from 'react'

import onClickOutside from "react-onclickoutside";
import Modal from './Modal'
import UserContext from '../../../context/userContext';
import './style.css'


function User() {
    const [modal, setModal] = useState(false)

    const worker = useContext(UserContext).worker; // Dados do usuário

    const name = (worker?.name).split(' ')[0]; // Nome do usuário
    const image = name.substring(0, 1); // Primeira letra do nome do usuário

    // Ao clicar fora da aba de usuário, fechar a aba
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