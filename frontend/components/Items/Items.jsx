import React, { useState , useEffect} from 'react';
import { View, SafeAreaView, TouchableHighlight , FlatList, ScrollView, RefreshControl} from "react-native"
import { Text, Block,Button } from 'galio-framework'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import styles from '../../styles/styles'
import ItemCard from './ItemCard'
import {useRoute} from '@react-navigation/native';

import axiosInstance from '../../services/AxiosInstance'
// can be expenses or assets
// props.type  == 'expenses' | 'assets'


const Items = (props)=>{
    const route = useRoute()
    const [refreshing, setRefreshing] = useState(false)
    const [items, setItems] = useState([])
    const [dateRange, setDateRange] = useState({from:new Date((new Date()).getDate()-30), to: new Date()})
    
    


    const onDateChange = (event, selectedDate, field) => {
        if (field === "from"){
            console.log(field)
            setDateRange({...dateRange, [field]:selectedDate});
           

        }else{
            setDateRange({...dateRange, [field]:selectedDate});
        }
        getItems()
      };

    const getFromDate = ()=>{
        DateTimePickerAndroid.open({
            value:dateRange.from,
            onChange:(event, selectedDate)=>{onDateChange(event, selectedDate, "from")},
            mode:"date"
        })
        
    }
    const getToDate = ()=>{
        DateTimePickerAndroid.open({
            value:dateRange.to,
            onChange:(event, selectedDate)=>{onDateChange(event, selectedDate, "to")},
            mode:"date"
        })
    }
    const getFormattedDate = (dt)=>{
        
        dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
        return dt
    }
    const renderItem = ({item, index})=>{
        return <ItemCard data={item} key={index} navigation={props.navigation} detailsScreen={props.detailsScreen}/>
    }
    const getItems = (from, to)=>{
        axiosInstance.post(`${route.name.toLocaleLowerCase()}/get`, {from:getFormattedDate(dateRange.from), to:getFormattedDate(dateRange.to)}).then(res=>{
            setItems(res.data)
        }).catch(e=>{
            console.log("error fetching items")
        })
    }
    
    useEffect(()=>{
        var dateOffset = (24*60*60*1000) * 30; 
        var offsetDate = new Date();
        offsetDate.setTime(offsetDate.getTime() - dateOffset);
        setDateRange({...dateRange, from:offsetDate})
        getItems()
    },[])
    return (
        <View>
            <View style={styles.flexContainerRow}>
                    <View style={styles.flexItem}>
                        <TouchableHighlight
                            style={styles.card}
                            underlayColor="#91F334"
                            onPress={() => {getFromDate()}}
                        >
                            <Text style={styles.h2}>
                                <Text style={{fontWeight:"bold"}}>  
                                From:
                                </Text>
                                <Text>
                                    {dateRange.from.toLocaleDateString("en-us")}
                                </Text>
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.flexItem}>
                        <TouchableHighlight
                            style={styles.card}
                            underlayColor="#34AEF3"
                            onPress={() => {getToDate()}}
                        >
                            <Text style={styles.h2}>
                                <Text style={{fontWeight:"bold"}}>  
                                To:
                                </Text>
                                <Text>
                                    {dateRange.to.toLocaleDateString("en-us")}
                                </Text>
                            </Text>
                        </TouchableHighlight>
                    </View>
            </View>
            <View>
                   <FlatList 
                        data={items} 
                        renderItem={renderItem}
                        refreshControl={<RefreshControl onRefresh={()=>{
                            getItems()
                            setRefreshing(false)
                        }} refreshing={refreshing} />}
                        />
            </View>
        </View>

    )
}
export default Items
