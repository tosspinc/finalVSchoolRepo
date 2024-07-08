    import React, { useEffect, useRef } from 'react';

    export default function Login() {
        const usernameRef = useRef(null);
        const passwordRef = useRef(null);

        useEffect(() => {
            // Focus on the username input when the component mounts
            if (usernameRef.current) {
                usernameRef.current.focus();
            }
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();
            // Access the current value of the input fields
            const username = usernameRef.current?.value || '';
            const password = passwordRef.current?.value || '';
            // Handle form submission logic here, such as calling an API to validate credentials
            console.log('Username:', username);
            console.log('Password:', password);
        };

        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" ref={usernameRef} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" ref={passwordRef} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </>
        );
    }
