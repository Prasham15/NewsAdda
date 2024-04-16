import React, { useState } from "react";
import axios from "axios";

export default function Profile({ info, Login, navState, setNavState }) {

    const [data, setData] = useState({ ...info, password: '' });
    const [edit, setEdit] = useState(false);
    const [password, setPassword] = useState('');


    function handleChange(e) {
        if (edit) {
            console.log(e)
            const { name, value } = e.target
            if (name !== 'email') {
                setData(prev => {
                    prev[name] = value
                    return { ...prev }
                })
            }
        }
    }

    function final(type) {
        const temp = async () => {
            const res = await axios.post('http://localhost:4000/login',{
                email: info.email,
                password: password
            })
            if (res.data.success){
                if (type === 'save'){
                    await axios.post('http://localhost:4000/login/save',{
                        email: info.email,
                        name: data.name
                    })
                    
                } else {
                    await axios.post('http://localhost:4000/login/delete',{
                        email: info.email
                    })
                    Login(false)
                    setNavState('discover')
                }
            } else {
                alert('incorrect password')
            }
        }
        temp();
    }

    return (
        <div className='login-container'>

            <div class="login-head">
                <div className='LOGO'>
                    <i className="fa-solid fa-earth-asia LOGO"></i>
                    <span> NewsAdda </span>
                </div>
            </div>

            <div className='login-body'>
                <h2 className="heading">Profile</h2>

                <div className="form">
                    <div className="input-container">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={data.name}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>


                    {edit ?
                        <div>
                            <button className="login-button" onClick={() => { final('save'); setEdit(false); }} >Save</button>
                            <button className="login-button" onClick={() => { setData({ ...info, password: '' }); setEdit(false); }}>Revert</button>

                        </div> :
                        <div>
                            <button className="login-button" onClick={() => setEdit(true)} >Edit</button>
                            <button className="login-button" onClick={() => final('delete')}>Delete</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}