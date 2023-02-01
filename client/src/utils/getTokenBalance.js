import { providers, Wallet, Contract, utils } from 'ethers';
import WLOG from "../abi/WLOG.json";
import { simpleContractAddress } from '../contract';
import { formatCurrency } from './numberFormatter';

export async function getTokenBalance(address) {
    let networkProvider = ""

    if (process.env.REACT_APP_NETWORK === "POLYGON")
        networkProvider = process.env.REACT_APP_NODE_POLYGON
    if (process.env.REACT_APP_NETWORK === "POLYGON_MUMBAI")
        networkProvider = process.env.REACT_APP_NODE_POLYGON_MUMBAI

    const provider = new providers.JsonRpcProvider(networkProvider);
    const contract = new Contract(simpleContractAddress, WLOG, provider);
    const balance = (await contract.balanceOf((address))/10**8).toString();
    
    let options = { currency: "USD", style: 'currency', currencyDisplay: 'none'}
    const formattedBal = formatCurrency(balance)

    return formattedBal;

} 