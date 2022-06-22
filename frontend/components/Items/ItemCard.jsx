import React, { useState } from 'react';
import { View, SafeAreaView  , TouchableHighlight} from "react-native"
import { Text, Block,Button ,Card} from 'galio-framework'
import styles from '../../styles/styles'
// name and Amount+ navigate to ItemDetails
const ItemCard = (props)=>{
    console.log(props.data)
        return (
                <TouchableHighlight
                    style={styles.card}
                    underlayColor="#F3A534"
                    onPress={() => {props.navigation.navigate(props.detailsScreen, props.data)}}
                >
                    <View>
                        <Text style={[styles.title ]}>{props.data.name}</Text>
                        <Text style={[styles.h1]}><Text style={{fontWeight:"bold"}}>Amount: </Text>{props.data.amount}</Text>
                    </View>
                </TouchableHighlight>
              
        
)}
export default ItemCard
