import React, { useState } from 'react';
import { View, SafeAreaView  } from "react-native"
import { Text, Block,Button } from 'galio-framework'
import styles from '../../styles/styles'
import { Picker } from '@react-native-picker/picker';
// charts
import CashSpentChart from './CashSpentChart'
import CashEarnedChart from './CashEarnedChart'
import ExpensesChart from './ExpensesChart'
const Stats = (props)=>{
    const [graphTypes, setGraphTypes] = useState(["Cash Spent", "Cash Earned", "Expenses"])
    const [selectedType, setSelectedType] = useState("Cash Spent")
     
    return (
        <View>
            <View style = {styles.flexContainerRow}> 
                <View style={styles.flexItem}>
                    <Text style={styles.h1}>Type: </Text>
                </View>
                <View style={[styles.flexItem, {marginTop:"-3.25%"}]}>
                    <Picker 
                selectedValue={selectedType} 
                style={styles.input}
                onValueChange={(val, index)=>setSelectedType(val)}>
                        {graphTypes.map((item, index)=><Picker.Item label={item} key={index} value={item}/>)}
                    </Picker>
                </View>
            </View>       
            {selectedType === "Cash Spent" ? <CashSpentChart />: null}
            {selectedType === "Cash Earned" ? <CashEarnedChart />: null}
            {selectedType === "Expenses" ? <ExpensesChart reloadApp={props.reloadApp}/>: null}


        </View>)
}
export default Stats
