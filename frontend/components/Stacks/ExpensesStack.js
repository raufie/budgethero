import {createNativeStackNavigator} from '@react-navigation/native-stack'

import ItemDetails from '../ItemDetails/ItemDetails'
import Items from '../Items/Items'
const Stack = createNativeStackNavigator()

const ExpensesStack = ()=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Expenses" children={(props)=><Items detailsScreen="Expense Details" type="expenses" navigation={props.navigation}/>}/>
            <Stack.Screen name="Expense Details" children={ (props)=><ItemDetails route={props.route} navigation={props.navigation} />} />
        </Stack.Navigator>
    ) 
}
export default ExpensesStack