import React, { useState } from "react";
import { Stack } from "expo-router";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          statusBarColor:"white",
          statusBarStyle:"dark",
          headerStatusBarHeight: StatusBar.currentHeight,
          headerShadowVisible: true,
          title: "",
          headerLeft: () => (
            <Image
              style={{
                width: 100,
                height: 40,
                objectFit: "contain",
                position: "absolute",
              }}
              source={require("../assets/bosch1.png")}
            />
            // <Text>Hi</Text>
          ),
          headerRight : () => (
            <Text>Please Provide Credentials</Text>
          )
        }}
      />

      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

export default Auth;
