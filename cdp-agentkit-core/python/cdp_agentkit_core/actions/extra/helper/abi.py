LYF_LENDING_POOL_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressRegistry",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_WETH9",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Borrow",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "reserveAmount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint16",
        "name": "referral",
        "type": "uint16"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "vaultAddress",
        "type": "address"
      }
    ],
    "name": "DisableVaultToBorrow",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "vaultAddress",
        "type": "address"
      }
    ],
    "name": "EnableVaultToBorrow",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "eTokenAddress",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "stakingAddress",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "InitReserve",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "underlyingTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "Redeemed",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Repay",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "ReserveActivated",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "ReserveBorrowDisabled",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "ReserveBorrowEnabled",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "ReserveDeActivated",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "ReserveFrozen",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "ReserveUnFreeze",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "vaultAddress",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "credit",
        "type": "uint256"
      }
    ],
    "name": "SetCreditsOfVault",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "utilizationA",
        "type": "uint16"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "borrowingRateA",
        "type": "uint16"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "utilizationB",
        "type": "uint16"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "borrowingRateB",
        "type": "uint16"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "maxBorrowingRate",
        "type": "uint16"
      }
    ],
    "name": "SetInterestRateConfig",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "cap",
        "type": "uint256"
      }
    ],
    "name": "SetReserveCapacity",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "feeRate",
        "type": "uint256"
      }
    ],
    "name": "SetReserveFeeRate",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [],
    "name": "UnPaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "WETH9",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "activateReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "addressRegistry",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "debtId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "borrowingRateOfReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "borrowingWhiteList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "vaultAddress",
        "type": "address"
      }
    ],
    "name": "credits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "deActivateReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "debtId",
        "type": "uint256"
      }
    ],
    "name": "debtPositions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "borrowed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "borrowedIndex",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "depositAndStake",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "disableBorrowing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      }
    ],
    "name": "disableVaultToBorrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "emergencyPauseAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "enableBorrowing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      }
    ],
    "name": "enableVaultToBorrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "exchangeRateOfReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "freezeReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "debtId",
        "type": "uint256"
      }
    ],
    "name": "getCurrentDebt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "currentDebt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "latestBorrowingIndex",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "getETokenAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "reserveIdArr",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getPositionStatus",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "reserveId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "eTokenStaked",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "eTokenUnStaked",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
          }
        ],
        "internalType": "struct ILendingPool.PositionStatus[]",
        "name": "statusArr",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "debtId",
        "type": "uint256"
      }
    ],
    "name": "getReserveIdOfDebt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "reserveIdArr",
        "type": "uint256[]"
      }
    ],
    "name": "getReserveStatus",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "reserveId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "underlyingTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "eTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "stakingAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "totalLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalBorrows",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "exchangeRate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "borrowingRate",
            "type": "uint256"
          }
        ],
        "internalType": "struct ILendingPool.ReserveStatus[]",
        "name": "statusArr",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "getStakingAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "getUnderlyingTokenAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "initReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "newDebtPosition",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "debtId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextDebtPositionId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextReserveId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "receiveNativeETH",
        "type": "bool"
      }
    ],
    "name": "redeem",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "debtId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "repay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "reserves",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "borrowingIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentBorrowingRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalBorrows",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "underlyingTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "eTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "stakingAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "reserveCapacity",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "utilizationA",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "borrowingRateA",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "utilizationB",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "borrowingRateB",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "maxBorrowingRate",
            "type": "uint128"
          }
        ],
        "internalType": "struct DataTypes.InterestRateConfig",
        "name": "borrowingRateConfig",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "lastUpdateTimestamp",
        "type": "uint128"
      },
      {
        "internalType": "uint16",
        "name": "reserveFeeRate",
        "type": "uint16"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "frozen",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "borrowingEnabled",
            "type": "bool"
          }
        ],
        "internalType": "struct DataTypes.Flags",
        "name": "flags",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "utilizationA",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "borrowingRateA",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "utilizationB",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "borrowingRateB",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "maxBorrowingRate",
        "type": "uint16"
      }
    ],
    "name": "setBorrowingRateConfig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "credit",
        "type": "uint256"
      }
    ],
    "name": "setCreditsOfVault",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cap",
        "type": "uint256"
      }
    ],
    "name": "setReserveCapacity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "_rate",
        "type": "uint16"
      }
    ],
    "name": "setReserveFeeRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "totalBorrowsOfReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalBorrows",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "totalLiquidityOfReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalLiquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "unFreezeReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unPauseAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "receiveNativeETH",
        "type": "bool"
      }
    ],
    "name": "unStakeAndWithdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "utilizationRateOfReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

LYF_POSITION_MANAGER_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressProvider",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "percent",
        "type": "uint16"
      },
      {
        "indexed": False,
        "internalType": "uint64",
        "name": "timestamp",
        "type": "uint64"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Received",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Received",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "fee0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "fee1",
        "type": "uint256"
      }
    ],
    "name": "CloseOutOfRangePosition",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "percent",
        "type": "uint16"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Received",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Received",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Repaid",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Repaid",
        "type": "uint256"
      }
    ],
    "name": "CloseVaultPositionPartially",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Repaid",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Repaid",
        "type": "uint256"
      }
    ],
    "name": "ExactRepay",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "feeType",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FeePaid",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidityAdded",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "fee0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "fee1",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256[]",
        "name": "rewards",
        "type": "uint256[]"
      }
    ],
    "name": "InvestEarnedFeeToLiquidity",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Invest",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Invest",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Borrow",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Borrow",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }
    ],
    "name": "InvestToVaultPosition",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint16",
        "name": "percent",
        "type": "uint16"
      },
      {
        "indexed": False,
        "internalType": "uint64",
        "name": "timestamp",
        "type": "uint64"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "debtValueOfPosition",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidityValueOfPosition",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Left",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Left",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidateFee0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidateFee1",
        "type": "uint256"
      }
    ],
    "name": "LiquidateVaultPositionPartially",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      }
    ],
    "name": "NewVaultPosition",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "WETH9",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "addPermissionedCompounder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "addPermissionedLiquidator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "addPermissionedRangeStopCaller",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "addressProvider",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      }
    ],
    "name": "adminSetVault",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vaultId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "vaultPositionId",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "percent",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "receiveNativeETH",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "receiveType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "minAmount0WhenRemoveLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minAmount1WhenRemoveLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "swapExecutorId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "swapPath",
            "type": "bytes"
          }
        ],
        "internalType": "struct IVeloVaultPositionManager.CloseVaultPositionPartiallyParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "closeOutOfRangePosition",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vaultId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "vaultPositionId",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "percent",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "receiveNativeETH",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "receiveType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "minAmount0WhenRemoveLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minAmount1WhenRemoveLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "swapExecutorId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "swapPath",
            "type": "bytes"
          }
        ],
        "internalType": "struct IVeloVaultPositionManager.CloseVaultPositionPartiallyParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "closeVaultPositionPartially",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "compounderWhitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "disablePermissionLessCompound",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "disablePermissionLessLiquidation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "disablePermissonLessRangeStop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "enablePermissionLessCompound",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "enablePermissionLessLiquidation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "enablePermissonLessRangeStop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vaultId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "vaultPositionId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0ToRepay",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1ToRepay",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "receiveNativeETH",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct IVeloVaultPositionManager.ExactRepayParam",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "exactRepay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount0Repaid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1Repaid",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      }
    ],
    "name": "getVault",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "gauge",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "pair",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "stable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "paused",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "frozen",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "borrowingEnabled",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "liquidateWithTWAP",
            "type": "bool"
          },
          {
            "internalType": "uint16",
            "name": "maxLeverage",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "premiumMaxLeverage",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "maxPriceDiff",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidateDebtRatio",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "borrowFeeRate",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "compoundFeeRate",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidateFeeRate",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "rangeStopFeeRate",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "protocolFeeRate",
            "type": "uint16"
          },
          {
            "internalType": "uint256",
            "name": "premiumRequirement",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "protocolFee0Accumulated",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "protocolFee1Accumulated",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minInvestValue",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minSwapAmount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minSwapAmount1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalLp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalLpShares",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "premiumUtilizationOfReserve0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debtLimit0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debtPositionId0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debtTotalShares0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "premiumUtilizationOfReserve1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debtLimit1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debtPositionId1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debtTotalShares1",
            "type": "uint256"
          }
        ],
        "internalType": "struct VaultTypes.VeloVaultState",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      }
    ],
    "name": "getVaultPosition",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "manager",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "enableRangeStop",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "openedAt",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "current",
            "type": "uint64"
          },
          {
            "internalType": "uint256",
            "name": "token0Principal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "token1Principal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "liquidityPrincipal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "token0Left",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "token1Left",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "token0InLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "token1InLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debt0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debt1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "borrowingIndex0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "borrowingIndex1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minPriceOfRangeStop",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxPriceOfRangeStop",
            "type": "uint256"
          }
        ],
        "internalType": "struct VaultTypes.VeloPositionValue",
        "name": "state",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vaultId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "compoundFeeReceiver",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "stable",
                "type": "bool"
              }
            ],
            "internalType": "struct IRouter.route[][]",
            "name": "routes",
            "type": "tuple[][]"
          },
          {
            "internalType": "bool",
            "name": "receiveNativeETH",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct IVeloVaultPositionManager.InvestEarnedFeeToLiquidityParam",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "investEarnedFeeToLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vaultId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "vaultPositionId",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "percent",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "receiveNativeETH",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "receiveType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "minAmount0WhenRemoveLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minAmount1WhenRemoveLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxRepay0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxRepay1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "swapExecutorId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "swapPath",
            "type": "bytes"
          }
        ],
        "internalType": "struct IVeloVaultPositionManager.LiquidateVaultPositionPartiallyParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "liquidateVaultPositionPartially",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "liquidatorWhitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vaultId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "vaultPositionId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0Invest",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0Borrow",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Invest",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Borrow",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0Min",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Min",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "swapExecutorId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "swapPath",
            "type": "bytes"
          }
        ],
        "internalType": "struct IVeloVaultPositionManager.NewOrInvestToVaultPositionParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "newOrInvestToVaultPosition",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "feeType",
        "type": "uint256"
      }
    ],
    "name": "payFeeToTreasuryCallback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "vaultId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "payer",
            "type": "address"
          }
        ],
        "internalType": "struct IVeloVaultPositionManager.PayToVaultCallbackParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "payToVaultCallback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "permissionLessCompoundEnabled",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "permissionLessLiquidationEnabled",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "permissionLessRangeStopEnabled",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rangeStopCallerWhitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "removePermissionedCompounder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "removePermissionedLiquidator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "removePermissionedRangeStopCaller",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "enable",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "minPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxPrice",
        "type": "uint256"
      }
    ],
    "name": "setRangeStop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "vaultId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "vaultPositionId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "newManager",
        "type": "address"
      }
    ],
    "name": "transferManagerOfVaultPosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "vaultFactory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

ERC20_ABI = [
    {
        "constant": True,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": False,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": False,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": False,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": True,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": True,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": False,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": True,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": False,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

EXTRA_XLEND_POOL_ABI = [
  {
    "inputs": [
      {
        "internalType": "contract IPoolAddressesProvider",
        "name": "provider",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "backer",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "BackUnbacked",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "borrowRate",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "Borrow",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "initiator",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "premium",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "FlashLoan",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "totalDebt",
        "type": "uint256"
      }
    ],
    "name": "IsolationModeTotalDebtUpdated",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "collateralAsset",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "debtAsset",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "debtToCover",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidatedCollateralAmount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "bool",
        "name": "receiveAToken",
        "type": "bool"
      }
    ],
    "name": "LiquidationCall",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "collateralAsset",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "debtAsset",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "debtToCover",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidatedCollateralAmount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "liquidator",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "bool",
        "name": "repayAToken",
        "type": "bool"
      },
      {
        "indexed": False,
        "internalType": "bool",
        "name": "receiveAToken",
        "type": "bool"
      }
    ],
    "name": "LiquidationCallV2",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "MintUnbacked",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amountMinted",
        "type": "uint256"
      }
    ],
    "name": "MintedToTreasury",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "RebalanceStableBorrowRate",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "repayer",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "bool",
        "name": "useATokens",
        "type": "bool"
      }
    ],
    "name": "Repay",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidityRate",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "stableBorrowRate",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "variableBorrowRate",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "liquidityIndex",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "variableBorrowIndex",
        "type": "uint256"
      }
    ],
    "name": "ReserveDataUpdated",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "ReserveUsedAsCollateralDisabled",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "ReserveUsedAsCollateralEnabled",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": True,
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "Supply",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      }
    ],
    "name": "SwapBorrowRateMode",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint8",
        "name": "categoryId",
        "type": "uint8"
      }
    ],
    "name": "UserEModeSet",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ADDRESSES_PROVIDER",
    "outputs": [
      {
        "internalType": "contract IPoolAddressesProvider",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BRIDGE_PROTOCOL_FEE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FLASHLOAN_PREMIUM_TOTAL",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FLASHLOAN_PREMIUM_TO_PROTOCOL",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_NUMBER_RESERVES",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_STABLE_RATE_BORROW_SIZE_PERCENT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "POOL_REVISION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "backUnbacked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      }
    ],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
      },
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "ltv",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationThreshold",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationBonus",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "priceSource",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "label",
            "type": "string"
          }
        ],
        "internalType": "struct DataTypes.EModeCategory",
        "name": "category",
        "type": "tuple"
      }
    ],
    "name": "configureEModeCategory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "dropReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balanceFromBefore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balanceToBefore",
        "type": "uint256"
      }
    ],
    "name": "finalizeTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiverAddress",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "assets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "interestRateModes",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "flashLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiverAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "flashLoanSimple",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getConfiguration",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "data",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.ReserveConfigurationMap",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
      }
    ],
    "name": "getEModeCategoryData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "ltv",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationThreshold",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "liquidationBonus",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "priceSource",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "label",
            "type": "string"
          }
        ],
        "internalType": "struct DataTypes.EModeCategory",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "id",
        "type": "uint16"
      }
    ],
    "name": "getReserveAddressById",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getReserveData",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
              }
            ],
            "internalType": "struct DataTypes.ReserveConfigurationMap",
            "name": "configuration",
            "type": "tuple"
          },
          {
            "internalType": "uint128",
            "name": "liquidityIndex",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "currentLiquidityRate",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "variableBorrowIndex",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "currentVariableBorrowRate",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "currentStableBorrowRate",
            "type": "uint128"
          },
          {
            "internalType": "uint40",
            "name": "lastUpdateTimestamp",
            "type": "uint40"
          },
          {
            "internalType": "uint16",
            "name": "id",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "aTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "stableDebtTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "variableDebtTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "interestRateStrategyAddress",
            "type": "address"
          },
          {
            "internalType": "uint128",
            "name": "accruedToTreasury",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "unbacked",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "isolationModeTotalDebt",
            "type": "uint128"
          }
        ],
        "internalType": "struct DataTypes.ReserveData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getReserveNormalizedIncome",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "getReserveNormalizedVariableDebt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReservesList",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserAccountData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalCollateralBase",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalDebtBase",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "availableBorrowsBase",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentLiquidationThreshold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ltv",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "healthFactor",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserConfiguration",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "data",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.UserConfigurationMap",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserEMode",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "aTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "stableDebtAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "variableDebtAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "interestRateStrategyAddress",
        "type": "address"
      }
    ],
    "name": "initReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IPoolAddressesProvider",
        "name": "provider",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "collateralAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "debtAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "debtToCover",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "receiveAToken",
        "type": "bool"
      }
    ],
    "name": "liquidationCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "collateralAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "debtAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "debtToCover",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "repayAToken",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "receiveAToken",
        "type": "bool"
      }
    ],
    "name": "liquidationCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "assets",
        "type": "address[]"
      }
    ],
    "name": "mintToTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "mintUnbacked",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "rebalanceStableBorrowRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      }
    ],
    "name": "repay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      }
    ],
    "name": "repayWithATokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "permitV",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "permitR",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "permitS",
        "type": "bytes32"
      }
    ],
    "name": "repayWithPermit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "rescueTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      }
    ],
    "name": "resetIsolationModeTotalDebt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "data",
            "type": "uint256"
          }
        ],
        "internalType": "struct DataTypes.ReserveConfigurationMap",
        "name": "configuration",
        "type": "tuple"
      }
    ],
    "name": "setConfiguration",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "rateStrategyAddress",
        "type": "address"
      }
    ],
    "name": "setReserveInterestRateStrategyAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      }
    ],
    "name": "setReserveTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "categoryId",
        "type": "uint8"
      }
    ],
    "name": "setUserEMode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "useAsCollateral",
        "type": "bool"
      }
    ],
    "name": "setUserUseReserveAsCollateral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      }
    ],
    "name": "supply",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "permitV",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "permitR",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "permitS",
        "type": "bytes32"
      }
    ],
    "name": "supplyWithPermit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "interestRateMode",
        "type": "uint256"
      }
    ],
    "name": "swapBorrowRateMode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "protocolFee",
        "type": "uint256"
      }
    ],
    "name": "updateBridgeProtocolFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "flashLoanPremiumTotal",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "flashLoanPremiumToProtocol",
        "type": "uint128"
      }
    ],
    "name": "updateFlashloanPremiums",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

EXTRA_XLEND_ATOKEN_ABI = [
  {
    "inputs": [
      {
        "internalType": "contract IPool",
        "name": "pool",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "BalanceTransfer",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "balanceIncrease",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "Burn",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "underlyingAsset",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "pool",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "incentivesController",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint8",
        "name": "aTokenDecimals",
        "type": "uint8"
      },
      {
        "indexed": False,
        "internalType": "string",
        "name": "aTokenName",
        "type": "string"
      },
      {
        "indexed": False,
        "internalType": "string",
        "name": "aTokenSymbol",
        "type": "string"
      },
      {
        "indexed": False,
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "balanceIncrease",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "Mint",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": False,
        "internalType": "address",
        "name": "oldTreasury",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "address",
        "name": "newTreasury",
        "type": "address"
      }
    ],
    "name": "TreasuryUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ATOKEN_REVISION",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EIP712_REVISION",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PERMIT_TYPEHASH",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "POOL",
    "outputs": [
      {
        "internalType": "contract IPool",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "RESERVE_TREASURY_ADDRESS",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "UNDERLYING_ASSET_ADDRESS",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "receiverOfUnderlying",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getIncentivesController",
    "outputs": [
      {
        "internalType": "contract IAaveIncentivesController",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getPreviousIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getScaledUserBalanceAndSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "handleRepayment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IPool",
        "name": "initializingPool",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "treasury",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "underlyingAsset",
        "type": "address"
      },
      {
        "internalType": "contract IAaveIncentivesController",
        "name": "incentivesController",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "aTokenDecimals",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "aTokenName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "aTokenSymbol",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "params",
        "type": "bytes"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "mintToTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "nonces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "permit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "rescueTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "scaledBalanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "scaledTotalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IAaveIncentivesController",
        "name": "controller",
        "type": "address"
      }
    ],
    "name": "setIncentivesController",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferOnLiquidation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferUnderlyingTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newTreasury",
        "type": "address"
      }
    ],
    "name": "updateTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

IPAIR_V2_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "BelowMinimumK",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DepositsNotEqual",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FactoryAlreadySet",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientInputAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientLiquidity",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientLiquidityBurned",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientLiquidityMinted",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientOutputAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTo",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "IsPaused",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "K",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotEmergencyCouncil",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "str",
        "type": "string"
      }
    ],
    "name": "StringTooLong",
    "type": "error"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "name": "Burn",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "name": "Claim",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [],
    "name": "EIP712DomainChanged",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "name": "Fees",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "name": "Mint",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0In",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1In",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
      }
    ],
    "name": "Swap",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "reserve0",
        "type": "uint256"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "reserve1",
        "type": "uint256"
      }
    ],
    "name": "Sync",
    "type": "event"
  },
  {
    "anonymous": False,
    "inputs": [
      {
        "indexed": True,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": True,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": False,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "blockTimestampLast",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimFees",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "claimed0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "claimed1",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "claimable0",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "claimable1",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentCumulativePrices",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reserve0Cumulative",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserve1Cumulative",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "blockTimestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "eip712Domain",
    "outputs": [
      {
        "internalType": "bytes1",
        "name": "fields",
        "type": "bytes1"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "version",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "verifyingContract",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "salt",
        "type": "bytes32"
      },
      {
        "internalType": "uint256[]",
        "name": "extensions",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      }
    ],
    "name": "getAmountOut",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getK",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_reserve0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_reserve1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_blockTimestampLast",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "index0",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "index1",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token0",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_token1",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_stable",
        "type": "bool"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastObservation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve0Cumulative",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve1Cumulative",
            "type": "uint256"
          }
        ],
        "internalType": "struct IPool.Observation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "metadata",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "dec0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "dec1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "r0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "r1",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "st",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "t0",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "t1",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "liquidity",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "nonces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "observationLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "observations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserve0Cumulative",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reserve1Cumulative",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "periodSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "permit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolFees",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "points",
        "type": "uint256"
      }
    ],
    "name": "prices",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "granularity",
        "type": "uint256"
      }
    ],
    "name": "quote",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reserve0",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reserve0CumulativeLast",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reserve1",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reserve1CumulativeLast",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "points",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "window",
        "type": "uint256"
      }
    ],
    "name": "sample",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "__name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "__symbol",
        "type": "string"
      }
    ],
    "name": "setSymbol",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "skim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stable",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "supplyIndex0",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "supplyIndex1",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "swap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sync",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token0",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token1",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokens",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

PAIRS_SUGAR_V2_ABI = [
    {
        "stateMutability": "nonpayable",
        "type": "constructor",
        "inputs": [
            {
                "name": "_voter",
                "type": "address"
            },
            {
                "name": "_registry",
                "type": "address"
            },
            {
                "name": "_nfpm",
                "type": "address"
            },
            {
                "name": "_slipstream_helper",
                "type": "address"
            }
        ],
        "outputs": []
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "forSwaps",
        "inputs": [
            {
                "name": "_limit",
                "type": "uint256"
            },
            {
                "name": "_offset",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "type",
                        "type": "int24"
                    },
                    {
                        "name": "token0",
                        "type": "address"
                    },
                    {
                        "name": "token1",
                        "type": "address"
                    },
                    {
                        "name": "factory",
                        "type": "address"
                    },
                    {
                        "name": "pool_fee",
                        "type": "uint256"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "tokens",
        "inputs": [
            {
                "name": "_limit",
                "type": "uint256"
            },
            {
                "name": "_offset",
                "type": "uint256"
            },
            {
                "name": "_account",
                "type": "address"
            },
            {
                "name": "_addresses",
                "type": "address[]"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "token_address",
                        "type": "address"
                    },
                    {
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "name": "decimals",
                        "type": "uint8"
                    },
                    {
                        "name": "account_balance",
                        "type": "uint256"
                    },
                    {
                        "name": "listed",
                        "type": "bool"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "all",
        "inputs": [
            {
                "name": "_limit",
                "type": "uint256"
            },
            {
                "name": "_offset",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "name": "decimals",
                        "type": "uint8"
                    },
                    {
                        "name": "liquidity",
                        "type": "uint256"
                    },
                    {
                        "name": "type",
                        "type": "int24"
                    },
                    {
                        "name": "tick",
                        "type": "int24"
                    },
                    {
                        "name": "sqrt_ratio",
                        "type": "uint160"
                    },
                    {
                        "name": "token0",
                        "type": "address"
                    },
                    {
                        "name": "reserve0",
                        "type": "uint256"
                    },
                    {
                        "name": "staked0",
                        "type": "uint256"
                    },
                    {
                        "name": "token1",
                        "type": "address"
                    },
                    {
                        "name": "reserve1",
                        "type": "uint256"
                    },
                    {
                        "name": "staked1",
                        "type": "uint256"
                    },
                    {
                        "name": "gauge",
                        "type": "address"
                    },
                    {
                        "name": "gauge_liquidity",
                        "type": "uint256"
                    },
                    {
                        "name": "gauge_alive",
                        "type": "bool"
                    },
                    {
                        "name": "fee",
                        "type": "address"
                    },
                    {
                        "name": "bribe",
                        "type": "address"
                    },
                    {
                        "name": "factory",
                        "type": "address"
                    },
                    {
                        "name": "emissions",
                        "type": "uint256"
                    },
                    {
                        "name": "emissions_token",
                        "type": "address"
                    },
                    {
                        "name": "pool_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "unstaked_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "token0_fees",
                        "type": "uint256"
                    },
                    {
                        "name": "token1_fees",
                        "type": "uint256"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "byIndex",
        "inputs": [
            {
                "name": "_index",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "components": [
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "name": "decimals",
                        "type": "uint8"
                    },
                    {
                        "name": "liquidity",
                        "type": "uint256"
                    },
                    {
                        "name": "type",
                        "type": "int24"
                    },
                    {
                        "name": "tick",
                        "type": "int24"
                    },
                    {
                        "name": "sqrt_ratio",
                        "type": "uint160"
                    },
                    {
                        "name": "token0",
                        "type": "address"
                    },
                    {
                        "name": "reserve0",
                        "type": "uint256"
                    },
                    {
                        "name": "staked0",
                        "type": "uint256"
                    },
                    {
                        "name": "token1",
                        "type": "address"
                    },
                    {
                        "name": "reserve1",
                        "type": "uint256"
                    },
                    {
                        "name": "staked1",
                        "type": "uint256"
                    },
                    {
                        "name": "gauge",
                        "type": "address"
                    },
                    {
                        "name": "gauge_liquidity",
                        "type": "uint256"
                    },
                    {
                        "name": "gauge_alive",
                        "type": "bool"
                    },
                    {
                        "name": "fee",
                        "type": "address"
                    },
                    {
                        "name": "bribe",
                        "type": "address"
                    },
                    {
                        "name": "factory",
                        "type": "address"
                    },
                    {
                        "name": "emissions",
                        "type": "uint256"
                    },
                    {
                        "name": "emissions_token",
                        "type": "address"
                    },
                    {
                        "name": "pool_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "unstaked_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "token0_fees",
                        "type": "uint256"
                    },
                    {
                        "name": "token1_fees",
                        "type": "uint256"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "positions",
        "inputs": [
            {
                "name": "_limit",
                "type": "uint256"
            },
            {
                "name": "_offset",
                "type": "uint256"
            },
            {
                "name": "_account",
                "type": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "liquidity",
                        "type": "uint256"
                    },
                    {
                        "name": "staked",
                        "type": "uint256"
                    },
                    {
                        "name": "amount0",
                        "type": "uint256"
                    },
                    {
                        "name": "amount1",
                        "type": "uint256"
                    },
                    {
                        "name": "staked0",
                        "type": "uint256"
                    },
                    {
                        "name": "staked1",
                        "type": "uint256"
                    },
                    {
                        "name": "unstaked_earned0",
                        "type": "uint256"
                    },
                    {
                        "name": "unstaked_earned1",
                        "type": "uint256"
                    },
                    {
                        "name": "emissions_earned",
                        "type": "uint256"
                    },
                    {
                        "name": "tick_lower",
                        "type": "int24"
                    },
                    {
                        "name": "tick_upper",
                        "type": "int24"
                    },
                    {
                        "name": "sqrt_ratio_lower",
                        "type": "uint160"
                    },
                    {
                        "name": "sqrt_ratio_upper",
                        "type": "uint160"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "epochsLatest",
        "inputs": [
            {
                "name": "_limit",
                "type": "uint256"
            },
            {
                "name": "_offset",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "ts",
                        "type": "uint256"
                    },
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "votes",
                        "type": "uint256"
                    },
                    {
                        "name": "emissions",
                        "type": "uint256"
                    },
                    {
                        "name": "bribes",
                        "type": "tuple[]",
                        "components": [
                            {
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "name": "amount",
                                "type": "uint256"
                            }
                        ]
                    },
                    {
                        "name": "fees",
                        "type": "tuple[]",
                        "components": [
                            {
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "name": "amount",
                                "type": "uint256"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "epochsByAddress",
        "inputs": [
            {
                "name": "_limit",
                "type": "uint256"
            },
            {
                "name": "_offset",
                "type": "uint256"
            },
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "ts",
                        "type": "uint256"
                    },
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "votes",
                        "type": "uint256"
                    },
                    {
                        "name": "emissions",
                        "type": "uint256"
                    },
                    {
                        "name": "bribes",
                        "type": "tuple[]",
                        "components": [
                            {
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "name": "amount",
                                "type": "uint256"
                            }
                        ]
                    },
                    {
                        "name": "fees",
                        "type": "tuple[]",
                        "components": [
                            {
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "name": "amount",
                                "type": "uint256"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "rewards",
        "inputs": [
            {
                "name": "_limit",
                "type": "uint256"
            },
            {
                "name": "_offset",
                "type": "uint256"
            },
            {
                "name": "_venft_id",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "venft_id",
                        "type": "uint256"
                    },
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "name": "fee",
                        "type": "address"
                    },
                    {
                        "name": "bribe",
                        "type": "address"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "rewardsByAddress",
        "inputs": [
            {
                "name": "_venft_id",
                "type": "uint256"
            },
            {
                "name": "_pool",
                "type": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "name": "venft_id",
                        "type": "uint256"
                    },
                    {
                        "name": "lp",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "name": "fee",
                        "type": "address"
                    },
                    {
                        "name": "bribe",
                        "type": "address"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "registry",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "voter",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "nfpm",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "name": "cl_helper",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ]
    }
]