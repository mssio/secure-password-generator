import React from 'react'
import { StyleSheet, View, StatusBar, Clipboard } from 'react-native'
import { Constants } from 'expo'
import { Text, Button } from 'react-native-elements'
import Base62 from 'base62'

export default class App extends React.Component {
  state = {
    password: ''
  }

  componentWillMount () {
    this.generatePassword()
  }

  generatePassword = () => {
    this.setState({
      password: this._generateMacLikePassword(),
    })
  }

  copyPassword = () => {
    Clipboard.setString(this.state.password)
    alert('Password has been copied to the clipboard!')
  }

  _generateRandomNumber () {
    return Math.round(Math.random() * 238327)
  }

  _generateMacLikePassword = (count = 4) => {
    let passwordArray = []
    for (let i = 0; i < count; i++) {
      passwordArray.push(("000" + Base62.encode(this._generateRandomNumber())).slice(-3))
    }
    return passwordArray.join('-')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'maroon', height: Constants.statusBarHeight}}>
          <StatusBar barStyle='light-content' />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text h2>New Password</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.passwordText}>{this.state.password}</Text>
            <View style={styles.actionContainer}>
              <View style={styles.actionColumnContainer}>
                <Button
                  onPress={this.copyPassword}
                  raised
                  backgroundColor="green"
                  icon={{name: 'cached'}}
                  title='Copy' />
              </View>
              <View style={styles.actionColumnContainer}>
                <Button
                  onPress={this.generatePassword}
                  raised
                  backgroundColor="red"
                  icon={{name: 'cached'}}
                  title='ReGenerate' />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  actionColumnContainer: {
    flex: 1,
  },
})
