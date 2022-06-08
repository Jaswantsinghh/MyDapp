import "../../Styles/Event/Cards.css";
import Modal from 'react-modal';
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {ethers} from "ethers"
import { abi } from "./abi";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";

const EVENTS_CONTRACT_ADDRESS = "0xFF58E62520ec91652C7cbB97E8972FA544D23BAb";
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');


function Cards(props) {
    const web3ModalRef = useRef();
    let navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [list, setList] = useState([...props.data]);
    const [walletConnected, setWalletConnected] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const element = {
            name: name,
            message: message,
            date: `${date} ${time}`
        }
        setList(prevState => [...prevState, element]);
        setModalOpen(false);
        setEvent();
    }

    const getProviderOrSigner = async (needSigner = false) => {
        // Connect to Metamask
        // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
    
        // If user is not connected to the Rinkeby network, let them know and throw an error
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 4) {
          window.alert("Change the network to Rinkeby");
          throw new Error("Change network to Rinkeby");
        }
    
        if (needSigner) {
          const signer = web3Provider.getSigner();
          return signer;
        }
        return web3Provider;
      };


      const connectWallet = async () => {
        try {
          // Get the provider from web3Modal, which in our case is MetaMask
          // When used for the first time, it prompts the user to connect their wallet
          await getProviderOrSigner();
          setWalletConnected(true);
    
        } catch (err) {
          console.error(err);
        }
      };
    

      const getEvents = async () => {
          try {
            const signer = await getProviderOrSigner(true);
            const eventList = new Contract (
                EVENTS_CONTRACT_ADDRESS,
                abi,
                signer
            );
            console.log(EVENTS_CONTRACT_ADDRESS);
            const listEvents = eventList.fetchAll();
            console.log(listEvents);
            setList(prevState => [...prevState]);
          } catch (err){
              console.log(err);
          }
      };

      const setEvent = async () => {
          try {
            const signer = await getProviderOrSigner(true);
            const eventList = new Contract (
                EVENTS_CONTRACT_ADDRESS,
                abi,
                signer
            );
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();
            const tx = await eventList.createEvent(name, message, `${date} ${time}` );
            await tx.wait();
            getEvents();
          }
          catch(err) {
              console.log(error);
          }
      }

    useEffect(() => {
        const key = localStorage.getItem("key");
        if(!key || key?.length < 1) {
          navigate("/signin", { replace: true })
        }
        
    }, []);

    useEffect(() => {
        // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
        if (!walletConnected) {
          // Assign the Web3Modal class to the reference object by setting it's `current` value
          // The `current` value is persisted throughout as long as this page is open
          web3ModalRef.current = new Web3Modal({
            network: "rinkeby",
            providerOptions: {},
            disableInjectedProvider: false,
          });
          connectWallet();
          getEvents().then((e) => console.log(e));
        }
      }, [walletConnected]);

    return(
        <div className="event-container">
            <div className="event-cards-container">
                <div className="event-card-button" onClick={() => setModalOpen(true)}>
                    + Add Post
                </div>
                {list.length > 0 && list.map(({name, message, date}) => (
                    <div className="event-card">
                    <div className="event-card-header">
                        <h1>{name}</h1>
                    </div>
                    <div className="event-card-body">
                        <p>{message}</p>
                        <div className="event-card-body-date">{date}</div>
                    </div>
                </div>
                ))}
            </div>
            <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div className="modal-fields">
              <h1 className="modal-fields-heading">Fill the details here</h1>
              <form className="modal-form">
                  <label className="modal-label">Name</label>
                  <input className="modal-input" value={name} onChange={(e)=>setName(e.target.value)}></input>
                  <label className="modal-label">Message</label>
                  <textarea className="modal-textarea" value={message} onChange={(e)=>setMessage(e.target.value)} />
                  <button className="modal-button" onClick={handleSubmit} >Submit</button>
                  <button className="modal-button-cancel" onClick={()=>setModalOpen(false)}>Cancel</button>
              </form>
          </div>
      </Modal>
        </div>
    );
}

export default Cards;