import Dropdown from './Dropdown';
import React, { useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
const MenuItems = ({ items, chooseCategory, chooseSubCategory ,depthlevel}) => {
 const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return ( <li className = "menu-items"
        ref = {
            ref
        }
        onMouseEnter = {
            onMouseEnter
        }
        onMouseLeave = {
            onMouseLeave
        } >
        {items.sub_category ? (<>
                <button type = "button" aria-haspopup = "menu" aria-expanded = {dropdown ? "true" : "false"} onClick = {() => setDropdown((prev) => !prev)}>
                {items.name} {""} 
                {depthlevel > 0 ? < span > p,,l </span> : <span className="arrow" />} 
        </button> <Dropdown depthLevel={depthlevel} submenus={items.sub_category} dropdown={dropdown} chooseSubCategory={chooseSubCategory } /> </>
            ) : ( <button onClick={()=>chooseSubCategory(items.id)} > <Link to='/product'>{items.name} </Link></button>)
        }</li>
    );
};

export default MenuItems;