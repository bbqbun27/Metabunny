import { IChainConfig, IConnectWallet } from '../types/index';

export const is_production = true;

export const show_logs = true;

export const is_presale = false;

export const open_sea_link = '';

export const backendUrl = is_production ? '' : '';

export const chain: IChainConfig = {
 name: is_production ? 'Ethereum Mainnet' : 'Ethereum Testnet Rinkeby',
  id: is_production ? 1 : 4,
  rpc: '',
  tx: {
    link: is_production ? '' : '',
  },
  nativeCurrency: {
    name: is_production ? 'RIN' : 'ETH',
    symbol: is_production ? 'RIN' : 'ETH',
    decimals: 18,
  },
  blockExp: is_production ? '' : '',
  contractAddress: is_production ? '0x21ce4608ba98d782e6754801a48b77f5cf427468' : '0x1c1bb98d74435918e0a2e4c6b93de7605b9c5f5a',
};

export const connectWalletConfig: IConnectWallet = {
  wallets: ['MetaMask', 'WalletConnect'],
  network: {
    chainName: chain.name,
    chainID: chain.id,
  },
  provider: {
    MetaMask: { name: 'MetaMask' },
    WalletConnect: {
      name: 'WalletConnect',
      useProvider: 'infura',
      provider: {
        infura: {
          // eslint-disable-next-line
          // @ts-ignore
          infuraId: 'e30174475e4b42bc9daab0cb45748b9c',
        },
      },
    },
  },
  settings: { providerType: true },
};
