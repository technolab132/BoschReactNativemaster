// app/Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";

const Dashboard = ({ navigation, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [feedbackData, setFeedbackData] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);

      // Fetch the latest data from Supabase
      const { data, error, status } = await supabase.from("feedback")
        .select(`
          *,
          profiles (
            *
          )
        `);


      if (error && status !== 406) {
        throw error;
      }

      if (feedbackData) {
        setFeedbackData(data);
      }
    } catch (error) {
      console.error("Error fetching fedeback:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useCallback to memoize the fetchSpindleData function
  const memoizedFetchFeedbackData = useCallback(fetchFeedbacks, []);

  useEffect(() => {
    // Fetch initial data when the component mounts or when it is focused
    if (isFocused) {
      memoizedFetchFeedbackData();
    }
  }, [isFocused, memoizedFetchFeedbackData]);

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Feedbacks",
          headerTitleStyle: {
            fontSize: 15,
          },
          headerRight: () => (
            <TouchableOpacity style={{paddingHorizontal:16}} onPress={() => navigation.navigate("Account")}>
              <Text>Account</Text>
            </TouchableOpacity>
          ),
        }}
      />
      {loading ? (
        <ScrollView>
        <View
          style={{ flex: 1, padding:20, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#000", fontWeight:"bold" }}>Loading data . . </Text>
        </View>
        </ScrollView>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, padding: 15, backgroundColor: "#fff" }}>
              {feedbackData?.slice().reverse().map((data, index) => (
                // <Link
                //   style={{
                //     color: "#d6d6d6",
                //     fontSize: 16,
                //     padding: 20,
                //     backgroundColor: "#000",
                //     marginBottom: 10,
                //   }}
                //   key={index}
                //   href={{
                //     pathname: "/clientdetail",
                //     params: { name: client.Name, id: client.id },
                //   }}
                // >
                //   {client.Name}
                // </Link>
                <View
                  key={index}
                  style={{
                    padding: 18,
                    backgroundColor: "#d9d9d9",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ paddingVertical: 5 }}>
                    Mac. No : {data["machine_no"]}
                  </Text>
                  <Text style={{ paddingVertical: 5 }}>
                    Problem : {data["problem"]}
                  </Text>
                  <Text style={{ paddingVertical: 5 }}>
                    Action : {data["action"]}
                  </Text>
                  <Text style={{ paddingVertical: 5 }}>
                    Responsible : {data["responsible"]}
                  </Text>
                  {/* <Text style={{ paddingVertical: 5 }}>Status : </Text> */}
                  <Text
                    style={{
                      backgroundColor: "#00ff00",
                      padding: 10,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    {data["status"]}
                  </Text>
                  
                  <Text style={{ paddingVertical: 5 }}>
                    User : {data.profiles?.username}
                  </Text>
                  <Text style={{ paddingVertical: 5 }}>
                    Date Created : {data.created_at}
                  </Text>
                  <Button
                    title="Edit"
                    onPress={() =>
                      navigation.navigate("EditFeedback", {
                        feedbackId: data?.id,
                        datamm: data,
                        refreshData: memoizedFetchFeedbackData,
                      })
                    }
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}

      {/* {clientData ? (
        
      ) : (
        <View>
        <Text style={{color:"#fff"}}>Loading data</Text>
        </View>
      )} */}

      {/* <Button
        title="Go to Account"
        onPress={() => navigation.navigate("Account")}
      /> */}
    </View>
  );
};

export default Dashboard;
