import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer class="footer ">
            <hr/>
            <div  onClick={() => navigate("/")} className="footer-logo">
                <i class="fa-solid fa-globe"></i> NewsAdda
            </div>
            <div>Copyright (c)2024 | Terms and Conditions | Privacy Policy</div>
        </footer>
    )
}

