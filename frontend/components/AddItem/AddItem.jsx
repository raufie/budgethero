import React, { useState , useEffect} from 'react';
import { View, SafeAreaView ,TextInput , ActivityIndicator} from "react-native"
import {Picker} from '@react-native-picker/picker'
import { Text, Block, Button} from 'galio-framework'
import styles from '../../styles/styles'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import DefaultCategories from '../../constantData/categories'
import {useRoute} from '@react-navigation/native';
import axiosInstance from '../../services/AxiosInstance'
const AddItem = (props)=>{
    const route = useRoute()
    const [formState, setFormState] = useState({
        name:"",
        description:"",
        amount: 0,
        category:"",
        date: new Date()
    })
    const [categories, setCategories]= useState([])
    const [isDateOpen, setDateOpen] = useState(false)
    useEffect(()=>{
    setCategories(route.name == "Add Expense" ? DefaultCategories.expenses:DefaultCategories.assets )
    setFormState({...formState, category: route.name == "Add Expense" ? DefaultCategories.expenses[0]:DefaultCategories.assets[0]})
    
},[])
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setFormState({...formState, date:currentDate});
      };
    
    const handleChange = (val, field)=>{
        if (field === "amount"){
            if (isNaN(val)){
                val = formState.amount
            }else{
                if (val == "" || val == " "){
                    val = 0
                }
                val = parseInt(val)
            }
        }
        setFormState({
            ...formState,
            [field]:val
        })
    }
    const getDate = ()=>{
        DateTimePickerAndroid.open({
            value:formState.date,
            onChange:onDateChange,
            mode:"date"
        })
    }
    
    const submitItem = ()=>{
        const type = route.name == "Add Expense"? "Expenses" : "Assets"
        if (formState.category && formState.date && formState.name && formState.amount && formState.description){
            // validated
            axiosInstance.post(`/${type.toLocaleLowerCase()}/`, formState).then(res=>{
                props.navigation.navigate(type)
            }).catch(e=>{
                console.log(e)
                alert("error adding asset")
            })
        }
    }
    return (
    <View>
        <View style={{marginHorizontal:"5%", marginVertical:"2%"}}>
            <TextInput 
                        style={styles.input}
                        onChangeText={(val)=>handleChange(val, "name")}
                        value={formState.name}
                        placeholder="name"
            />
            <TextInput  
                        style={styles.input}
                        onChangeText={(val)=>handleChange(val, "description")}
                        value={formState.description}
                        placeholder="description"
                        
            />
            <TextInput 
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(val)=>handleChange(val, "amount")}
                        value={formState.amount+""}
                        placeholder="amount"
            />
           { JSON.stringify(categories) == JSON.stringify([])? <Text><ActivityIndicator size="small" color="#0000ff" />Loading Categories</Text>: <Picker 
                selectedValue={formState.category} 
                style={styles.input}
                onValueChange={(val, index)=>handleChange(val, "category")}
                >
                    {categories.map((category, index)=><Picker.Item key={index} label={category} value={category}/>)}
            </Picker>}

            <Text style={{marginLeft:15, fontSize:15}}>Date: {formState.date.toLocaleDateString("en-us")}</Text>
            <Button color={styles.btnBasic.color} onPress={getDate}><Text style={{color:"black"}}>Select Date</Text></Button>
            {/* {isDateOpen && <DateTimePicker mode="date" value={formState.date} onChange={(val)=>{handleChange(val, 'date')}}/>} */}


        </View>
            <View style={styles.flexContainerRow}>
                <View style={[styles.flexItem, {marginLeft:"26%"}]}>
                    <Button color={styles.btnSubmit.color} onPress={submitItem}>{props.title}</Button>
                </View>
            
            </View>   
        
    </View>)
}
export default AddItem
