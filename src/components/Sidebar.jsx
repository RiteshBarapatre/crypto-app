import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase';
import "../styles/Sidebar.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, setDoc } from 'firebase/firestore';

export default function Sidebar() {

    const {user,setAlert,watchList,coins,symbol} = CryptoState()

  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function logout(){
    signOut(auth).then(() => {
        setAlert({
            msg : "Log Out Successful",
            type : "success",
            open : true
        })
      }).catch((error) => {
        setAlert({
            msg : "Error in Log Out",
            type : "error",
            open : true
        })
      });
  }

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const removeFromWatchList = async (coin)=>{
    
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchList?.filter((watch)=>watch !== coin?.id)
      },{
        merge : "true"
      })
      setAlert({
        msg : `${coin.name} Removed from Watchlist`,
        type : "error",
        open : true
      })
    } catch (e) {
      setAlert({
        msg : e.message,
        type : "error",
        open : true
      })
    }
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
            style={{
                height : 38,
                width : 38,
                cursor : "pointer",
                backgroundColor : "#EEDC1B"
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
          <div className="sideBarcontainer">
            <div className="profile">
                <Avatar style={{width : 200,height : 200,cursor : "pointer",backgroundColor : "#EEBC1D",objectFit : "contain"}} src={user.photoURL}
                    alt={user.displayName || user.email}
                />
                <span>
                    {user.displayName || user.email}
                </span>
                <div className="watchlist">
                    <span style={{fontSize : 15,textShadow : "0 0 5px black"}}>WatchList</span>
                    {
                      coins.length !== 0 ?
                      coins.map((coin)=>{
                        if(watchList?.includes(coin.id))
                        return(
                          <div className="coin" key={coin.id}>
                            <span>{coin.name}</span>
                            <span>{symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}</span>
                            <DeleteIcon style={{cursor : "pointer"}} fontSize = "16" onClick={()=>removeFromWatchList(coin)}/>
                          </div>
                        )
                      }) : "No Coins in the Watch List"
                    }
                </div>
            </div>
            <Button variant='contained' className='logout'
            style={{backgroundColor : "#EEBC1D"}}
            onClick={logout}>
                Log Out
            </Button>
          </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
