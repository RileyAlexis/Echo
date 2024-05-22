import React from "react";
import { Card, Layout, Text, Button } from "@ui-kitten/components";
import { StyleSheet, ViewProps, View, Dimensions } from "react-native";

const CardHeader = (props: ViewProps): React.ReactElement => (
    <View {...props}>
        <Text category="h6">
            Card header
        </Text>
        <Text category="s1">
            Secondary Text
        </Text>
        <Button>Card Button</Button>
    </View>
);

const CardFooter = (props: ViewProps): React.ReactElement => (
    <View {...props}>
        <Text category="s2">
            Footer Caption Text
        </Text>
    </View>
)



export const BasicCard: React.FC = () => {
    const screenHeight = Dimensions.get('window').height;
    const calcHeight = screenHeight * 0.30;
    const cardHeight = {
        height: calcHeight
    }

    return (
        <Layout style={[styles.cardContainer, cardHeight]} level="1">
            <Card style={styles.card}
                header={<CardHeader />}
                footer={<CardFooter />}
                status="primary"
            >
                <Text>
                    Screen Height: {screenHeight}
                </Text>
                <Text>
                    Calculated Height: {calcHeight}
                </Text>
            </Card>
        </Layout>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: 200
    },
    card: {
        flex: 1,
    }
})