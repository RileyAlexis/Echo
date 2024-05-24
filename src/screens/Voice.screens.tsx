import React, { useState, useEffect } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import { Button, Layout, Text, Modal } from "@ui-kitten/components";
import { styles } from "../styles/styles";

//Voice Imports
import Voice from '@react-native-voice/voice';

export const VoiceScreen: React.FC = () => {

    const [recognized, setRecognized] = useState('');
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [partialResults, setPartialResults] = useState<string[]>([]);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        if (Platform.OS === 'android') {
            requestAudioPermission();
        }

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const requestAudioPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Audio Permission',
                    message: 'App needs access to your microphone to detect keywords',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Audio permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const onSpeechStart = (e: any) => {
        setStarted('√');
    };

    const onSpeechRecognized = (e: any) => {
        setRecognized('√');
    };

    const onSpeechEnd = (e: any) => {
        setEnd('√');
    };

    const onSpeechError = (e: any) => {
        setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e: any) => {
        setResults(e.value);
        if (e.value.some((text: string) => text.toLowerCase().includes('your keyword'))) {
            // Perform action when keyword is detected
            // alert('Keyword detected!');
            setShowModal(true);
        }
    };

    const onSpeechPartialResults = (e: any) => {
        setPartialResults(e.value);
    };

    const onSpeechVolumeChanged = (e: any) => {
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        try {
            await Voice.start('en-US');
            setRecognized('');
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            console.error(e);
        }
    };

    const stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };



    return (
        <Layout style={styles.container}>
            <Modal visible={showModal}>
                <Text>Keyword Detected</Text>
                <Button onPress={() => setShowModal(false)}>Dismiss</Button>
            </Modal>
            <Text>Press the button and say your keyword</Text>
            <Button onPress={startRecognizing}>Start Recognizing</Button>
            <Button onPress={stopRecognizing}>Stop Recognizing</Button>
            <Text>Started: {started}</Text>
            <Text>Recognized: {recognized}</Text>
            <Text>Pitch: {pitch}</Text>
            <Text>Error: {error}</Text>
            <Text>Results: {results.join(', ')}</Text>
            <Text>Partial Results: {partialResults.join(', ')}</Text>
            <Text>End: {end}</Text>
        </Layout>
    )
}