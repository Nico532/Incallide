import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './src/screens/Auth'
import { Session } from '@supabase/supabase-js';
import { supabase } from './src/lib/supabase';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { recoilEnergy } from './src/state/PlayerResources';
import { RecoilRoot } from 'recoil';
import SessionBase from './src/SessionBase';

export default function App() {

  return (
    <RecoilRoot>
      <SessionBase></SessionBase>
    </RecoilRoot>
  );
}
