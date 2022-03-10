interface Window {
  ethereum: any;
}

interface Token {
  id: string;
  name: string;
  address: string;
  chainId?: string;
  underlyingAssetAddress?: string;
}

