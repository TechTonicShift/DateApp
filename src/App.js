import React from 'react';
import Signup from './components/Signup';
import './App.css';

function App() {
    console.log(process.env.REACT_APP_FIREBASE_API_KEY);
    return (
        <div className="App">
            <h1>College Dating App</h1>
            <Signup />
        </div>
    );
}

export default App;
