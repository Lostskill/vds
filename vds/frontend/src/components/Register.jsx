import React,{useState} from "react";
import VdsServices from "./API/VdsService";
import { Navigate } from "react-router-dom";
const RegisterForm = () => {
    const [username, setUsername] = useState({ username: '' });
    const [email, setEmail] = useState({ email: '' });
    const [password, setPassword] = useState({ password: '' });
    const [state, setState] = useState({ redirect: false })
    
    function regUser(newUser) {
        const res = VdsServices.registerUser(newUser);
        console.log(res.data);
    };
    const addUser = (event) => {
        event.preventDefault();
        if (password.password.length < 8) {
            console.log('пароль должен быть длинее!!!')
        }
        else {
            const newUser = {
                email: email.email,
                username: username.username,
                password: password.password,
            };
            regUser(newUser);
            setState({ redirect:true})
        };
        
    };
    if (state.redirect) {
        return <Navigate push to = '/'/>
    };

    return (
    <div>
        <input type="text" placeholder='Логин' value={username.username} onChange={e => setUsername({ username: e.target.value })} />
        <input type="text" placeholder='Email' value={email.email} onChange={e => setEmail({ email: e.target.value })} />
        <input type="text" placeholder='Пароль' value={password.password} onChange={e => setPassword({ password: e.target.value })} />
        <a>Пароль должен состоять не менее чем из 8 символов</a>
        <button onClick={addUser}>Отправить</button>
    </div>
    );

};

export default RegisterForm;