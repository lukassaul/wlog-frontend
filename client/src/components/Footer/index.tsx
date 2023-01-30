import React from "react"
import { useNavigate } from "react-router-dom"

function Footer() {
    const navigate = useNavigate()

    return (
        <div className="footer_bg font-white flex-row-spacearound pv4h1">
            <div className="flex-start">
                <div style={{display: 'flex'}}>
                    <img src="/wlog_logo.png"/><span className="subtitlefs">Wlog</span>
                </div>
                <p>Wrapped Polygonal Logs</p>
                
            </div>
            <div className="flex-start-css">
                <p className="pointer" onClick={() => navigate('/redeem')}>Redeem</p>
                <p className="pointer" onClick={() => navigate('/swap')}>Swap</p>
                <p className="pointer" onClick={() => navigate('/faqs')}>FAQs</p>
            </div>
            <div className="flex-start-css">
                <p>Contact Us</p>
                <p>office@vtscc.org</p>
            </div>
        </div>
    )
}

export default Footer