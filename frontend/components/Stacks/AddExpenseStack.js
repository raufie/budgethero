import {createNativeStackNavigator} from '@react-navigation/native-stack'

import AddItem from '../AddItem/AddItem'
const Stack = createNativeStackNavigator()

const AddExpenseStack = ()=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Add Expense" children={(props)=><AddItem title="Add Expense" navigation={props.navigation}/>}/>
        </Stack.Navigator>
    ) 
}
export default AddExpenseStack