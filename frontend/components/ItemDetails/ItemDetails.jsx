import React, { useState , useEffect} from 'react';
import { View, SafeAreaView ,TextInput , ActivityIndicator} from "react-native"
import {Picker} from '@react-native-picker/picker'
import { Text, Block, Button} from 'galio-framework'
import styles from '../../styles/styles'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import { AntDesign } from '@expo/vector-icons'; 
import DefaultCategories from '../../constantData/categories'
import {useRoute} from '@react-navigation/native';
import axiosInstance from '../../services/AxiosInstance'
const ItemDetails = (props)=>{
    const route = useRoute();
    const [formState, setFormState] = useState({
        name:"",
        description:"",
        amount: 0,
        category:"",
        date: new Date()
    })
    const params = props.route.params
    const [categories, setCategories]= useState([])
    const [isDateOpen, setDateOpen] = useState(false)
    const [isEditable, setEditable] = useState(false)
    useEffect(()=>{
    // display info
     var data = props.route.params
     data.date = new Date(data.date)
    setFormState({...formState, ...data})
    setCategories(route.name == "Expense Details" ? DefaultCategories.expenses:DefaultCategories.assets )
    }, [])

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setFormState({...formState, date:currentDate});
      };
    
    const handleChange = (val, field)=>{
        if (field === "amount"){
            if (isNaN(val)){
                val = formState.amount
            }else{
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

    const saveChanges = ()=>{
        if (formState.category && formState.date && formState.name && formState.amount && formState.description){
            // validated
            const type = route.name == "Expense Details"? "Expenses" : "Assets"
            
            axiosInstance.put(`${type.toLocaleLowerCase()}/${props.route.params._id}`, formState).then(res=>{
                alert('Succesfully updated')
            }).catch(e=>{
                alert("not updated")
            })
        }
        console.log(formState)
    }
    const deleteItem = ()=>{
        const type = route.name == "Expense Details"? "Expenses" : "Assets"

        axiosInstance.delete(`${type.toLocaleLowerCase()}/${props.route.params._id}`).then(res=>{
            alert('Succesfully deleted item')
            props.navigation.navigate("Assets")
        }).catch(e=>{
            console.log(e)
            alert("not deleted")
        })
    }

    const cancelChanges = ()=>{

    const data = props.route.params
    setFormState({...formState, ...data})
    setEditable(!isEditable)
    }

    return (
    <View>
        <View style={[{marginLeft:"-4.5%"} ]}>
                <View style={styles.flexContainerRow}> 
                {!isEditable && <View style={[styles.flexItem]}> 
                <Button color={'#B82121'} style={{marginTop:"7.5%"}} onPress={()=>{
                    deleteItem()
                    }}>
                        <View style={styles.flexContainerRow}> 
                            <AntDesign name="delete" size={24} color="white"  fontSize="large"/>
                            <Text style={styles.h2} color='white'>Delete</Text>
                        </View>
                    </Button></View>}
                    {!isEditable && <View style={styles.flexItem}>
                    <Button color={'#2885F4'} style={{marginTop:"7.5%"}} onPress={()=>{setEditable(!isEditable)}}>
                        <View style={styles.flexContainerRow}> 
                            <AntDesign name="edit" size={24} color="white"  fontSize="large"/>
                            <Text style={styles.h2} color='white'>Edit</Text>
                        </View>
                    </Button></View>}
                    </View>
        </View>
        <View style={{marginHorizontal:"5%", marginVertical:"2%"}}>
            <TextInput 
                        style={[styles.input, isEditable ? styles.editableInput : null]}
                        onChangeText={(val)=>handleChange(val, "name")}
                        value={formState.name}
                        placeholder="name"
                        editable={isEditable}
            />
           
            <TextInput 
                        style={[styles.input, isEditable ? styles.editableInput : null]}
                        keyboardType="numeric"
                        onChangeText={(val)=>handleChange(val, "amount")}
                        value={formState.amount+""}
                        placeholder="amount"
                        editable={isEditable}

            />
           { JSON.stringify(categories) == JSON.stringify([])? <Text><ActivityIndicator size="small" color="#0000ff" />Loading Categories</Text>: 
           <Picker 
                selectedValue={formState.category} 
                style={[styles.input, isEditable ? styles.editableInput : null]}
                onValueChange={(val, index)=>handleChange(val, "category")}
                enabled={isEditable}
                >
                    {categories.map((category, index)=><Picker.Item key={index} label={category} value={category}/>)}
            </Picker>}

            <Text style={{marginLeft:15, fontSize:15}}><Text style={styles.h2}>Date:</Text> {formState.date.toLocaleDateString("en-us")}</Text>
            {isEditable&&<Button color={styles.btnBasic.color} onPress={getDate}><Text style={{color:"black"}}>Select Date</Text></Button>}
            {/* {isDateOpen && <DateTimePicker mode="date" value={formState.date} onChange={(val)=>{handleChange(val, 'date')}}/>} */}


        </View>
            {isEditable && <View style={styles.flexContainerRow}>
                <View style={[styles.flexItem,{marginLeft:"0.5%"} ]}>
                    <Button color={'#F42828'} onPress={cancelChanges}>Cancel Changes</Button>
                </View>
                <View style={[styles.flexItem, ]}>
                    <Button color={'#21B855'} onPress={saveChanges}>Save Changes</Button>
                </View>
            
            </View>
            }
        
    </View>)
}
export default ItemDetails
