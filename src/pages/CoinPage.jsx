import React, { useEffect, useState } from "react";
import CoinInfo from "../components/CoinInfo";
import "../styles/CoinPage.css";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, LinearProgress, Typography } from "@mui/material";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import parse from 'html-react-parser';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, watchList,setAlert,setWatchList } = CryptoState();
  const [error, setError] = useState(false);

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      setError(true);
    }
  };

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

  const addToWishList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, coin?.id] : [coin?.id],
      });
      setAlert({
        msg : `${coin.name} Added to Watchlist`,
        type : "success",
        open : true
      })
    } catch (e) {
      setAlert({
        msg : e.message,
        type : "error",
        open : true
      })
    }
  };
  
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

  
  const inWatchList  = watchList?.includes(coin?.id)

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  if (error) {
    return <div>Some Error Occured</div>;
  }
  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="description">
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="contained"
              fullWidth
              style={{
                margin: "20px 0",
                backgroundColor: inWatchList ? "#ff0000" : "#EEBC1D",
                color: "black",
              }}
              onClick={inWatchList ? removeFromWatchList : addToWishList}
            >
              {inWatchList ? "Remove from WatchList" :"Add to WatchList"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
