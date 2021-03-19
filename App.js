import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      iconName: 'play',
      last: null
    };

    // Variável do timer do relógio
    this.timer = null;

    this.run = this.run.bind(this);
    this.reset = this.reset.bind(this);
  }

  run() {
    if (this.timer != null) {
      // Aqui vai parar o timer
      clearInterval(this.timer);
      this.timer = null;
      this.setState({ iconName: 'play' });
    }
    else {
      // Começa girar o timer
      this.timer = setInterval(() => {
        this.setState({ number: this.state.number + 0.1 })
      }, 100);
      this.setState({ iconName: 'stop' });
    }
  }

  reset() {
    if (this.timer != null) {
      // Aqui vai parar o timer
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      last: this.state.number,
      number: 0,
      iconName: 'play'
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar backgroundColor='#202124' barStyle='light-content' />

        <Text style={styles.title}>Cronômetro</Text>

        <View style={styles.circle}>
          <Text style={styles.timer}>{this.state.number.toFixed(1)}</Text>
        </View>

        <TouchableOpacity style={styles.reset} onPress={this.reset}>
          <Text style={styles.resetText}>Zerar</Text>
        </TouchableOpacity>

        <View style={styles.lastArea}>
          <Text style={styles.runText}>
            {this.state.last > 0 ? 'Último tempo: ' + this.state.last.toFixed(2) + 's' : ''}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.run} >
          <Ionicons name={this.state.iconName} size={22} color='#202124' />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    alignItems: 'center'
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold'
  },
  circle: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#FFF',
    height: 180,
    width: 180,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timer: {
    color: '#8AB4F8',
    fontSize: 50
  },
  button: {
    backgroundColor: '#8AB4F8',
    width: 60,
    borderRadius: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  reset: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#8AB4F8',
    borderWidth: 2,
    borderRadius: 50,
    marginTop: 80,
    width: 180,
  },
  resetText: {
    fontSize: 15,
    color: '#8AB4F8',
    paddingVertical: 10
  },
  lastArea: {
    marginTop: 40,
  },
  runText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FFF'
  }
});