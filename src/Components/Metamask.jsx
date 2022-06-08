import metamask from "../Icons/metamask.svg"
import '../Styles/Metamask.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Metamask() {

  let navigate = useNavigate();
const [data, setdata] = useState({
  address: '',
  Balance: null,
});

const btnhandler = () => {
  
  if (window.ethereum) {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => accountChangeHandler(res[0]));
  } else {
    alert("install metamask extension!!");
  }
};

const getbalance = (address) => {
  window.ethereum
    .request({ 
      method: "eth_getBalance", 
      params: [address, "latest"] 
    })
    .then((balance) => {
      setdata({
        Balance: ethers.utils.formatEther(balance),
      });
    });
};


const accountChangeHandler = (account) => {
  setdata({
    address: account,
  });
  localStorage.setItem("key", account);
  getbalance(account);
};

const disconnect = () => {
  setdata({
    address: '',
    Balance: null,
  })
};

useEffect(() => {
  const key = localStorage.getItem("key");
  if(key?.length > 0) {
    navigate("/", { replace: true })
  }
}, []);

  return (
    <div className="Meta">
      <img src={metamask} />
      <button className="Meta-button" onClick={data.address.length > 1 ? disconnect : btnhandler}>{data.address.length > 1 ? "Disconnect" : "Connect to Metamask"}</button>
      {window.ethereum?
      (
      <div className="Meta-notes">
        <p className="Meta-note"><b className="Meta-note-bold">Address: </b>{data.address}</p>
      </div>
      )
      : 
      (
        <p className="Meta-note">You need to install meta mask extension</p>
      )}
    </div>
  )
}

export default Metamask;
