// app/navigation/DrawerNavigator.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Account from "../Account"; // Your Account component
import Dashboard from "../Dashboard"; // Your Dashboard component
import Sidebar from "./Sidebar"; // Your Sidebar component
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text } from "react-native";
import AddSpindleHistory from "../AddSpindleHistory";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <>
    <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
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
              source={require("../../assets/bosch1.png")}
            />
            // <Text>Hi</Text>
          ),
          headerRight : () => (
            <Text>Dashboard</Text>
          )
        }}
      />
      <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="AddSpindleHistory" component={AddSpindleHistory} />
      </Drawer.Navigator>
    </>
    // <NavigationContainer>
    // </NavigationContainer>
  );
};

export default DrawerNavigator;
