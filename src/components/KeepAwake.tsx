import React, { useEffect } from 'react';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

//The only purpose of this component is to keep an Android phone's screen on during testing
export const AwakeTester = () => {
    useKeepAwake();

    return (
        <>
        </>
    );
};