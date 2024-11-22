export const customSolidityErrorsAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'ApprovalCallerNotOwnerNorApproved', type: 'error' },
  { inputs: [], name: 'ApprovalQueryForNonexistentToken', type: 'error' },
] as const

/**
 * ENS
 * https://etherscan.io/address/0x314159265dd8dbb310642f98f50c066173c1259b
 */
export const ensAbi = [
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'resolver',
    outputs: [{ type: 'address' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'owner',
    outputs: [{ type: 'address' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'label', type: 'bytes32' },
      { name: 'owner', type: 'address' },
    ],
    name: 'setSubnodeOwner',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'ttl', type: 'uint64' },
    ],
    name: 'setTTL',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'ttl',
    outputs: [{ type: 'uint64' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'resolver', type: 'address' },
    ],
    name: 'setResolver',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'owner', type: 'address' },
    ],
    name: 'setOwner',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      { indexed: false, name: 'owner', type: 'address' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      { indexed: true, name: 'label', type: 'bytes32' },
      { indexed: false, name: 'owner', type: 'address' },
    ],
    name: 'NewOwner',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      { indexed: false, name: 'resolver', type: 'address' },
    ],
    name: 'NewResolver',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      { indexed: false, name: 'ttl', type: 'uint64' },
    ],
    name: 'NewTTL',
    type: 'event',
  },
] as const

/**
 * ENSRegistryWithFallback
 * https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
 */
export const ensRegistryWithFallbackAbi = [
  {
    inputs: [{ internalType: 'contract ENS', name: '_old', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'operator',
        type: 'address',
      },
      { indexed: false, name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      {
        indexed: true,
        name: 'label',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'NewOwner',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      {
        indexed: false,
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'NewResolver',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      { indexed: false, name: 'ttl', type: 'uint64' },
    ],
    name: 'NewTTL',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      {
        indexed: false,
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    constant: true,
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'old',
    outputs: [{ internalType: 'contract ENS', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'owner',
    outputs: [{ type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'recordExists',
    outputs: [{ type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'resolver',
    outputs: [{ type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'owner', type: 'address' },
    ],
    name: 'setOwner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'owner', type: 'address' },
      { name: 'resolver', type: 'address' },
      { name: 'ttl', type: 'uint64' },
    ],
    name: 'setRecord',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'resolver', type: 'address' },
    ],
    name: 'setResolver',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'label', type: 'bytes32' },
      { name: 'owner', type: 'address' },
    ],
    name: 'setSubnodeOwner',
    outputs: [{ type: 'bytes32' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'label', type: 'bytes32' },
      { name: 'owner', type: 'address' },
      { name: 'resolver', type: 'address' },
      { name: 'ttl', type: 'uint64' },
    ],
    name: 'setSubnodeRecord',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'node', type: 'bytes32' },
      { name: 'ttl', type: 'uint64' },
    ],
    name: 'setTTL',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'ttl',
    outputs: [{ type: 'uint64' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * [ERC-20 Token Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20)
 */
export const erc20Abi = [
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'account',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
  },
  {
    type: 'function',
    name: 'name',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
] as const

export const nestedTupleArrayAbi = [
  {
    inputs: [
      {
        name: 's',
        type: 'tuple',
        components: [
          {
            name: 'a',
            type: 'uint8',
          },
          {
            name: 'b',
            type: 'uint8[]',
          },
          {
            name: 'c',
            type: 'tuple[]',
            components: [
              {
                name: 'x',
                type: 'uint8',
              },
              {
                name: 'y',
                type: 'uint8',
              },
            ],
          },
        ],
      },
      {
        name: 't',
        type: 'tuple',
        components: [
          {
            name: 'x',
            type: 'uint',
          },
          {
            name: 'y',
            type: 'uint',
          },
        ],
      },
      {
        name: 'a',
        type: 'uint256',
      },
    ],
    name: 'f',
    outputs: [
      {
        name: 't',
        type: 'tuple[]',
        components: [
          {
            name: 'x',
            type: 'uint256',
          },
          {
            name: 'y',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 's',
        type: 'tuple[2]',
        components: [
          {
            name: 'a',
            type: 'uint8',
          },
          {
            name: 'b',
            type: 'uint8[]',
          },
        ],
      },
      {
        name: 't',
        type: 'tuple',
        components: [
          {
            name: 'x',
            type: 'uint',
          },
          {
            name: 'y',
            type: 'uint',
          },
        ],
      },
      {
        name: 'a',
        type: 'uint256',
      },
    ],
    name: 'v',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * NounsAuctionHouse
 * https://etherscan.io/address/0x5b2003ca8fe9ffb93684ce377f52b415c7dc0216
 */
export const nounsAuctionHouseAbi = [
  {
    inputs: [
      {
        indexed: true,
        name: 'nounId',
        type: 'uint256',
      },
      {
        indexed: false,

        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
      { indexed: false, name: 'extended', type: 'bool' },
    ],
    name: 'AuctionBid',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'nounId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'endTime',
        type: 'uint256',
      },
    ],
    name: 'AuctionCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'nounId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'endTime',
        type: 'uint256',
      },
    ],
    name: 'AuctionExtended',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,
        name: 'minBidIncrementPercentage',
        type: 'uint256',
      },
    ],
    name: 'AuctionMinBidIncrementPercentageUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,
        name: 'reservePrice',
        type: 'uint256',
      },
    ],
    name: 'AuctionReservePriceUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'nounId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AuctionSettled',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,
        name: 'timeBuffer',
        type: 'uint256',
      },
    ],
    name: 'AuctionTimeBufferUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,

        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,

        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'auction',
    outputs: [
      { name: 'nounId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
      { internalType: 'address payable', name: 'bidder', type: 'address' },
      { name: 'settled', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'nounId', type: 'uint256' }],
    name: 'createBid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'duration',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract INounsToken', name: '_nouns', type: 'address' },
      { name: '_weth', type: 'address' },
      { name: '_timeBuffer', type: 'uint256' },
      { name: '_reservePrice', type: 'uint256' },
      {
        name: '_minBidIncrementPercentage',
        type: 'uint8',
      },
      { name: '_duration', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minBidIncrementPercentage',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nouns',
    outputs: [{ internalType: 'contract INounsToken', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reservePrice',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_minBidIncrementPercentage',
        type: 'uint8',
      },
    ],
    name: 'setMinBidIncrementPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_reservePrice', type: 'uint256' }],
    name: 'setReservePrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_timeBuffer', type: 'uint256' }],
    name: 'setTimeBuffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settleAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settleCurrentAndCreateNewAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'timeBuffer',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weth',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * Seaport
 * https://etherscan.io/address/0x00000000000001ad428e4906ae43d8f9852d0dd6
 */
export const seaportAbi = [
  {
    inputs: [{ name: 'conduitController', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        components: [
          { name: 'offerer', type: 'address' },
          { name: 'zone', type: 'address' },
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              {
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { name: 'startAmount', type: 'uint256' },
              { name: 'endAmount', type: 'uint256' },
            ],

            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              {
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { name: 'startAmount', type: 'uint256' },
              { name: 'endAmount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],

            name: 'consideration',
            type: 'tuple[]',
          },
          { name: 'orderType', type: 'uint8' },
          { name: 'startTime', type: 'uint256' },
          { name: 'endTime', type: 'uint256' },
          { name: 'zoneHash', type: 'bytes32' },
          { name: 'salt', type: 'uint256' },
          { name: 'conduitKey', type: 'bytes32' },
          { name: 'counter', type: 'uint256' },
        ],
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'cancel',
    outputs: [{ name: 'cancelled', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'offerer', type: 'address' },
              { name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],

                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'recipient',
                    type: 'address',
                  },
                ],

                name: 'consideration',
                type: 'tuple[]',
              },
              {
                name: 'orderType',
                type: 'uint8',
              },
              { name: 'startTime', type: 'uint256' },
              { name: 'endTime', type: 'uint256' },
              { name: 'zoneHash', type: 'bytes32' },
              { name: 'salt', type: 'uint256' },
              { name: 'conduitKey', type: 'bytes32' },
              {
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'structOrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { name: 'numerator', type: 'uint120' },
          { name: 'denominator', type: 'uint120' },
          { name: 'signature', type: 'bytes' },
          { name: 'extraData', type: 'bytes' },
        ],
        internalType: 'structAdvancedOrder',
        name: 'advancedOrder',
        type: 'tuple',
      },
      {
        components: [
          { name: 'orderIndex', type: 'uint256' },
          { internalType: 'enumSide', name: 'side', type: 'uint8' },
          { name: 'index', type: 'uint256' },
          { name: 'identifier', type: 'uint256' },
          {
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'structCriteriaResolver[]',
        name: 'criteriaResolvers',
        type: 'tuple[]',
      },
      { name: 'fulfillerConduitKey', type: 'bytes32' },
      { name: 'recipient', type: 'address' },
    ],
    name: 'fulfillAdvancedOrder',
    outputs: [{ name: 'fulfilled', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'offerer', type: 'address' },
              { name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],

                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'recipient',
                    type: 'address',
                  },
                ],

                name: 'consideration',
                type: 'tuple[]',
              },
              {
                name: 'orderType',
                type: 'uint8',
              },
              { name: 'startTime', type: 'uint256' },
              { name: 'endTime', type: 'uint256' },
              { name: 'zoneHash', type: 'bytes32' },
              { name: 'salt', type: 'uint256' },
              { name: 'conduitKey', type: 'bytes32' },
              {
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'structOrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { name: 'numerator', type: 'uint120' },
          { name: 'denominator', type: 'uint120' },
          { name: 'signature', type: 'bytes' },
          { name: 'extraData', type: 'bytes' },
        ],
        internalType: 'structAdvancedOrder[]',
        name: 'advancedOrders',
        type: 'tuple[]',
      },
      {
        components: [
          { name: 'orderIndex', type: 'uint256' },
          { internalType: 'enumSide', name: 'side', type: 'uint8' },
          { name: 'index', type: 'uint256' },
          { name: 'identifier', type: 'uint256' },
          {
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'structCriteriaResolver[]',
        name: 'criteriaResolvers',
        type: 'tuple[]',
      },
      {
        components: [
          { name: 'orderIndex', type: 'uint256' },
          { name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'structFulfillmentComponent[][]',
        name: 'offerFulfillments',
        type: 'tuple[][]',
      },
      {
        components: [
          { name: 'orderIndex', type: 'uint256' },
          { name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'structFulfillmentComponent[][]',
        name: 'considerationFulfillments',
        type: 'tuple[][]',
      },
      { name: 'fulfillerConduitKey', type: 'bytes32' },
      { name: 'recipient', type: 'address' },
      { name: 'maximumFulfilled', type: 'uint256' },
    ],
    name: 'fulfillAvailableAdvancedOrders',
    outputs: [
      { name: 'availableOrders', type: 'bool[]' },
      {
        components: [
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              { name: 'identifier', type: 'uint256' },
              { name: 'amount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'structReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { name: 'offerer', type: 'address' },
          { name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'structExecution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'offerer', type: 'address' },
              { name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],

                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'recipient',
                    type: 'address',
                  },
                ],

                name: 'consideration',
                type: 'tuple[]',
              },
              {
                name: 'orderType',
                type: 'uint8',
              },
              { name: 'startTime', type: 'uint256' },
              { name: 'endTime', type: 'uint256' },
              { name: 'zoneHash', type: 'bytes32' },
              { name: 'salt', type: 'uint256' },
              { name: 'conduitKey', type: 'bytes32' },
              {
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'structOrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { name: 'signature', type: 'bytes' },
        ],
        internalType: 'structOrder[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        components: [
          { name: 'orderIndex', type: 'uint256' },
          { name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'structFulfillmentComponent[][]',
        name: 'offerFulfillments',
        type: 'tuple[][]',
      },
      {
        components: [
          { name: 'orderIndex', type: 'uint256' },
          { name: 'itemIndex', type: 'uint256' },
        ],
        internalType: 'structFulfillmentComponent[][]',
        name: 'considerationFulfillments',
        type: 'tuple[][]',
      },
      { name: 'fulfillerConduitKey', type: 'bytes32' },
      { name: 'maximumFulfilled', type: 'uint256' },
    ],
    name: 'fulfillAvailableOrders',
    outputs: [
      { name: 'availableOrders', type: 'bool[]' },
      {
        components: [
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              { name: 'identifier', type: 'uint256' },
              { name: 'amount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'structReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { name: 'offerer', type: 'address' },
          { name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'structExecution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            name: 'considerationToken',
            type: 'address',
          },
          {
            name: 'considerationIdentifier',
            type: 'uint256',
          },
          {
            name: 'considerationAmount',
            type: 'uint256',
          },
          { name: 'offerer', type: 'address' },
          { name: 'zone', type: 'address' },
          { name: 'offerToken', type: 'address' },
          { name: 'offerIdentifier', type: 'uint256' },
          { name: 'offerAmount', type: 'uint256' },
          {
            internalType: 'enumBasicOrderType',
            name: 'basicOrderType',
            type: 'uint8',
          },
          { name: 'startTime', type: 'uint256' },
          { name: 'endTime', type: 'uint256' },
          { name: 'zoneHash', type: 'bytes32' },
          { name: 'salt', type: 'uint256' },
          {
            name: 'offererConduitKey',
            type: 'bytes32',
          },
          {
            name: 'fulfillerConduitKey',
            type: 'bytes32',
          },
          {
            name: 'totalOriginalAdditionalRecipients',
            type: 'uint256',
          },
          {
            components: [
              { name: 'amount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'structAdditionalRecipient[]',
            name: 'additionalRecipients',
            type: 'tuple[]',
          },
          { name: 'signature', type: 'bytes' },
        ],
        internalType: 'structBasicOrderParameters',
        name: 'parameters',
        type: 'tuple',
      },
    ],
    name: 'fulfillBasicOrder',
    outputs: [{ name: 'fulfilled', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            name: 'considerationToken',
            type: 'address',
          },
          {
            name: 'considerationIdentifier',
            type: 'uint256',
          },
          {
            name: 'considerationAmount',
            type: 'uint256',
          },
          { name: 'offerer', type: 'address' },
          { name: 'zone', type: 'address' },
          { name: 'offerToken', type: 'address' },
          { name: 'offerIdentifier', type: 'uint256' },
          { name: 'offerAmount', type: 'uint256' },
          {
            internalType: 'enumBasicOrderType',
            name: 'basicOrderType',
            type: 'uint8',
          },
          { name: 'startTime', type: 'uint256' },
          { name: 'endTime', type: 'uint256' },
          { name: 'zoneHash', type: 'bytes32' },
          { name: 'salt', type: 'uint256' },
          {
            name: 'offererConduitKey',
            type: 'bytes32',
          },
          {
            name: 'fulfillerConduitKey',
            type: 'bytes32',
          },
          {
            name: 'totalOriginalAdditionalRecipients',
            type: 'uint256',
          },
          {
            components: [
              { name: 'amount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'structAdditionalRecipient[]',
            name: 'additionalRecipients',
            type: 'tuple[]',
          },
          { name: 'signature', type: 'bytes' },
        ],
        internalType: 'structBasicOrderParameters',
        name: 'parameters',
        type: 'tuple',
      },
    ],
    name: 'fulfillBasicOrder_efficient_6GL6yc',
    outputs: [{ name: 'fulfilled', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'offerer', type: 'address' },
              { name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],

                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'recipient',
                    type: 'address',
                  },
                ],

                name: 'consideration',
                type: 'tuple[]',
              },
              {
                name: 'orderType',
                type: 'uint8',
              },
              { name: 'startTime', type: 'uint256' },
              { name: 'endTime', type: 'uint256' },
              { name: 'zoneHash', type: 'bytes32' },
              { name: 'salt', type: 'uint256' },
              { name: 'conduitKey', type: 'bytes32' },
              {
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'structOrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { name: 'signature', type: 'bytes' },
        ],
        internalType: 'structOrder',
        name: 'order',
        type: 'tuple',
      },
      { name: 'fulfillerConduitKey', type: 'bytes32' },
    ],
    name: 'fulfillOrder',
    outputs: [{ name: 'fulfilled', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'contractOfferer', type: 'address' }],
    name: 'getContractOffererNonce',
    outputs: [{ name: 'nonce', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'offerer', type: 'address' }],
    name: 'getCounter',
    outputs: [{ name: 'counter', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { name: 'offerer', type: 'address' },
          { name: 'zone', type: 'address' },
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              {
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { name: 'startAmount', type: 'uint256' },
              { name: 'endAmount', type: 'uint256' },
            ],

            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              {
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { name: 'startAmount', type: 'uint256' },
              { name: 'endAmount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],

            name: 'consideration',
            type: 'tuple[]',
          },
          { name: 'orderType', type: 'uint8' },
          { name: 'startTime', type: 'uint256' },
          { name: 'endTime', type: 'uint256' },
          { name: 'zoneHash', type: 'bytes32' },
          { name: 'salt', type: 'uint256' },
          { name: 'conduitKey', type: 'bytes32' },
          { name: 'counter', type: 'uint256' },
        ],
        internalType: 'structOrderComponents',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'getOrderHash',
    outputs: [{ name: 'orderHash', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'orderHash', type: 'bytes32' }],
    name: 'getOrderStatus',
    outputs: [
      { name: 'isValidated', type: 'bool' },
      { name: 'isCancelled', type: 'bool' },
      { name: 'totalFilled', type: 'uint256' },
      { name: 'totalSize', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'incrementCounter',
    outputs: [{ name: 'newCounter', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'information',
    outputs: [
      { name: 'version', type: 'string' },
      { name: 'domainSeparator', type: 'bytes32' },
      { name: 'conduitController', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'offerer', type: 'address' },
              { name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],

                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'recipient',
                    type: 'address',
                  },
                ],

                name: 'consideration',
                type: 'tuple[]',
              },
              {
                name: 'orderType',
                type: 'uint8',
              },
              { name: 'startTime', type: 'uint256' },
              { name: 'endTime', type: 'uint256' },
              { name: 'zoneHash', type: 'bytes32' },
              { name: 'salt', type: 'uint256' },
              { name: 'conduitKey', type: 'bytes32' },
              {
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'structOrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { name: 'numerator', type: 'uint120' },
          { name: 'denominator', type: 'uint120' },
          { name: 'signature', type: 'bytes' },
          { name: 'extraData', type: 'bytes' },
        ],
        internalType: 'structAdvancedOrder[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        components: [
          { name: 'orderIndex', type: 'uint256' },
          { internalType: 'enumSide', name: 'side', type: 'uint8' },
          { name: 'index', type: 'uint256' },
          { name: 'identifier', type: 'uint256' },
          {
            name: 'criteriaProof',
            type: 'bytes32[]',
          },
        ],
        internalType: 'structCriteriaResolver[]',
        name: 'criteriaResolvers',
        type: 'tuple[]',
      },
      {
        components: [
          {
            components: [
              { name: 'orderIndex', type: 'uint256' },
              { name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'structFulfillmentComponent[]',
            name: 'offerComponents',
            type: 'tuple[]',
          },
          {
            components: [
              { name: 'orderIndex', type: 'uint256' },
              { name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'structFulfillmentComponent[]',
            name: 'considerationComponents',
            type: 'tuple[]',
          },
        ],
        internalType: 'structFulfillment[]',
        name: 'fulfillments',
        type: 'tuple[]',
      },
      { name: 'recipient', type: 'address' },
    ],
    name: 'matchAdvancedOrders',
    outputs: [
      {
        components: [
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              { name: 'identifier', type: 'uint256' },
              { name: 'amount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'structReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { name: 'offerer', type: 'address' },
          { name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'structExecution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'offerer', type: 'address' },
              { name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],

                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'recipient',
                    type: 'address',
                  },
                ],

                name: 'consideration',
                type: 'tuple[]',
              },
              {
                name: 'orderType',
                type: 'uint8',
              },
              { name: 'startTime', type: 'uint256' },
              { name: 'endTime', type: 'uint256' },
              { name: 'zoneHash', type: 'bytes32' },
              { name: 'salt', type: 'uint256' },
              { name: 'conduitKey', type: 'bytes32' },
              {
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'structOrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { name: 'signature', type: 'bytes' },
        ],
        internalType: 'structOrder[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            components: [
              { name: 'orderIndex', type: 'uint256' },
              { name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'structFulfillmentComponent[]',
            name: 'offerComponents',
            type: 'tuple[]',
          },
          {
            components: [
              { name: 'orderIndex', type: 'uint256' },
              { name: 'itemIndex', type: 'uint256' },
            ],
            internalType: 'structFulfillmentComponent[]',
            name: 'considerationComponents',
            type: 'tuple[]',
          },
        ],
        internalType: 'structFulfillment[]',
        name: 'fulfillments',
        type: 'tuple[]',
      },
    ],
    name: 'matchOrders',
    outputs: [
      {
        components: [
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              { name: 'identifier', type: 'uint256' },
              { name: 'amount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],
            internalType: 'structReceivedItem',
            name: 'item',
            type: 'tuple',
          },
          { name: 'offerer', type: 'address' },
          { name: 'conduitKey', type: 'bytes32' },
        ],
        internalType: 'structExecution[]',
        name: 'executions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: 'contractName', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: 'offerer', type: 'address' },
              { name: 'zone', type: 'address' },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                ],

                name: 'offer',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'enumItemType',
                    name: 'itemType',
                    type: 'uint8',
                  },
                  { name: 'token', type: 'address' },
                  {
                    name: 'identifierOrCriteria',
                    type: 'uint256',
                  },
                  {
                    name: 'startAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'endAmount',
                    type: 'uint256',
                  },
                  {
                    name: 'recipient',
                    type: 'address',
                  },
                ],

                name: 'consideration',
                type: 'tuple[]',
              },
              {
                name: 'orderType',
                type: 'uint8',
              },
              { name: 'startTime', type: 'uint256' },
              { name: 'endTime', type: 'uint256' },
              { name: 'zoneHash', type: 'bytes32' },
              { name: 'salt', type: 'uint256' },
              { name: 'conduitKey', type: 'bytes32' },
              {
                name: 'totalOriginalConsiderationItems',
                type: 'uint256',
              },
            ],
            internalType: 'structOrderParameters',
            name: 'parameters',
            type: 'tuple',
          },
          { name: 'signature', type: 'bytes' },
        ],
        internalType: 'structOrder[]',
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'validate',
    outputs: [{ name: 'validated', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'BadContractSignature', type: 'error' },
  { inputs: [], name: 'BadFraction', type: 'error' },
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'BadReturnValueFromERC20OnTransfer',
    type: 'error',
  },
  {
    inputs: [{ name: 'v', type: 'uint8' }],
    name: 'BadSignatureV',
    type: 'error',
  },
  { inputs: [], name: 'CannotCancelOrder', type: 'error' },
  {
    inputs: [],
    name: 'ConsiderationCriteriaResolverOutOfRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ConsiderationLengthNotEqualToTotalOriginal',
    type: 'error',
  },
  {
    inputs: [
      { name: 'orderIndex', type: 'uint256' },
      { name: 'considerationIndex', type: 'uint256' },
      { name: 'shortfallAmount', type: 'uint256' },
    ],
    name: 'ConsiderationNotMet',
    type: 'error',
  },
  { inputs: [], name: 'CriteriaNotEnabledForItem', type: 'error' },
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'identifiers', type: 'uint256[]' },
      { name: 'amounts', type: 'uint256[]' },
    ],
    name: 'ERC1155BatchTransferGenericFailure',
    type: 'error',
  },
  { inputs: [], name: 'InexactFraction', type: 'error' },
  { inputs: [], name: 'InsufficientNativeTokensSupplied', type: 'error' },
  { inputs: [], name: 'Invalid1155BatchTransferEncoding', type: 'error' },
  { inputs: [], name: 'InvalidBasicOrderParameterEncoding', type: 'error' },
  {
    inputs: [{ name: 'conduit', type: 'address' }],
    name: 'InvalidCallToConduit',
    type: 'error',
  },
  {
    inputs: [
      { name: 'conduitKey', type: 'bytes32' },
      { name: 'conduit', type: 'address' },
    ],
    name: 'InvalidConduit',
    type: 'error',
  },
  {
    inputs: [{ name: 'orderHash', type: 'bytes32' }],
    name: 'InvalidContractOrder',
    type: 'error',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'InvalidERC721TransferAmount',
    type: 'error',
  },
  { inputs: [], name: 'InvalidFulfillmentComponentData', type: 'error' },
  {
    inputs: [{ name: 'value', type: 'uint256' }],
    name: 'InvalidMsgValue',
    type: 'error',
  },
  { inputs: [], name: 'InvalidNativeOfferItem', type: 'error' },
  { inputs: [], name: 'InvalidProof', type: 'error' },
  {
    inputs: [{ name: 'orderHash', type: 'bytes32' }],
    name: 'InvalidRestrictedOrder',
    type: 'error',
  },
  { inputs: [], name: 'InvalidSignature', type: 'error' },
  { inputs: [], name: 'InvalidSigner', type: 'error' },
  {
    inputs: [
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
    ],
    name: 'InvalidTime',
    type: 'error',
  },
  {
    inputs: [{ name: 'fulfillmentIndex', type: 'uint256' }],
    name: 'MismatchedFulfillmentOfferAndConsiderationComponents',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'enumSide', name: 'side', type: 'uint8' }],
    name: 'MissingFulfillmentComponentOnAggregation',
    type: 'error',
  },
  { inputs: [], name: 'MissingItemAmount', type: 'error' },
  { inputs: [], name: 'MissingOriginalConsiderationItems', type: 'error' },
  {
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'NativeTokenTransferGenericFailure',
    type: 'error',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'NoContract',
    type: 'error',
  },
  { inputs: [], name: 'NoReentrantCalls', type: 'error' },
  { inputs: [], name: 'NoSpecifiedOrdersAvailable', type: 'error' },
  {
    inputs: [],
    name: 'OfferAndConsiderationRequiredOnFulfillment',
    type: 'error',
  },
  { inputs: [], name: 'OfferCriteriaResolverOutOfRange', type: 'error' },
  {
    inputs: [{ name: 'orderHash', type: 'bytes32' }],
    name: 'OrderAlreadyFilled',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'enumSide', name: 'side', type: 'uint8' }],
    name: 'OrderCriteriaResolverOutOfRange',
    type: 'error',
  },
  {
    inputs: [{ name: 'orderHash', type: 'bytes32' }],
    name: 'OrderIsCancelled',
    type: 'error',
  },
  {
    inputs: [{ name: 'orderHash', type: 'bytes32' }],
    name: 'OrderPartiallyFilled',
    type: 'error',
  },
  { inputs: [], name: 'PartialFillsNotEnabledForOrder', type: 'error' },
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'identifier', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'TokenTransferGenericFailure',
    type: 'error',
  },
  {
    inputs: [
      { name: 'orderIndex', type: 'uint256' },
      { name: 'considerationIndex', type: 'uint256' },
    ],
    name: 'UnresolvedConsiderationCriteria',
    type: 'error',
  },
  {
    inputs: [
      { name: 'orderIndex', type: 'uint256' },
      { name: 'offerIndex', type: 'uint256' },
    ],
    name: 'UnresolvedOfferCriteria',
    type: 'error',
  },
  { inputs: [], name: 'UnusedItemParameters', type: 'error' },
  {
    inputs: [
      {
        indexed: false,

        name: 'newCounter',
        type: 'uint256',
      },
      {
        indexed: true,

        name: 'offerer',
        type: 'address',
      },
    ],
    name: 'CounterIncremented',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,

        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,

        name: 'offerer',
        type: 'address',
      },
      { indexed: true, name: 'zone', type: 'address' },
    ],
    name: 'OrderCancelled',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,

        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: true,

        name: 'offerer',
        type: 'address',
      },
      { indexed: true, name: 'zone', type: 'address' },
      {
        indexed: false,

        name: 'recipient',
        type: 'address',
      },
      {
        components: [
          { name: 'itemType', type: 'uint8' },
          { name: 'token', type: 'address' },
          { name: 'identifier', type: 'uint256' },
          { name: 'amount', type: 'uint256' },
        ],
        indexed: false,
        internalType: 'structSpentItem[]',
        name: 'offer',
        type: 'tuple[]',
      },
      {
        components: [
          { name: 'itemType', type: 'uint8' },
          { name: 'token', type: 'address' },
          { name: 'identifier', type: 'uint256' },
          { name: 'amount', type: 'uint256' },
          {
            name: 'recipient',
            type: 'address',
          },
        ],
        indexed: false,
        internalType: 'structReceivedItem[]',
        name: 'consideration',
        type: 'tuple[]',
      },
    ],
    name: 'OrderFulfilled',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,

        name: 'orderHash',
        type: 'bytes32',
      },
      {
        components: [
          { name: 'offerer', type: 'address' },
          { name: 'zone', type: 'address' },
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              {
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { name: 'startAmount', type: 'uint256' },
              { name: 'endAmount', type: 'uint256' },
            ],

            name: 'offer',
            type: 'tuple[]',
          },
          {
            components: [
              { name: 'itemType', type: 'uint8' },
              { name: 'token', type: 'address' },
              {
                name: 'identifierOrCriteria',
                type: 'uint256',
              },
              { name: 'startAmount', type: 'uint256' },
              { name: 'endAmount', type: 'uint256' },
              {
                name: 'recipient',
                type: 'address',
              },
            ],

            name: 'consideration',
            type: 'tuple[]',
          },
          { name: 'orderType', type: 'uint8' },
          { name: 'startTime', type: 'uint256' },
          { name: 'endTime', type: 'uint256' },
          { name: 'zoneHash', type: 'bytes32' },
          { name: 'salt', type: 'uint256' },
          { name: 'conduitKey', type: 'bytes32' },
          {
            name: 'totalOriginalConsiderationItems',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'structOrderParameters',
        name: 'orderParameters',
        type: 'tuple',
      },
    ],
    name: 'OrderValidated',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: false,
        name: 'orderHashes',
        type: 'bytes32[]',
      },
    ],
    name: 'OrdersMatched',
    type: 'event',
  },
] as const

/**
 * WagmiMintExample
 * https://etherscan.io/address/0xaf0326d92b97df1221759476b072abfd8084f9be
 */
export const wagmiMintExampleAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
      },
      { name: 'to', type: 'address', indexed: true },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: '_data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

/**
 * WETH
 * https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
 */
export const wethAbi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ type: 'address' }, { type: 'address' }],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: true, name: 'guy', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: true, name: 'dst', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'dst', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' },
    ],
    name: 'Withdrawal',
    type: 'event',
  },
] as const

/**
 * WritingEditionsFactory
 * https://optimistic.etherscan.io/address/0x302f746eE2fDC10DDff63188f71639094717a766
 */
export const writingEditionsFactoryAbi = [
  {
    inputs: [
      { name: '_owner', type: 'address' },
      {
        name: '_treasuryConfiguration',
        type: 'address',
      },
      { name: '_maxLimit', type: 'uint256' },
      { name: '_guardOn', type: 'bool' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: false,
        name: 'oldBaseDescriptionURI',
        type: 'string',
      },
      {
        indexed: false,
        name: 'newBaseDescriptionURI',
        type: 'string',
      },
    ],
    name: 'BaseDescriptionURISet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'factory',
        type: 'address',
      },
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
    ],
    name: 'CloneDeployed',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: true,
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'EditionsDeployed',
    type: 'event',
  },
  {
    inputs: [{ indexed: false, name: 'guard', type: 'bool' }],
    name: 'FactoryGuardSet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'factory',
        type: 'address',
      },
      {
        indexed: true,
        name: 'oldImplementation',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'FactoryImplementationSet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'factory',
        type: 'address',
      },
      {
        indexed: false,

        name: 'oldLimit',
        type: 'uint256',
      },
      {
        indexed: false,

        name: 'newLimit',
        type: 'uint256',
      },
    ],
    name: 'FactoryLimitSet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: true,
        name: 'oldFundingRecipient',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newFundingRecipient',
        type: 'address',
      },
    ],
    name: 'FundingRecipientSet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'oldImplementation',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'NewImplementation',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: false,

        name: 'oldLimit',
        type: 'uint256',
      },
      {
        indexed: false,

        name: 'newLimit',
        type: 'uint256',
      },
    ],
    name: 'PriceSet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: true,
        name: 'renderer',
        type: 'address',
      },
    ],
    name: 'RendererSet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: true,
        name: 'oldRoyaltyRecipient',
        type: 'address',
      },
      {
        indexed: false,

        name: 'oldRoyaltyBPS',
        type: 'uint256',
      },
      {
        indexed: true,
        name: 'newRoyaltyRecipient',
        type: 'address',
      },
      {
        indexed: false,

        name: 'newRoyaltyBPS',
        type: 'uint256',
      },
    ],
    name: 'RoyaltyChange',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: false,
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'factory',
        type: 'address',
      },
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: false,
        name: 'oldTributary',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newTributary',
        type: 'address',
      },
    ],
    name: 'TributarySet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: false,
        name: 'oldLimit',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'newLimit',
        type: 'uint256',
      },
    ],
    name: 'WritingEditionLimitSet',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'clone',
        type: 'address',
      },
      {
        indexed: false,
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'message',
        type: 'string',
      },
    ],
    name: 'WritingEditionPurchased',
    type: 'event',
  },
  {
    inputs: [],
    name: 'CREATE_TYPEHASH',
    outputs: [{ type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseDescriptionURI',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelOwnershipTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'imageURI', type: 'string' },
          { name: 'contentURI', type: 'string' },
          { name: 'price', type: 'uint8' },
          { name: 'limit', type: 'uint256' },
          {
            name: 'fundingRecipient',
            type: 'address',
          },
          { name: 'renderer', type: 'address' },
          { name: 'nonce', type: 'uint256' },
          { name: 'fee', type: 'uint16' },
        ],
        internalType: 'struct IWritingEditions.WritingEdition',
        name: 'edition',
        type: 'tuple',
      },
    ],
    name: 'create',
    outputs: [{ name: 'clone', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      {
        components: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'imageURI', type: 'string' },
          { name: 'contentURI', type: 'string' },
          { name: 'price', type: 'uint256' },
          { name: 'limit', type: 'uint256' },
          {
            name: 'fundingRecipient',
            type: 'address',
          },
          { name: 'renderer', type: 'address' },
          { name: 'nonce', type: 'uint256' },
          { name: 'fee', type: 'uint16' },
        ],
        internalType: 'struct IWritingEditions.WritingEdition',
        name: 'edition',
        type: 'tuple',
      },
      { name: 'v', type: 'uint8' },
      { name: 'r', type: 'bytes32' },
      { name: 's', type: 'bytes32' },
      { name: 'tokenRecipient', type: 'address' },
      { name: 'message', type: 'string' },
    ],
    name: 'createWithSignature',
    outputs: [{ name: 'clone', type: 'address' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      {
        components: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'imageURI', type: 'string' },
          { name: 'contentURI', type: 'string' },
          { name: 'price', type: 'uint8' },
          { name: 'limit', type: 'uint256' },
          {
            name: 'fundingRecipient',
            type: 'address',
          },
          { name: 'renderer', type: 'address' },
          { name: 'nonce', type: 'uint256' },
          { name: 'fee', type: 'uint16' },
        ],
        internalType: 'struct IWritingEditions.WritingEdition',
        name: 'edition',
        type: 'tuple',
      },
    ],
    name: 'getSalt',
    outputs: [{ type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'guardOn',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'implementation',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isNextOwner',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isOwner',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'salt', type: 'bytes32' },
      { name: 'v', type: 'uint8' },
      { name: 'r', type: 'bytes32' },
      { name: 's', type: 'bytes32' },
    ],
    name: 'isValid',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxLimit',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'o11y',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_implementation', type: 'address' },
      { name: 'salt', type: 'bytes32' },
    ],
    name: 'predictDeterministicAddress',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'clone', type: 'address' },
      { name: 'tokenRecipient', type: 'address' },
      { name: 'message', type: 'string' },
    ],
    name: 'purchaseThroughFactory',
    outputs: [{ name: 'tokenId', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ type: 'bytes32' }],
    name: 'salts',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_guardOn', type: 'bool' }],
    name: 'setGuard',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_implementation', type: 'address' }],
    name: 'setImplementation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_maxLimit', type: 'uint256' }],
    name: 'setLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'clone', type: 'address' },
      { name: '_tributary', type: 'address' },
    ],
    name: 'setTributary',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'nextOwner_', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasuryConfiguration',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * EIP-165
 * https://eips.ethereum.org/EIPS/eip-165
 */
export const eip165Abi = [
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
