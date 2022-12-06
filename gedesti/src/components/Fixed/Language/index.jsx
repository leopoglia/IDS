import './style.css'
import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import onClickOutside from "react-onclickoutside";
import DropdownList from "../Modal";



function Language() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('pt');
    const [showDropdown, setShowDropdown] = useState(false);

    // Drop down
    Language.handleClickOutside = () => {
        setShowDropdown(false);
    };

    const handleClick = (event) => {
        setLanguage(event);
        console.log(event);
    };

    return (
        <div className='language' onClick={() => setShowDropdown(!showDropdown)}>
            {language === 'pt' ? (
                <img src="/flags/br.png" alt="" />
            ) : language === 'es' ? (
                <img src="/flags/es.png" alt="" />
            ) : language === 'en' ? (
                <img src="/flags/us.png" alt="" />
            ) : language === 'cn' ? (
                <img src="/flags/cn.png" alt="" />
            ) : (
                <img src="/flags/br.png" alt="" />
            )}

            {showDropdown ? <DropdownList handleClick={handleClick} /> : null}


        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Language.handleClickOutside,
};

export default onClickOutside(Language, clickOutsideConfig);
