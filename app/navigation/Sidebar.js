// app/navigation/Sidebar.js
import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { supabase } from "../../lib/supabase";

const Sidebar = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <Text style={{padding:15, fontSize:20, fontWeight:"bold"}}>Spindle History</Text>
      {/* <Text style={{paddingHorizontal:15, fontSize:20, fontWeight:"bold"}}>----------------</Text> */}

      
      <TouchableOpacity style={{backgroundColor:"#ededed", marginHorizontal:15,marginVertical:8, padding:10}} onPress={() => navigation.navigate("Dashboard")}>
        <Text>View All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"#ededed", marginHorizontal:15,marginBottom:15, padding:10}} onPress={() => navigation.navigate("AddSpindleHistory")}>
        <Text>Add Spindle History</Text>
      </TouchableOpacity>

      <Text style={{padding:15, fontSize:20, fontWeight:"bold"}}>Feedbacks</Text>
      {/* <Text style={{paddingHorizontal:15, fontSize:20, fontWeight:"bold"}}>----------------</Text> */}

      <TouchableOpacity style={{backgroundColor:"#ededed", marginHorizontal:15,marginVertical:8, padding:10}} onPress={() => navigation.navigate("Feedback")}>
        <Text>View All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"#ededed", marginHorizontal:15,marginBottom:15, padding:10}} onPress={() => navigation.navigate("AddFeedback")}>
        <Text>Add Feedbacks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:"#ededed", marginHorizontal:15,marginBottom:15, padding:10}} onPress={() => supabase.auth.signOut()}>
        <Text>Sign out</Text>
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
