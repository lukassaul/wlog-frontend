import { providers, Wallet, Contract, utils } from 'ethers';
import { formatUnits } from '@ethersproject/units'
import WLOG from "../abi/WLOG.json";
import { simpleContractAddress } from '../contract';
import { formatCurrency } from './numberFormatter';


let networkProvider = ""
let options = { currency: "USD", style: 'currency', currencyDisplay: 'none'}

if (process.env.REACT_APP_NETWORK === "POLYGON")
    networkProvider = process.env.REACT_APP_NODE_POLYGON
if (process.env.REACT_APP_NETWORK === "POLYGON_MUMBAI")
    networkProvider = process.env.REACT_APP_NODE_POLYGON_MUMBAI

const provider = new providers.JsonRpcProvider(networkProvider);
const contract = new Contract(simpleContractAddress, WLOG, provider);

export async function getTokenBalance(address) {
    
    const balance = (await contract.balanceOf((address))/10**8).toString();

    const formattedBal = formatCurrency(balance)

    return formattedBal;

} 

export async function getTokenMinted(address) {

    const minted = await contract.totalMinted();
    
    const formattedMinted = formatCurrency(formatUnits(minted, 8))

    return formattedMinted;

} 

export async function getWLOGBalance() {
    // const tokenContractAddress = process.env.REACT_APP_POLYGON_CONTRACT_ADDRESS;
    // const networkProvider = process.env.REACT_APP_NODE_POLYGON
    // const provider = new providers.JsonRpcProvider(networkProvider);
    // const contract = new Contract(tokenContractAddress, WLOG, provider);

    const balance = (await contract.balanceOf(process.env.REACT_APP_WLOG)/10**8).toString();
    return balance;
}