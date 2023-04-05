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
        console.log("oi")

        if (worker.language) {
            setLanguage(worker.language);
            localStorage.setItem('i18nextLng', worker.language);
        } else {
            setLanguage(localStorage.getItem('i18nextLng'));
        }
    }, [])

    return (
        <div className='language' onClick={() => setShowDropdown(!showDropdown)}>
            {language === 'pt' || language === '"pt"' ? (
                <img src="/flags/br.png" alt="" />
            ) : language === 'es' || language === '"es"' ? (
                <img src="/flags/es.png" alt="" />
            ) : language === 'en' || language === '"en"' ? (
                <img src="/flags/us.png" alt="" />
            ) : language === 'cn' || language === '"cn"' ? (
                <img src="/flags/cn.png" alt="" />
            ) : (
                <img src="null" />
            )}

            {showDropdown ? <DropdownList handleClick={handleClick} children="language" /> : null}


        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Language.handleClickOutside,
};

export default onClickOutside(Language, clickOutsideConfig);
