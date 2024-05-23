import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Divider, Layout, Text, Icon, IconElement, IconRegistry } from '@ui-kitten/components';
import { Datepicker, DatepickerProps } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { EchoStatusBar } from './components/EchoStatusBar';
import { BasicCard } from './components/BasicCard';
import { NavigationContainer } from '@react-navigation/native';

import { BottomTabsNavigator } from './screens/BottomTabs.navigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const homeIcon = (): IconElement => {
    return (
      <Icon
        style={{ width: 32, height: 32 }}
        fill='#8F9BB3'
        name='home-outline' />
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          {/* <BottomTabsNavigator /> */}
          <EchoStatusBar />
          <Layout style={styles.container}>
            <Text style={styles.pinkText} category='h2'>Things go Here</Text>
            <Divider />
            <Button
              accessoryLeft={homeIcon}
              style={{ margin: 15 }}>Home</Button>
            <Layout level='2'>
              <Text category='s1'>This is some text inside another layout box which should have
                a different background taken from the theme</Text>
            </Layout>
            <Layout level='3' style={{ padding: 5, margin: 10 }}>
              <Text category='s1' appearance='hint'>Hint Text</Text>
              <Divider />
              <Text category='s1' appearance='alternative'>Alternative Text</Text>
            </Layout>

            <Layout level='1'
              style={{ flexDirection: 'row' }}
            >
              <BasicCard />
              <BasicCard />
            </Layout>
          </Layout>
        </NavigationContainer>
      </ApplicationProvider >
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  pinkText: {
    color: '#ff00cb',
    padding: 15
  }
});

export default App;
