import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { Button, Layout, Text, Modal, Card } from "@ui-kitten/components";
import { PERMISSIONS } from "react-native-permissions";
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
    let engines: any;

    const [stuff, setStuff] = useState('');

    const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //     Voice.isAvailable()
    //         .then((available) => {
    //             console.log("Available", available);
    //             if (available && Platform.OS === 'android') {
    //                 // Get the list of available speech recognition capabilities
    //                 Voice.getSpeechRecognitionServices()
    //                     .then((services: any) => {
    //                         console.log('Available speech recognition services:', services);
    //                     })
    //                     .catch((error: any) => {
    //                         console.error('Failed to get speech recognition services:', error);
    //                     });
    //             } else if (!available && Platform.OS === 'android') {
    //                 console.log('Speech recognition is not available on this device.');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Failed to check speech recognition availability:', error);
    //         });
    // }, []);


    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

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
        if (e.value.some((text: string) => text.toLowerCase().includes('keyword'))) {
            // Perform action when keyword is detected
            // alert('Keyword detected!');
            setShowModal(true);
            setStuff('Keyword Triggered');
            setResults([]);
        }
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

    // useEffect(() => {
    //     for (let i in results) {
    //         if (results[i] === 'keyword' || 'Keyword') {
    //             Alert.alert('Keyword');
    //             setStuff('Keyword Triggered')

    //         }
    //     }
    // }, [results])



    return (
        <Layout style={styles.container}>
            <Modal visible={showModal}>
                <Card disabled={true}>
                    <Text>Keyword Detected</Text>
                    <Button onPress={() => setShowModal(false)}>Dismiss</Button>
                </Card>
            </Modal>
            <Text>Press the button and say your keyword</Text>
            <Button onPress={startRecognizing}>Start Recognizing</Button>
            <Button onPress={stopRecognizing}>Stop Recognizing</Button>
            <Text>Started: {started}</Text>
            <Text>Recognized: {recognized}</Text>
            <Text>Pitch: {pitch}</Text>
            <Text>Error: {error}</Text>
            <Text>Results: {results.join(', ')}</Text>
            <Text>End: {end}</Text>
            <Text>Stuff: {stuff}</Text>
            <Text>Engines: {engines}</Text>
        </Layout>
    )
}