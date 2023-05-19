import React,{useState} from "react";
import {Link} from 'react-router-dom';
import MenuItems from "./MenuItems";
import MyModal from './MyModal/MyModal';
import VdsServices from '../API/VdsService'
import {Navigate} from 'react-router-dom';

const Navbar = ({ cat, chooseCategory, chooseSubCategory }) => {
    const [modal, setModal] = useState(false);
    const auth = localStorage.getItem('auth');
    const authe = JSON.parse(auth);
    console.log(auth)
    
    try {
        const getUser = localStorage.getItem('username');
        var user = JSON.parse(getUser).username;
    } catch {
        var user = "Гость, Войдите или зарегестрируйтесь!!!"
    };
        
    function logout() {
        VdsServices.logout();
        localStorage.clear();
        document.location.reload();        
    };


    return (<nav>
        <div className="navbar" >
            <div className="navbar__links" >
                <Link to="/"  className="btn">Главная Страница</Link>
            </div>
            {authe === true
                ? (<div><Link to='/personalarea'className="btn" >{user}</Link>
                    <button className="btn" onClick={logout} >Выйти</button>
                    <Link to='/cart' className="btn" >Корзина</Link>
                    </div>)
                : (
                    <div>
                        <div><Link to='/register' className="btn">Регистрация</Link></div>
                        <div><Link to='/login' className="btn">Войти</Link></div>
                    </div>
                )
            }
            <button className="btn" onClick={() => setModal(true)}>Каталог</button>
            <nav>
            <MyModal visible={modal} setVisible={setModal}>    
                <ul className="menus">
                    {cat.map((cat, index) => {
                        const depthlevel = 0
                        return <MenuItems key={index} items={cat} chooseCategory={chooseCategory} chooseSubCategory={chooseSubCategory} depthlevel={depthlevel } />
                    })}
                </ul>
            </MyModal>
            </nav>
        </div>
   </nav> );
};



export default Navbar;