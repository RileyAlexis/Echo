// ScaleContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
//Types
import { SharedValue } from 'react-native-reanimated';

interface ScaleProps {
    children: ReactNode
}

interface ScaleContextType {
    scale: SharedValue<number>;
    savedScale: SharedValue<number>;
    resetScale: () => void;
}

const ScaleContext = createContext<ScaleContextType | null>(null);

export const ScaleProvider: React.FC<ScaleProps> = ({ children }) => {
    const [scale, setScale] = useState(1);


    return (
        <ScaleContext.Provider value={{ scale, setScale }}>
            {children}
        </ScaleContext.Provider>
    );
};

export const useScale = () => {
    const context = useContext(ScaleContext);
    if (!context) {
        throw new Error('useScale must be used within a ScaleProvider')
    }
    return context;
}