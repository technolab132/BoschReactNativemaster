import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Input } from "react-native-elements";
import { supabase } from "../lib/supabase";

const AddFeedback = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [machineNo, setMachineNo] = useState("");
  const [problem, setProblem] = useState("");
  const [action, setAction] = useState("");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("");
  const [errormess, setErrormess] = useState("");

  // const statusOptions = [
  //   { label: "OK", value: "OK" },
  //   { label: "Not OK", value: "Not OK" },
  // ];

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      if (!machineNo || !problem || !action || !responsible || !status) {
setErrormess("* All Fields are required")
return;
      }
      // Retrieve the user's ID if they are logged in
      const { data: user } = await supabase.auth.getSession();

      // Create a new spindle history entry
      const { data, error } = await supabase.from("feedback").insert([
        {
          machine_no: machineNo,
          problem: problem,
          action: action,
          responsible: responsible,
          status: status,
          user_id: user.session.user.id, // Include user ID if logged in, or null if not
        },
      ]);

      if (error) {
        throw error;
      }
      // Handle successful submission, e.g., navigate back to the dashboard
      navigation.navigate("Feedback");
      setMachineNo("");
      setProblem("");
      setAction("");
      setResponsible("");
      setStatus("");
      setErrormess("")
    } catch (error) {
      console.error("Error adding feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: "800" }}>Machine No:</Text>
      <Input
        onChangeText={(text) => setMachineNo(text)}
        value={machineNo}
        keyboardType="number-pad"
      />
      {/* <TextInput
        onChangeText={(text) => setNewSpindleNo(text)}
        value={newSpindleNo}
      /> */}
      <Text style={{ fontWeight: "800" }}>Problem :</Text>
      <Input onChangeText={(text) => setProblem(text)} value={problem} />
      {/* <TextInput
        onChangeText={(text) => setOldSpindleNo(text)}
        value={oldSpindleNo}
      />       */}
      <Text style={{ fontWeight: "800" }}>Action :</Text>
      <Input onChangeText={(text) => setAction(text)} value={action} />

      {/* <TextInput onChangeText={(text) => setReason(text)} value={reason} /> */}
      <Text style={{ fontWeight: "800" }}>Responsible :</Text>
      <Input
        onChangeText={(text) => setResponsible(text)}
        value={responsible}
      />
      {/* <TextInput
        onChangeText={(text) => setStatus(text)}
        value={status}
      /> */}
      <Text style={{ fontWeight: "800" }}>Select Status:</Text>
      <TouchableOpacity
        onPress={() => setStatus("OK")}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginVertical: 10,
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
            marginVertical: 10,
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
            marginVertical: 10,
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
      {errormess && (
        <Text style={{color:"red"}}>{errormess}</Text>
      )}

      {!loading && (
        <TouchableOpacity
          disabled={loading}
          style={{
            backgroundColor: "#262626",
            padding: 20,
            width: "100%",
            marginVertical: 30,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#fff" }}>Add Feedback</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default AddFeedback;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
