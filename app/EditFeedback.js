import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { View, Text, Button, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";
import { Input } from 'react-native-elements';
{/* <Link href={"/EditSpindle"}></Link> */}

const EditFeedback = ({ route, navigation }) => {
    const { feedbackId, datamm, refreshData } = route.params; 
    const [machineNo, setMachineNo] = useState(datamm.machine_no);
  const [problem, setProblem] = useState(datamm.problem);
  const [action, setAction]  = useState(datamm.action);
  const [responsible, setResponsible] = useState(datamm.responsible);
  const [status, setStatus] = useState(datamm.status);
  const [type, setType] = useState(datamm.type);

    const handleSave = async () => {
        try {
          // Update the spindle history entry with the new data
          const { error } = await supabase
            .from("feedback")
            .update({
                machine_no: machineNo,
                problem: problem,
                action: action,
                responsible: responsible,
                status: status,
            })
            .eq("id", feedbackId);
    
          if (error) {
            throw error;
          }
    
          // Call the refreshData callback to refresh the data in Dashboard
          refreshData();
    
          // Navigate back to the Dashboard
          navigation.navigate("Feedback");
        } catch (error) {
          console.error("Error updating Feedback data:", error);
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
      <Text style={{fontWeight:"800"}}>Problem :</Text>
      <Input onChangeText={(text) => setProblem(text)} value={problem}/>
      {/* <TextInput
        onChangeText={(text) => setOldSpindleNo(text)}
        value={oldSpindleNo}
      />       */}
      <Text style={{fontWeight:"800"}}>Action :</Text>
      <Input onChangeText={(text) => setAction(text)} value={action} />

      {/* <TextInput onChangeText={(text) => setReason(text)} value={reason} /> */}
      <Text style={{fontWeight:"800"}}>Responsible :</Text>
      <Input onChangeText={(text) => setResponsible(text)} value={responsible}/>
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
      {/* Add similar inputs for other fields: oldSpindleNo, reason, status, type */}

      <TouchableOpacity style={{backgroundColor:"#262626",padding:20,width:"100%",marginVertical:30, borderRadius:10, alignItems:"center"}} onPress={handleSave}>
        <Text style={{color:"#fff"}}>Edit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default EditFeedback

const styles = StyleSheet.create({})