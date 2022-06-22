import React, { useState , useEffect} from 'react';
import Login from './components/Login/Login'
import { ActivityIndicator, Text, View, ImageBackground, Alert } from 'react-native';
import TabNavigatorContainer from './components/Navigation/TabNavigationContainer'
import AsyncStorage from '@react-native-async-storage/async-storage';
// fb
import {firebase} from './firebase/fb-config.js'
import axiosInstance from './services/AxiosInstance'
import styles from './styles/styles'
// const Drawer = createDrawerNavigator()
const App = ()=>{
  
  const [authState, setAuthState] = useState(false)//loading, auth info object or null
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [token, setToken] = useState(null)
  useEffect(()=>{
    const f = async ()=>{
      const token = await AsyncStorage.getItem('x-auth-token')
      setToken(token)
      // console.log(token)
      if (token!== null){
      axiosInstance.post('/users/verify').then(res=>{
        setLoading(false)
        setAuthState(true)
      }).catch(e=>{
        setAuthState(false)
        setLoading(false)

      })
    }else{
      setLoading(false)
      setAuthState(false)

    }
    }
    f()
  },[])
  const reloadApp = ()=>{
    console.log("reload app")
    const f = async ()=>{
      const token = await AsyncStorage.getItem('x-auth-token')
      if (token!== null){

      axiosInstance.post('/users/verify',{}, {headers:{
        "x-auth-token":token
      }}).then(res=>{
        console.log(res.data)

        setLoading(false)
        setAuthState(true)
      }).catch(e=>{
        console.log(e.response.data)
        setAuthState(false)
        setLoading(false)

      })
    }else{
      setLoading(false)
      setAuthState(false)

    }
    }
    f()
  }
  if (loading){
    return <View style={{marginTop:"45%"}}><Text style={{textAlign:"center"}}>Loading..</Text><ActivityIndicator size="large" /></View>
  }else{
  return authState==true?<TabNavigatorContainer  reloadApp={reloadApp}/>:
  <ImageBackground source={{uri:'https://www.amongtech.com/wp-content/uploads/G3-Wallpaper-for-Galaxy-Note-4.jpg'}} resizeMode="cover" style={{width: '100%', height: '100%'}} >
     <Login reloadApp={reloadApp}
  /></ImageBackground>
  }  
    
  }
export default App 