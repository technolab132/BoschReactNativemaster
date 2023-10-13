import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { View, Text, Button, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";
import { Input } from 'react-native-elements';
{/* <Link href={"/EditSpindle"}></Link> */}

const EditSpindle = ({ route, navigation }) => {
    const { spindleId, datamm, refreshData } = route.params; 
    const [machineNo, setMachineNo] = useState(datamm.machine_no);
  const [newSpindleNo, setNewSpindleNo] = useState(datamm.new_spindle_no);
  const [oldSpindleNo, setOldSpindleNo] = useState(datamm.old_spindle_no);
  const [reason, setReason] = useState(datamm.reason);
  const [status, setStatus] = useState(datamm.status);
  const [type, setType] = useState(datamm.type);

    const handleSave = async () => {
        try {
          // Update the spindle history entry with the new data
          const { error } = await supabase
            .from("spindleHistory")
            .update({
              machine_no: machineNo,
              new_spindle_no: newSpindleNo,
              old_spindle_no: oldSpindleNo,
              reason: reason,
              status: status,
              type: type,
            })
            .eq("id", spindleId);
    
          if (error) {
            throw error;
          }
    
          // Call the refreshData callback to refresh the data in Dashboard
          refreshData();
    
          // Navigate back to the Dashboard
          navigation.navigate("Dashboard");
        } catch (error) {
          console.error("Error updating spindle data:", error);
        }
      };
  return (
    <ScrollView style={{padding:20,}}>
      <Text style={{fontWeight:"800"}}>Machine No:</Text>
      <Input onChangeText={(text) => setMachineNo(text)} value={machineNo} keyboardType="number-pad"/>
      {/* <TextInput
        onChangeText={(text) => setNewSpindleNo(text)}
        value={newSpindleNo}
      /> */}
      <Text style={{fontWeight:"800"}}>New Spindle No:</Text>
      <Input onChangeText={(text) => setNewSpindleNo(text)} value={newSpindleNo} keyboardType="number-pad"/>
      {/* <TextInput
        onChangeText={(text) => setOldSpindleNo(text)}
        value={oldSpindleNo}
      />       */}
      <Text style={{fontWeight:"800"}}>Old Spindle No:</Text>
      <Input onChangeText={(text) => setOldSpindleNo(text)} value={oldSpindleNo} keyboardType="number-pad"/>

      {/* <TextInput onChangeText={(text) => setReason(text)} value={reason} /> */}
      <Text style={{fontWeight:"800"}}>Reason:</Text>
      <Input onChangeText={(text) => setReason(text)} value={reason}/>
      {/* <TextInput
        onChangeText={(text) => setStatus(text)}
        value={status}
      /> */}
      <Text style={{fontWeight:"800"}}>Select Status:</Text>
      <TouchableOpacity
        onPress={() => setStatus("OK")}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginVertical:10,
            borderWidth: 2,
            borderColor: status === "OK" ? "black" : "gray",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {status === "OK" && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "black",
              }}
            />
          )}
        </View>
        <Text>OK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setStatus("Not OK")}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginVertical:10,
            borderWidth: 2,
            borderColor: status === "Not OK" ? "black" : "gray",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {status === "Not OK" && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "black",
              }}
            />
          )}
        </View>
        <Text>Not OK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setStatus("Pending")} // Set the third option
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginVertical:10,
            borderWidth: 2,
            borderColor: status === "Other" ? "black" : "gray",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {status === "Pending" && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "black",
              }}
            />
          )}
        </View>
        <Text>Pending</Text>
      </TouchableOpacity>
      <Text style={{paddingVertical:20, fontWeight:"800"}}>Select Type:</Text>
      <TouchableOpacity
        onPress={() => setType("Bore")} // Set the third option
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginVertical:10,
            borderWidth: 2,
            borderColor: status === "Other" ? "black" : "gray",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {type === "Bore" && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "black",
              }}
            />
          )}
        </View>
        <Text>Bore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setType("Spindle")} // Set the third option
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginVertical:10,
            borderWidth: 2,
            borderColor: status === "Other" ? "black" : "gray",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {type === "Spindle" && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "black",
              }}
            />
          )}
        </View>
        <Text>Spindle</Text>
      </TouchableOpacity>
      {/* Add similar inputs for other fields: oldSpindleNo, reason, status, type */}

      <TouchableOpacity style={{backgroundColor:"#262626",padding:20,width:"100%",marginVertical:30, borderRadius:10, alignItems:"center"}} onPress={handleSave}>
        <Text style={{color:"#fff"}}>Edit Spindle History</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default EditSpindle

const styles = StyleSheet.create({})