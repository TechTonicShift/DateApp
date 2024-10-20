import React, { useState } from 'react';
import { auth, firestore } from '../firebaseConfig'; // Ensure Firestore is imported

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [mobile, setMobile] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Check if the user already exists
            const signInMethods = await auth.fetchSignInMethodsForEmail(email);
            if (signInMethods.length > 0) {
                setError('User with this email already exists.');
                return;
            }

            // Create a new user in Firebase Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Save the user data in Firestore
            await firestore.collection('users').doc(user.uid).set({
                name,
                bio,
                mobile,
                year,
                email,
                createdAt: new Date()
            });

            alert('User signed up successfully and saved to Firestore');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                />
                <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Mobile Number"
                />
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year"
                />
                <button type="submit">Signup</button>
            </form>

            {/* Render error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Signup;
