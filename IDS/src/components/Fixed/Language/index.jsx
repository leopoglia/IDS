import { useState, useEffect, useContext } from 'react'

import UserContext from '../../../context/userContext';
import onClickOutside from "react-onclickoutside";
import DropdownList from "./Modal";
import ServicesWorker from '../../../services/workerService';
import i18n from '../../../i18n';
import './style.css'


function Language() {
    const [language, setLanguage] = useState(); // Linguagem do usuário
    const [showDropdown, setShowDropdown] = useState(false); // Mostrar ou não a aba de linguagens
    let worker = useContext(UserContext).worker; // Dados do usuário

    // Ao clicar fora da aba de linguagens, fechar a aba
    Language.handleClickOutside = () => {
        setShowDropdown(false);
    };

    // Atualizar linguagem do usuário no banco de dados
    const handleClick = (event) => {
        setLanguage(event);
        worker.language = event;
        ServicesWorker.updateLanguage(worker.id, worker); 
    };

    useEffect(() => {
        if (worker.language) {
            setLanguage(worker.language); // Seta a bandeira da linguagem do usuário
            i18n.changeLanguage(worker.language); // Seta a linguagem do site
            localStorage.setItem('i18nextLng', worker.language); // Seta a linguagem do site no local storage
        }

    }, [worker])

    const languageMap = {
        pt: "/flags/br.png",
        es: "/flags/es.png",
        en: "/flags/us.png",
        cn: "/flags/cn.png"
    };

    const flagSrc = languageMap[language] || "null";

    return (
        <div className='language' onClick={() => setShowDropdown(!showDropdown)}>
            <img src={flagSrc} alt="" />

            {showDropdown ? <DropdownList handleClick={handleClick} children="language" /> : null}
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Language.handleClickOutside,
};

export default onClickOutside(Language, clickOutsideConfig);
