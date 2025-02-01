export const MOONWELL_BASE_ADDRESSES = {
    "0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22": "MOONWELL_USDC",
    "0x73b06D8d18De422E269645eaCe15400DE7462417": "MOONWELL_DAI",
    "0x628ff693426583D9a7FB391E54366292F509D457": "MOONWELL_WETH",
    "0x3bf93770f2d4a794c3d9EBEfBAeBAE2a8f09A5E5": "MOONWELL_cbETH",
    "0x627Fe393Bc6EdDA28e99AE648fD6fF362514304b": "MOONWELL_wstETH",
    "0x73902f619CEB9B31FD8EFecf435CbDf89E369Ba6": "MOONWELL_AERO",
    "0xb8051464C8c92209C92F3a4CD9C73746C4c3CFb3": "MOONWELL_weETH",
    "0xF877ACaFA28c19b96727966690b2f44d35aD5976": "MOONWELL_cbBTC",
    "0xb682c840B5F4FC58B20769E691A6fa1305A501a2": "MOONWELL_EURC",
    "0xfC41B49d064Ac646015b459C522820DB9472F4B5": "MOONWELL_wrsETH",
    "0xdC7810B47eAAb250De623F0eE07764afa5F71ED1": "MOONWELL_WELL",
    "0xb6419c6C2e60c4025D6D06eE4F913ce89425a357": "MOONWELL_USDS",
    "0x9A858ebfF1bEb0D3495BB0e2897c1528eD84A218": "MOONWELL_TBTC",
    "0x70778cfcFC475c7eA0f24cC625Baf6EaE475D0c9": "WETH_ROUTER"
};

export const MOONWELL_BASE_SEPOLIA_ADDRESSES = {
    "0x876852425331a113d8E432eFFB3aC5BEf38f033a": "MOONWELL_USDBC",
    "0x5302EbD8BC32435C823c2e22B04Cd6c45f593e89": "MOONWELL_cbETH",
    "0x2F39a349A79492a70E152760ce7123A1933eCf28": "MOONWELL_WETH",
};

export const WETH_ROUTER_ADDRESS = "0x70778cfcFC475c7eA0f24cC625Baf6EaE475D0c9";

export const ETH_ROUTER_ABI = [
    {
        name: "mint",
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            }
        ],
        outputs: [],
        stateMutability: "payable",
        type: "function"
    }
];

export const MTOKEN_ABI = [
    {
        type: "function",
        name: "mint",
        inputs: [
            {
                name: "mintAmount",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "redeemUnderlying",
        inputs: [
            {
                name: "redeemAmount",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        stateMutability: "nonpayable"
    },
]; 