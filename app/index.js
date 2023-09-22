// app/index.js
import 'react-native-url-polyfill/auto'
import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { View, Text } from "react-native";
import Auth from "./Auth";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { Stack } from 'expo-router';

const Home = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
    {/* <View> */}
      {session && session?.user ? <DrawerNavigator /> : <Auth />}
    {/* </View> */}
    </>
  );
};

export default Home;
