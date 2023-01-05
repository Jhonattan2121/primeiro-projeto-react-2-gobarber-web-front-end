import React from 'react';


import { AuthProvider } from "./Auth";
import { ToastProvider } from "./Toast";

interface props {
    children: any;
}

const AppProvider: React.FC<props> = ({children}) => {
   return <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
    </AuthProvider>; 

}

export default AppProvider;