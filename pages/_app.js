import "../styles/globals.css";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import React,{useEffect, useState} from "react";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {

  const [walletAccount, setWalletAccount] = useState("");
  const [isConnectedToRinkeby, setConnectedToRinkeby] = useState(true);

  const checkIfMetaMaskIsConnected = async () =>{
    const {ethereum}= window;

    if(!ethereum){
      console.log("Check if Metamask is Installed");
    }else {
      console.log("Check if Metamask is Installe.");

      ethereum.on("chainChanged", function(networkId){
        if(parseInt(networkId) !== 4){
          setConnectedToRinkeby(false);
        }else{
          setConnectedToRinkeby(true);
        }
      });
    }
    // saber si existen cuentas
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // obtiene el valor de las cuentas
    const provider = new ethers.providers.Web3Provider(ethereum);
    // signer es el agente que firma las transacciones.
    const signer = provider.getSigner();
    // verificar si hay cuentas
    if (accounts.length != 0) {
      setWalletAccount(accounts[0]);
    } else {
      console.log("No authorized account");
    }
  };

  useEffect(() => {
    checkIfMetaMaskIsConnected();
  }, []);

  // conectame con una wallet
  const connectMetamask = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setWalletAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // desconect wallet
  const disconnectMetamask = async () =>{
    
  }

  return (
    <div>
      {!isConnectedToRinkeby && (
        <div className={styles.container}>
          <div className={styles.wrongNetwork}>
            <h1>Red Equivocada</h1>
            <p>
              {" "}
              Por favor conectarse a la red Rinkeby en su MetaMask. Gracias
            </p>
          </div>
        </div>
      )}

      {!walletAccount && isConnectedToRinkeby && (
        <div className={styles.container}>
          <p className="text-4xl font-bold pb-5">Cripto Eaters</p>
          <button
            className={styles.eth_connect_wallet_button}
            onClick={connectMetamask}
          >
            Connect Wallet
          </button>
        </div>
      )}

      {walletAccount && isConnectedToRinkeby && (
        <div>
          <main>
            <nav className="border-b p-6">
              <p className="text-4xl font-bold">Cripto Eaters</p>
              <div className="flex justify-between">
                <div className="flex mt-4">
                  <Link href="/">
                    <a className="mr-4 text-pink-500">Inicio</a>
                  </Link>
                  <Link href="/add-dish">
                    <a className="mr-6 text-pink-500">Agregar platillos</a>
                  </Link>
                  <Link href="/my-dishes">
                    <a className="mr-6 text-pink-500">Mis platillos</a>
                  </Link>
                </div>
                <button
                    className={styles.walletButton}
                    onClick={disconnectMetamask}
                  >
                    disconnect Wallet
                </button>
              </div>
            </nav>
          </main>
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

export default MyApp;
