/* eslint-disable @typescript-eslint/no-unused-vars */
import React , { createContext , useContext, useCallback, useState} from 'react';
import { v4 as uuid } from 'uuid';
import ToastContainer from "../components/ToastContainer";

export interface ToastMEssage {
    id: string;
    type: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

interface ToastContextData {
    addToast(message: Omit<ToastMEssage, 'id'> ): void;
    removeToast(id: string): void;
}

interface props {
    children: any;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<props>  = ({children}) => {
    const [ messages, setMessages] = useState<ToastMEssage[]>([])

    const addToast = useCallback(({type, title, description}: Omit<ToastMEssage, 'id'>) => {
        const id = uuid();

        const toast = {
            id, 
            type,
            title,
            description,
        };
        setMessages((state) => [...state, toast])
    }, 
    []);

    const removeToast = useCallback((id: string) => {
        setMessages((state) => state.filter((message) => message.id === id ))
        
    }, []);
    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages}/>
        </ToastContext.Provider>
    );
}

function useToast(): ToastContextData {
    const context =  useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export {ToastProvider, useToast};