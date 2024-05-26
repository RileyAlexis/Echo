import React, { useState, useEffect } from "react";
import { Button, Layout, Text, Modal, Card } from "@ui-kitten/components";
import { styles } from "../styles/styles";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

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

    const onSpeechEnd = () => {
        setEnd('Ended');
        setResults([]);
        setStarted('');
        setPitch('');
        setError('');
        setStuff('');
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
            onSpeechEnd();
        } catch (e) {
            console.error(e);
        }
    };

    const TriggerModal = gestureHandlerRootHOC(() => (
        <Card disabled={true}>
            <Text>Keyword Detected</Text>
            <Button onPress={() => setShowModal(false)}>Dismiss</Button>
        </Card>
    ));

    return (
        <Layout style={styles.container}>
            <Modal visible={showModal}>
                <TriggerModal />
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
        </Layout>
    )
}