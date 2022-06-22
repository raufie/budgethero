import {firebase} from './firebase/fb-config.js'

const createUser =  (email, password)=>{
    firebase.auth().createUserWithEmailAndPassword(email, password).then(res=>{
        const uid = response.user.uid
        const data = {
            id:uid,
            email,
            fullName
        }
        console.log(data)
    }).catch(e=>{
        console.log(e)
        console.log("firebase error")
    })

}

export {createUser}