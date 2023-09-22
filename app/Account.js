import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { supabase } from "../lib/supabase";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { AccountScreen,SpindleScreen } from "../screens";

const Account = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Account",
          headerTitleAlign: "center",
        }}
      />
      <Text>Account</Text>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
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
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
