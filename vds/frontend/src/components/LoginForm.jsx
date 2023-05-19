import React, { useState} from "react"; 
import VdsService from "./API/VdsService";
import {Navigate} from 'react-router-dom'

const LoginForm = ()  => {
    const [username, setUsername] = useState({ username: '' });
    const [password, setPassword] = useState({ password: '' });
    const [state, setState] = useState({redirect: false});
    const auth = localStorage.getItem('auth');
    const authe = JSON.parse(auth);

    function Login(e) {
        e.preventDefault();
        const log_data = {
            username: username.username,
            password: password.password
        };
        const log = VdsService.logUser(log_data)
        console.log(log)
        log.then((result) => {
        console.log(auth)
        localStorage.setItem('token', JSON.stringify(result.auth_token));
        localStorage.setItem('auth', true)
        localStorage.setItem('username', JSON.stringify(username));
        setState({redirect: true})
        });
    };

    if (state.redirect) {
        return <Navigate  to='/'/>
    }

    return (
        <form>
            <input type='text' placeholder='Логин' value={username.username} onChange={e => setUsername({username:e.target.value})} />
            <input type='text' placeholder='Пароль' value={password.password} onChange={e => setPassword({ password: e.target.value })}  />

            <button type='submit' onClick={Login} >Отправить</button>
            {authe==true
                ?<a>Вы уже авторизовались , вернитесь на главную страницу</a>
                :''
            }
        </form>
    )
}


export default LoginForm;