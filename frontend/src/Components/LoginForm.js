import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ Login }) {
    const [isLogin, setIsLogin] = useState(true)
    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setInfo(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleLoginSignupToggle() {
        setIsLogin(!isLogin)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isLogin) {
            axios.post("http://localhost:4000/login", {
                email: info.email,
                password: info.password
            }).then((res) => {
                console.log('response')
                console.log(res);
                if (res.data.success) {
                    console.log(res.data.existingUser)
                    Login({...res.data.existingUser,password:''})
                    console.log('Logging in...');
                    alert(`Login Successful. Welcome ${res.data.existingUser.name}`)
                    
                } else {
                    alert(res.data.message)
                    setInfo({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    })
                }
            })
        } else {
            let check = false;
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            check = regex.test(info.password);
            if (check) {
                if (info.password === info.confirmPassword) {
                    axios.post("http://localhost:4000/signup", {
                        email: info.email,
                        username: info.name,
                        password: info.password
                    }).then((res) => {
                        console.log('response')
                        console.log(res);
                        if (res.data.success) {
                            setIsLogin(true)
                            window.alert('Signup Successful.')
                        } else {
                            alert("Email Already Exists.")
                        }
                    })
                } else {
                    alert("Password and Confirm Password are different.")
                    setInfo(prev => {
                        prev.password = ''
                        prev.confirmPassword = ''
                        return {...prev}
                    })
                }
            } else {
                alert("Enter Valid Password. Conditions : Minimum 8 characters, atleast 1 capital letter, 1 small letter, 1 special character, 1 number")
                setInfo(prev => {
                    prev.password = ''
                    prev.confirmPassword = ''
                    return {...prev}
                })
            }
        }
    };


    return (
        <div className='login-container'>

            <div className='login-head' onClick={() => Login(false)}>
                <div className='LOGO'>
                    <i className="fa-solid fa-earth-asia LOGO"></i> 
                    <span> NewsAdda </span>
                </div>
            </div>

            <div className='login-body'>

                <h2 className='heading' >{isLogin ? 'Login' : 'Sign Up'}</h2>

                {isLogin && <p className='sub-heading'>To unlock Features like Save, Follow and much more...</p>}

                <div className='form'>
                    {!isLogin && <div className="input-container">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={info.name}
                            required
                        />
                    </div>}

                    <div className="input-container">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={info.email}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id='password'
                            onChange={handleChange}
                            value={info.password}
                            required
                        />
                    </div>

                    {!isLogin && <div className="input-container">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name='confirmPassword'
                            value={info.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>}

                    <button onClick={handleSubmit} className='login-button'>{isLogin ? 'Login' : 'Sign Up'}</button>
                </div>

                <p className='footer'>
                    {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
                    <span className="toggle-btn" onClick={handleLoginSignupToggle}> {isLogin ? 'Sign Up' : 'Login'} </span>
                </p>

            </div>
        </div>
    );
}