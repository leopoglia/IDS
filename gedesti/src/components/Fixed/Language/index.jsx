import './style.css'
import React, { useState, useEffect } from 'react'
import onClickOutside from "react-onclickoutside";
import DropdownList from "./Modal";



function Language() {
    const [language, setLanguage] = useState('pt');
    const [showDropdown, setShowDropdown] = useState(false);

    // Drop down
    Language.handleClickOutside = () => {
        setShowDropdown(false);
    };

    const handleClick = (event) => {
        setLanguage(event);
    };

    useEffect(() => {
        setLanguage(localStorage.getItem('language'))
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
                <img src="/flags/br.png" alt="" />
            )}

            {showDropdown ? <DropdownList handleClick={handleClick} children="language" /> : null}
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Language.handleClickOutside,
};

export default onClickOutside(Language, clickOutsideConfig);
