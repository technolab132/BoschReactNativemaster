// app/navigation/Sidebar.js
import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

const Sidebar = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <TouchableOpacity style={{backgroundColor:"#fff", padding:15}} onPress={() => navigation.navigate("AddSpindleHistory")}>
        <Text>Add Spindle History</Text>
      </TouchableOpacity>
      {/* <DrawerItem
        label="Account"
        onPress={() => navigation.navigate("Account")}
      />
      <DrawerItem
        label="Dashboard"
        onPress={() => navigation.navigate("Dashboard")}
      /> */}
      {/* Add more navigation items as needed */}
    </DrawerContentScrollView>
  );
};

export default Sidebar;
