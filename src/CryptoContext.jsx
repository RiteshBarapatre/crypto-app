import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const Crypto = createContext()

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR")
  const [symbol,setSymbol] = useState("₹")
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState([])
  const [user,setUser] = useState(null)
  const [watchList,setWatchList] = useState()
  const [alert,setAlert] = useState({
    msg : "",
    type : "",
    open : false
  })

  useEffect(()=>{
    if(user){
      const coinRef = doc(db,"watchlist",user.uid)

      var unsubscribe = onSnapshot(coinRef,(coin)=>{
        if(coin.exists()){
          setWatchList(coin.data().coins)
        }else{
          console.log("No Items in watchList")
        }
      })
      return ()=>{
        unsubscribe()
      }
    }

  },[user])


  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user) setUser(user)
      else setUser(null)
    })
  },[])

  useEffect(()=>{
    if(currency === "INR"){
      setSymbol("₹")
    }else if(currency === "USD"){
      setSymbol("$")
    }
  },[currency])
  
  return (
    <Crypto.Provider value={{currency,setCurrency,symbol,alert,setAlert,open,setOpen,user,setUser,watchList,setWatchList,coins,setCoins}}>
        {children}
    </Crypto.Provider>
  )
}



export default CryptoContext

export const CryptoState = ()=>{
  return useContext(Crypto)
  
}