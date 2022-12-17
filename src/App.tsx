import React from 'react';

import SignIn from './pages/SignIn';
// import Signup from './pages/Signup';

import GlobalStyle from './styles/global';

import {AuthProvider}  from './context/AuthContext';



const App: React.FC = () => (
    <>
        <AuthProvider>
    <SignIn />
        </AuthProvider>
    <GlobalStyle />
    </>
);

export default App;
