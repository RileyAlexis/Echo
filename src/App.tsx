import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Divider, Layout, Text, Icon, IconElement, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { EchoStatusBar } from './components/EchoStatusBar';
import { BasicCard } from './components/BasicCard';
import { NavigationContainer } from '@react-navigation/native';

import { BottomTabsNavigator } from './screens/BottomTabs.navigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        {/* <EchoStatusBar /> */}
        <NavigationContainer>
          <BottomTabsNavigator />

        </NavigationContainer>
      </ApplicationProvider >
    </>

  );
}



export default App;
