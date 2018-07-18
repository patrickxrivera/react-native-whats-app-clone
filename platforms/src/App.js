import React from 'react';
import { View, Animated, StyleSheet, StatusBar } from 'react-native';

import Messages from './screens/messages.screen';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.imageAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.imageAnimation, {
        toValue: 1,
        duration: 1005
      })
    ).start();

    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <View style={styles.app}>
        <Messages />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#e5ddd5',
    height: '100%'
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    width: 200,
    height: 200,
    flex: 3
  },
  appTitle: {
    flex: 1,
    fontSize: 16,
    color: 'white'
  },
  appSubtitle: {
    color: 'white'
  },
  appIntro: {
    flex: 3,
    fontSize: 30,
    textAlign: 'center'
  }
});
