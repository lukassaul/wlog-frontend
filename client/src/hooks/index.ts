import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction } from "@usedapp/core";
import WLOG from "../abi/WLOG.json";
import { simpleContractAddress } from "../contract";



const Interface = new utils.Interface(WLOG);
const ContractInstance = new Contract(simpleContractAddress, Interface);

export function useTotalSupply() {
    const { value, error }: any = useCall({
        contract: ContractInstance,
        method: '_total_supply',
        args: []
    }) ?? {}
    return value?.[0];
}

export function useTotalMinted() {
    const { value, error }: any = useCall({
        contract: ContractInstance,
        method: 'totalMinted',
        args: []
    }) ?? {}
    return value?.[0];
}

export function useGetAdmin() {
    const { value, error }: any = useCall({
        contract: ContractInstance,
        method: 'admin',
        args: []
    }) ?? {}
    return value;
}

export function useDeposit() {
    const { state, send } = useContractFunction(ContractInstance, 'mint', {});
    return { state, send};
}

export function useWithdraw() {
    const { state, send} = useContractFunction(ContractInstance, 'burn', {});
    return { state, send };
}

export function useTransfer() {
    const { state, send} = useContractFunction(ContractInstance, 'transfer', {});
    return { state, send };
}

export function useContractMethod(methodName: string) {
    const { state, send, events, resetState } = useContractFunction(ContractInstance, methodName, {});
    return { state, send, events, resetState };
}
