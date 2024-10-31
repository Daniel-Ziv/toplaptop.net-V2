import React from "react";

function Header({ text, className = {} }) {
    return <h1 dir="rtl" className={className}>{text}</h1>;
}

export default Header;
