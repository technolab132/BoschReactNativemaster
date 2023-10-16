import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";
import { Icon } from "react-native-elements";

const Dashboard = ({ navigation, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [spindleData, setSpindleData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(""); // State to store the selected machine number
  const [machineNumbers, setMachineNumbers] = useState([]);
  const [usermm, setUsermm] = useState() // State to store unique machine numbers

  const fetchAccount = async () => {
    try {
      setLoading(true);

      // Check if a user is authenticated
      const { data: user } = await supabase.auth.getSession();
      

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch the user's data from Supabase using their user ID
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.session.user.id);
        setUsermm(data[0].id)

      // if (data) {
      //   setUsername(data[0].username);
      //   setEmpid(data[0].empid);
      //   setFullname(data[0].full_name);

      //   // Check if full name, emp id, and username are already present, and if so, navigate to the dashboard.
      //   if (data[0].full_name && data[0].empid && data[0].username) {
      //     navigation.navigate("Feedback");
      //   }
      // }

      if (error) {
        console.error("Error fetching user data:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAccount()

  }, [])
  
  
  const fetchSpindleData = async () => {
    try {
      setLoading(true);
  
      let query = supabase.from("spindleHistory")
        .select(`
          *,
          profiles (
            *
          )
        `);
  
      if (selectedMachine) {
        // Apply the machine number filter only if a machine is selected
        query = query.eq("machine_no", selectedMachine);
      }
  
      const { data, error, status } = await query;
  
      if (error && status !== 406) {
        throw error;
      }
  
      if (spindleData) {
        setSpindleData(data);
      }
    } catch (error) {
      console.error("Error fetching spindleData:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useCallback to memoize the fetchSpindleData function
  const memoizedFetchSpindleData = useCallback(fetchSpindleData, [selectedMachine]);

  useEffect(() => {
    // Fetch initial data when the component mounts or when it is focused
    if (isFocused) {
      memoizedFetchSpindleData();
    }
    console.log("USERRRRRRR" 
    + usermm);
  }, [isFocused, memoizedFetchSpindleData]);

  const canEditRecord = (record) => {
    // Check if the user is logged in and their username matches the one in the record
    return usermm === record.profiles?.id;
  };

  useEffect(() => {
    // Fetch unique machine numbers from Supabase
    async function fetchMachineNumbers() {
      try {
        const { data, error } = await supabase.from("spindleHistory")
          .select("machine_no")
          console.log(data);

          if (data && !error) {
            // Use a Set to store unique machine numbers
            const uniqueMachineNumbers = new Set(data.map((item) => item.machine_no));
            setMachineNumbers(Array.from(uniqueMachineNumbers)); // Convert Set back to an array
          }
      } catch (error) {
        console.error("Error fetching machine numbers:", error);
      }
    }

    fetchMachineNumbers();
  }, []);

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Spindle History",
          headerTitleStyle: {
            fontSize: 15,
          },
          headerRight: () => (
            <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={() => navigation.navigate("Account")}>
              <Text>Account</Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Machine Number Dropdown */}
      <Picker
        selectedValue={selectedMachine}
        onValueChange={(itemValue) => {
          setSelectedMachine(itemValue);
        }}
      >
        <Picker.Item label="All Machines" value="" />
        {machineNumbers.map((machineNo, index) => (
          <Picker.Item key={index} label={machineNo} value={machineNo} />
        ))}
      </Picker>

      {loading ? (
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: "center", padding: 20, alignItems: "center" }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>Loading data . . </Text>
          </View>
        </ScrollView>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, padding: 15, backgroundColor: "#fff" }}>
              {spindleData?.slice().reverse().map((data, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#d9d9d9",
                    marginBottom: 10,
                  }}
                >
                  <View
                  key={index}
                  style={{
                    padding: 15,
                    backgroundColor: "#d9d9d9",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ paddingVertical: 4 }}>
                      Machine No # :{" "}
                      <Text style={{ fontWeight: "800" }}>
                        {data["machine_no"]}
                      </Text>
                    </Text>
                  <Text style={{ paddingVertical: 5 }}>
                    New Spindle No : {data["new_spindle_no"]}
                  </Text>
                  <Text style={{ paddingVertical: 5 }}>
                    Old Spindle No : {data["old_spindle_no"]}
                  </Text>
                  {/* <Text style={{ paddingVertical: 5 }}>Status : </Text> */}
                  {data["status"] === "Not OK" && (
                    <Text
                    style={{
                      backgroundColor: "#ff0000",
                      padding: 5,
                          margin: 5,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    {data["status"]}
                  </Text>
                  )}
                  {data["status"] === "OK" && (
                    <Text
                    style={{
                      backgroundColor: "#00ff00",
                      padding: 5,
                          margin: 5,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    {data["status"]}
                  </Text>
                  )}
                  {data["status"] === "Pending" && (
                    <Text
                    style={{
                      backgroundColor: "yellow",
                      padding: 5,
                          margin: 5,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    {data["status"]}
                  </Text>
                  )}
                  
                  <Text style={{ paddingVertical: 5 }}>Reason : {data["reason"]}</Text>
                  <Text style={{ paddingVertical: 5 }}>
                    Type: {data["type"]}
                  </Text>
                  <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        margin: 10,
                      }}
                    >
                      <Text>{data.profiles?.username}</Text>
                      <Icon
                        name="person"
                        size={15}
                        style={{
                          padding: 6,
                          borderRadius: 100,
                          backgroundColor: "#fff",
                          marginLeft: 10,
                        }}
                        type="MaterialIcons"
                        />
                        
                    </View>
                    <Text
                      style={{
                        position: "absolute",
                        top: 40,
                        right: 0,
                        margin: 5,
                        padding: 2,
                        backgroundColor: "#207272",
                        color: "white",
                      }}
                    >
                      {data.created_at ? data.created_at.slice(0, 10) : ""}
                    </Text>
                  {canEditRecord(data) && (
                      
                      <Text
                        onPress={() =>
                          navigation.navigate("EditSpindle", {
                            spindleId: data?.id,
                            datamm: data,
                            refreshData: memoizedFetchSpindleData,
                          })
                        }
                      >
                        <Icon
                          name="create"
                          size={20}
                          style={{ paddingTop: 15 }}
                        />
                      </Text>
                    )}
                </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Dashboard;
