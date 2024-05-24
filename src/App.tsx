import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Divider, Layout, Text, Icon, IconElement, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { NavigationContainer } from '@react-navigation/native';

import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { AppNavigator } from './screens/BottomTabsKitten';
import { EchoStatusBar } from './components/EchoStatusBar';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <IconRegistry icons={EvaIconsPack} />
      {/* <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer> */}
      <AppNavigator />
    </ApplicationProvider>
  );
};

export default App;
