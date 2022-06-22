import React, { useState , useEffect} from 'react';
import { View, SafeAreaView, TextInput  , Switch, Alert, ActivityIndicator} from "react-native"
import { Text, Block,Button } from 'galio-framework'
import { AntDesign } from '@expo/vector-icons'; 
import axiosInstance from '../../services/AxiosInstance'
import styles from '../../styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


import {createUser} from '../../firebase/fb-users'

const Login = (props)=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isSignIn, setForSignIn] = useState(false)
    const [processing, setProcessing] = useState(false)
    const handleChange = (val , field)=>{
        if (field == "username"){
            setUsername(val)
        }else{
            setPassword(val)
        }
    }
    const createUser = ()=>{

     if (username && password){
        setProcessing(true)

        axiosInstance.post('/users/', {username, password}).then(res=>{
            setProcessing(false)

            Alert.alert("User created please sign in")
            setForSignIn(!isSignIn)
            props.reloadApp()

        }).catch(e=>{
            Alert.alert(e.response.data.error)
            setProcessing(false)

        })
     }
    }
    
    const signInUser = ()=>{
        if (username && password){
            setProcessing(true)

            axiosInstance.post('/users/signin', {username, password}).then(res=>{
                setProcessing(false)
                AsyncStorage.setItem('x-auth-token', res.data['x-auth-token']).then(res=>{
                    props.reloadApp()

                })
            }).catch(e=>{
                Alert.alert(e.response.data.error)
                setProcessing(false)

            })
           
        }
       }
    useEffect( ()=>{
        // await AsyncStorage.setItem('token1', 'asdasd')
        const f = async ()=>{
        // await AsyncStorage.setItem('token1', 'asdasd')
        const x = await AsyncStorage.getItem('token1')
        
    }
     f()   
    },[])
    return (<SafeAreaView >
        <View style={styles.flexContainerColumn} >
            
            <Block style={[{marginTop:"10%", marginHorizontal:"10%"}, styles.container]}>
                <Text h1 style={{textAlign:"center"}}>BudgetHero</Text>
            </Block> 

            <Block style={[ styles.container,{marginTop:"5%", marginHorizontal:"10%", backgroundColor:"#BEC4F0"},]}>
                <Text h4 style={{textAlign:"center"}}>Connect to get started</Text>
                <View style={[styles.flexContainerRow, {marginLeft:"5%"}]}>
                    <View style={styles.flexItem}>
                        <Text style={[styles.h2]}>SignIn</Text>
                    </View>
                    <View style={[styles.flexItem, {marginRight:"50%", marginTop:"-3%"}]}>
                        <Switch value={isSignIn} onChange={()=>setForSignIn(!isSignIn)} />
                    </View>
                </View>
                
                <View style={[styles.flexContainerRow, {marginHorizontal:"10%",}]}>
                        <View style={{marginTop:"5%"}}>
                            <Text style={styles.h2}>Username:</Text>
                        </View>
                        <TextInput  
                                style={[styles.flexItem,styles.input,  styles.editableInput , {width:"100%"}]}
                                onChangeText={(val)=>handleChange(val, "username")}
                                value={username}
                                placeholder="username"
                                                               
                         />
                </View> 
                <View style={[styles.flexContainerRow, {marginHorizontal:"10%",}]}>
                        <View style={{marginTop:"5%"}}>
                            <Text style={styles.h2}>Password:</Text>
                        </View>
                        <TextInput  
                                style={[styles.flexItem,styles.input,  styles.editableInput , {width:"100%"}]}
                                onChangeText={(val)=>handleChange(val, "password")}
                                value={password}
                                placeholder="Password"
                                secureTextEntry={true}
                                                               
                         />
                </View>
                <View style={{marginLeft:"21.5%"}}>
                    {processing?<ActivityIndicator/>:isSignIn ?<Button color="darkorange" onPress={signInUser}>Sign In</Button> :<Button onPress={createUser}>Sign Up</Button> }
                </View> 
                
            </Block> 
        </View>
    </SafeAreaView>)
}
export default Login
