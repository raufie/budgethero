import {StyleSheet} from 'react-native'
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius:5
  },
  border:{
    borderColor: 'black',
    borderWidth: 2,
  },
  // text semantics
  title:{
    fontSize: 32,
    fontWeight: 'bold',
  },
  h1:{
    fontSize: 22,
  },
 h2:{
    fontSize: 18,
  },
  header: {
    fontSize: 18,
    fontWeight: 600,
  },
// text alignment and management
  centerText:{
  textAlign:'center'
  },
  margins: {
    marginLeft: '2%'
  } ,
  marginsVertical:{
   marginVertical: '2vw' 
  },

  // flexbox
flexContainerRow :{
  display: 'flex',
  flexDirection: 'row',
  marginVertical:'3%' 

} ,
flexContainerColumn :{
  display: 'flex',
  flexDirection: 'column',

} ,
wrap : {
flexWrap: 'wrap'
},
flexItem :{
  flex: 1,
  marginHorizontal:'5%',
} ,
  items: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  } ,
  bold: { fontWeight: 'bold' },
  logo: {
    height: '14vw',
    width: '19vw',
  },
  // display
  display:{
    flex:1,
    textAlign:"right",
    fontSize:40,
    fontFamily:"monospace",
    marginHorizontal:5
  },
  marginX:{
      marginHorizontal:5
  },
 marginXY:{
      marginHorizontal:5,
      marginVertical:5
  },
  listImage:{
     width:90,
     height:90
  },
  selectorSize:{
    width:100,height:150
  },
  detailTextKey:{width:150, borderRadius:5, backgroundColor:"white"},
  detailTextValue: {width:100, borderRadius:25,backgroundColor:"white"},
  roundButton:{
    borderRadius:50,
    width:50,
    height:50,
    backgroundColor:'#f90321'
  },
  roundText:{
    marginVertical:15,
    color:"white",
    marginHorizontal:6
  },
   logo: {
    height: 50,
    width: 50,
  },
  input :{
   borderWidth:1,
   borderColor: "#ddd",
   padding: 10,
   marginVertical:5,
   fontSize:18,
   borderRadius:6 ,
   color:"black"
  },
editableInput :{
  borderColor:"#2885F4"
}
  ,
  btnBasic:{
    color:"#DEDEDE"
  },
  btnSubmit:{
    color:"#F0831C"
  },
  card:{
    borderRadius:10,
    marginHorizontal:"5%",
    width:"90%",
    backgroundColor:"#DEDEDE",
    marginVertical:"5%",
    paddingHorizontal:"5%",
    paddingVertical:"2.5%"
  }

});
export default styles;