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

const AddSpindleHistory = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [machineNo, setMachineNo] = useState("");
  const [newSpindleNo, setNewSpindleNo] = useState("");
  const [oldSpindleNo, setOldSpindleNo] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [machineNumbers, setMachineNumbers] = useState([]);
  const [type, setType] = useState("");

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
      // Retrieve the user's ID if they are logged in
      const { data: user } = await supabase.auth.getSession();

      // Create a new spindle history entry
      const { data, error } = await supabase.from("spindleHistory").insert([
        {
          machine_no: machineNo,
          new_spindle_no: newSpindleNo,
          old_spindle_no: oldSpindleNo,
          reason: reason,
          status: status,
          type: type,
          userId: user.session.user.id, // Include user ID if logged in, or null if not
        },
      ]);

      if (error) {
        throw error;
      }

      // Handle successful submission, e.g., navigate back to the dashboard
      navigation.navigate("Dashboard");
      fetchMachineNumbers()
      setMachineNo("");
      setNewSpindleNo("");
      setOldSpindleNo("");
      setReason("");
      setStatus("");
      setType("");
    } catch (error) {
      console.error("Error adding spindle history:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMachineNumbers = async () => {
    try {
      const { data, error } = await supabase
        .from("spindleHistory")
        .select("machine_no");

      if (data && !error) {
        const uniqueMachineNumbers = Array.from(
          new Set(data.map((item) => item.machine_no))
        );
        setMachineNumbers(uniqueMachineNumbers);
      }
    } catch (error) {
      console.error("Error fetching machine numbers:", error);
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
      <Text style={{ fontWeight: "800" }}>New Spindle No:</Text>
      <Input
        onChangeText={(text) => setNewSpindleNo(text)}
        value={newSpindleNo}
        keyboardType="number-pad"
      />
      {/* <TextInput
        onChangeText={(text) => setOldSpindleNo(text)}
        value={oldSpindleNo}
      />       */}
      <Text style={{ fontWeight: "800" }}>Old Spindle No:</Text>
      <Input
        onChangeText={(text) => setOldSpindleNo(text)}
        value={oldSpindleNo}
        keyboardType="number-pad"
      />

      {/* <TextInput onChangeText={(text) => setReason(text)} value={reason} /> */}
      <Text style={{ fontWeight: "800" }}>Reason:</Text>
      <Input onChangeText={(text) => setReason(text)} value={reason} />
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
      <Text style={{ paddingVertical: 20, fontWeight: "800" }}>
        Select Type:
      </Text>
      <TouchableOpacity
        onPress={() => setType("Bore")} // Set the third option
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
        onPress={() => setType("Seat")} // Set the third option
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
          {type === "Seat" && (
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
        <Text>Seat</Text>
      </TouchableOpacity>
      {/* Add similar inputs for other fields: oldSpindleNo, reason, status, type */}
      {!loading && (
        <TouchableOpacity
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
          <Text style={{ color: "#fff" }}>Add Spindle History</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default AddSpindleHistory;

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
