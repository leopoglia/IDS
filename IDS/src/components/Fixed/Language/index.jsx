import './style.css'
import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../../context/userContext';
import onClickOutside from "react-onclickoutside";
import DropdownList from "./Modal";
import ServicesWorker from '../../../services/workerService';

function Language() {
    const [language, setLanguage] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    let worker = useContext(UserContext).worker;


    // Drop down
    Language.handleClickOutside = () => {
        setShowDropdown(false);
    };

    const handleClick = (event) => {
        setLanguage(event);
        worker.language = event;
        ServicesWorker.updateLanguage(worker.id, worker);

    };

    useEffect(() => {

        console.log("worker --> " , worker);

        if (worker.language) {
            setLanguage(worker.language);
            localStorage.setItem('i18nextLng', worker.language);
        }

        console.log("language --> " , language)
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
