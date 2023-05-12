// React + Web3 Essentials
import { Env } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { CoreContractChainId, ENV, InfuraAPIKey } from '../config';
import { ChatMainStateContext } from '../context';

// Internal Components



// Internal Configs
import { getUdResolver, pCAIP10ToWallet } from '../helpers';
import { Web3NameListType } from '../types';

const getEnsName = async (provider: ethers.providers.BaseProvider | any, checksumWallet: string,setWeb3Name:(id:string,web3Name:string) => void) => {
  let ensName: string | null= null;
  provider.lookupAddress(checksumWallet).then(async (ens:string) => {
    console.log(ens)
    if (ens) {
      ensName = ens;
      setWeb3Name(checksumWallet,ensName)
    } else {
      ensName = null;
    }
  });
  return ensName;
};

const getUnstoppableName = async (checksumWallet: string,setWeb3Name:(id:string,web3Name:string) => void,env:Env) => {
  // Unstoppable Domains resolution library
  const udResolver = getUdResolver(env);

  // attempt reverse resolution on provided address
  console.log(udResolver)
  let udName = await udResolver.reverse(checksumWallet);
  console.log(udName)
  if (udName) {
    setWeb3Name(checksumWallet,udName)
  } else {
    udName = null;
  }
  return udName;
};

export function useResolveWeb3Name(address: string,env:Env) {

  const { web3NameList,setWeb3Name,selectedChatId } = useContext<any>(ChatMainStateContext);


  useEffect(() => {
    (async () => {
      console.log(CoreContractChainId[env])
      const provider = new ethers.providers.InfuraProvider(CoreContractChainId[env], InfuraAPIKey);
      console.log(provider)
      if (address) {
        const walletLowercase = pCAIP10ToWallet(address)?.toLowerCase();
        const checksumWallet = ethers.utils.getAddress(walletLowercase);
        if (ethers.utils.isAddress(checksumWallet)) {
          try {
              // attempt ENS name resolution first, with a fallback to Unstoppable Domains if
              // a value is not found from ENS.
              Object.keys(web3NameList).forEach(element => {
                if(web3NameList[checksumWallet]){
                  return;
                }
              });
              
             
              (await getEnsName(provider, checksumWallet,setWeb3Name)) || (await getUnstoppableName(checksumWallet,setWeb3Name,env));
             
           
          } catch (e) {
            console.error(e);
          }
        }
      }
    })();
  }, [address,selectedChatId]);
  
}
