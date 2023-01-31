import { providers, Wallet, Contract, utils } from 'ethers';
import WLOG from "../abi/WLOG.json";
import { simpleContractAddress } from '../contract';
import { formatCurrency } from './numberFormatter';

export async function getTokenBalance(address) {

    const provider = new providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/5f889400e82546ae9e9052bca6de4706");
    const contract = new Contract(simpleContractAddress, WLOG, provider);
    const balance = (await contract.balanceOf((address))/10**8).toString();
    
    let options = { currency: "USD", style: 'currency', currencyDisplay: 'none'}
    const formattedBal = formatCurrency(balance)

    return formattedBal;

} 