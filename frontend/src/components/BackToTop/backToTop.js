import React, { useState, useEffect } from 'react';
import './backToTop.css';

function BackToTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > window.innerHeight / 2) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    };

    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {showTopBtn && (
                <button className="Btn" onClick={backToTop}>
                    <svg className="arrow" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg>
                </button>
            )}
        </>
    )
}

export default BackToTop;