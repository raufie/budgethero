import {createNativeStackNavigator} from '@react-navigation/native-stack'

import ItemDetails from '../ItemDetails/ItemDetails'
import Items from '../Items/Items'
const Stack = createNativeStackNavigator()

const AssetsStack = ()=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Assets" children={(props)=><Items detailsScreen="Asset Details" type="assets" navigation={props.navigation}/>}/>
            <Stack.Screen name="Asset Details" children={ (props)=><ItemDetails route={props.route} navigation={props.navigation} />} />
        </Stack.Navigator>
    ) 
}
export default AssetsStack