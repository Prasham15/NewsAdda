import React from "react"
import { createRoot } from "react-dom/client"

import './Styles/index.css'
import './Styles/Navbar.css'
import './Styles/Newscards.css'
import './Styles/Login.css'
import './Styles/Sidebar.css'
import './Styles/Discover.css'
import './Styles/Weather.css'

import App from "./Components/App"

const root = createRoot(document.getElementById('root'))
root.render( <App /> );
