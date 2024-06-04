import React from 'react';
import { Link } from 'react-router-dom';
import './css/styles.css';

export function Navbar() {  
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/journal">Journal</Link></li>
                <li><Link to="/summary">Summary</Link></li>
            </ul>
            {/* <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/journal" element={<JournalApp />} />
                <Route path="/summary" element={<SummaryApp />} />
            </Routes> */}
        </nav>
    );
}
