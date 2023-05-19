import MenuItems from "./MenuItems";
import React from "react";
const Dropdown = ({ submenus, dropdown, depthLevel, chooseSubCategory }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    return (<ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
    {submenus.map((submenu, index) => ( <MenuItems items = {submenu}key = {index} depthLevel = {depthLevel} chooseSubCategory={chooseSubCategory}/>
    )) } </ul>
    );
};

export default Dropdown;