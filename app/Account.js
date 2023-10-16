import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../lib/supabase";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const Account = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userMasterData, setUserMasterData] = useState(null);

  const [username, setUsername] = useState("");
  const [empid, setEmpid] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [useridd, setuseridd] = useState("");

  const fetchAccount = async () => {
    try {
      setLoading(true);

      // Check if a user is authenticated
      const { data: user } = await supabase.auth.getSession();
      setUserMasterData(user.session.user);
      setEmail(user.session.user.email);
      setuseridd(user.session.user.id);

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch the user's data from Supabase using their user ID
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.session.user.id);
      console.log(data);

      if (data) {
        setUsername(data[0].username);
        setEmpid(data[0].empid);
        setFullname(data[0].full_name);

        // Check if full name, emp id, and username are already present, and if so, navigate to the dashboard.
        if (data[0].full_name && data[0].empid && data[0].username) {
          navigation.navigate("Feedback");
        }
      }

      if (error) {
        console.error("Error fetching user data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("profiles").upsert([
        {
          username: username,
          empid: empid,
          full_name: fullname,
          id: useridd,
        },
      ]);
      if (error) {
        throw error;
      }
      setLoading(false);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Account",
          headerTitleAlign: "center",
        }}
      />
      {loading ? (
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              Loading Please Wait . .{" "}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.verticallySpaced}>
          <Text style={{ fontWeight: "800" }}>Username:</Text>
          <Input onChangeText={(text) => setUsername(text)} value={username} />
          <Text style={{ fontWeight: "800" }}>Emp Id:</Text>
          <Input onChangeText={(text) => setEmpid(text)} value={empid} />
          <Text style={{ fontWeight: "800" }}>Full Name:</Text>
          <Input onChangeText={(text) => setFullname(text)} value={fullname} />
          <Text style={{ fontWeight: "800" }}>Email:</Text>
          <Input
            disabled
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder={email}
          />
          <Button
            buttonStyle={{ backgroundColor: "green", marginBottom: 20 }}
            title="Save"
            onPress={handleSave}
          />
          <Button
            buttonStyle={{ backgroundColor: "red", marginBottom: 20 }}
            title="Sign Out"
            onPress={() => supabase.auth.signOut()}
          />
          <Button
            buttonStyle={{ backgroundColor: "orange", marginBottom: 20 }}
            title="Go to Dashboard"
            onPress={() => navigation.navigate("Dashboard")}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: 16,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
