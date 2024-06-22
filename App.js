import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Button, Alert } from 'react-native';

export default function App() {
  [data, setData] = useState('');
  [email, setEmail] = useState('');
  [password, setPassword] = useState('');
  [loginMessage, setLoginMessage] = useState('');

  async function loadData() {
    let res = await fetch('http://oranitgerbi.somee.com/api/Users/all', {
      method: 'GET'
    });
    let json = await res.json();
    setData(json);
  }

  async function login() {
    let user = {
      emailLogin: email,
      passLogin: password
    };


    let res = await fetch('http://oranitgerbi.somee.com/api/Users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      }
    });
    let json = await res.json();
    setData(json);
    if (res.ok) {
      setLoginMessage("Successful", "You are logged in")
    }
    else setLoginMessage("Incorrect email or password", "Please try again")
    setEmail('');
    setPassword('');
  
  }

  useEffect(() => {
    loadData();
  }, []);

  changeEmail = (val) => {
    setEmail(val)
  }
  changePassword = (val) => {
    setPassword(val)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <TextInput
          style={styles.input}
          value={email}
          onChangeText={changeEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={changePassword}
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Login" onPress={login} />
        {loginMessage ? <Text style={styles.loginMessage}>{loginMessage}</Text> : null}
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  loginMessage: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});
