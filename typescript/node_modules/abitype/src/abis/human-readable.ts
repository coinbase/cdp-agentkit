export const customSolidityErrorsHumanReadableAbi = [
  'constructor()',
  'error ApprovalCallerNotOwnerNorApproved()',
  'error ApprovalQueryForNonexistentToken()',
] as const

/**
 * ENS
 * https://etherscan.io/address/0x314159265dd8dbb310642f98f50c066173c1259b
 */
export const ensHumanReadableAbi = [
  'function resolver(bytes32 node) view returns (address)',
  'function owner(bytes32 node) view returns (address)',
  'function setSubnodeOwner(bytes32 node, bytes32 label, address owner)',
  'function setTTL(bytes32 node, uint64 ttl)',
  'function ttl(bytes32 node) view returns (uint64)',
  'function setResolver(bytes32 node, address resolver)',
  'function setOwner(bytes32 node, address owner)',
  'event Transfer(bytes32 indexed node, address owner)',
  'event NewOwner(bytes32 indexed node, bytes32 indexed label, address owner)',
  'event NewResolver(bytes32 indexed node, address resolver)',
  'event NewTTL(bytes32 indexed node, uint64 ttl)',
] as const

/**
 * ENSRegistryWithFallback
 * https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
 */
export const ensRegistryWithFallbackHumanReadableAbi = [
  'constructor(address _old)',
  'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
  'event NewOwner(bytes32 indexed node, bytes32 indexed label, address owner)',
  'event NewResolver(bytes32 indexed node, address resolver)',
  'event NewTTL(bytes32 indexed node, uint64 ttl)',
  'event Transfer(bytes32 indexed node, address owner)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function old() view returns (address)',
  'function owner(bytes32 node) view returns (address)',
  'function recordExists(bytes32 node) view returns (bool)',
  'function resolver(bytes32 node) view returns (address)',
  'function setApprovalForAll(address operator, bool approved)',
  'function setOwner(bytes32 node, address owner)',
  'function setRecord(bytes32 node, address owner, address resolver, uint64 ttl)',
  'function setResolver(bytes32 node, address resolver)',
  'function setSubnodeOwner(bytes32 node, bytes32 label, address owner)',
  'function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl)',
  'function setTTL(bytes32 node, uint64 ttl)',
  'function ttl(bytes32 node) view returns (uint64)',
] as const

/**
 * [ERC-20 Token Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20)
 */
export const erc20HumanReadableAbi = [
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
] as const

export const nestedTupleArrayHumanReadableAbi = [
  'function f((uint8 a, uint8[] b, (uint8 x, uint8 y)[] c) s, (uint x, uint y) t, uint256 a) returns ((uint256 x, uint256 y)[] t)',
  'function v((uint8 a, uint8[] b) s, (uint x, uint y) t, uint256 a)',
] as const

/**
 * NounsAuctionHouse
 * https://etherscan.io/address/0x5b2003ca8fe9ffb93684ce377f52b415c7dc0216
 */
export const nounsAuctionHouseHumanReadableAbi = [
  'event AuctionBid(uint256 indexed nounId, address sender, uint256 value, bool extended)',
  'event AuctionCreated(uint256 indexed nounId, uint256 startTime, uint256 endTime)',
  'event AuctionExtended(uint256 indexed nounId, uint256 endTime)',
  'event AuctionMinBidIncrementPercentageUpdated(uint256 minBidIncrementPercentage)',
  'event AuctionReservePriceUpdated(uint256 reservePrice)',
  'event AuctionSettled(uint256 indexed nounId, address winner, uint256 amount)',
  'event AuctionTimeBufferUpdated(uint256 timeBuffer)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event Paused(address account)',
  'event Unpaused(address account)',
  'function auction(uint256 nounId) view returns (uint256 nounId, uint256 amount, uint256 startTime, uint256 endTime, address bidder, bool settled)',
  'function createBid(uint256 nounId) payable',
  'function duration() view returns (uint256)',
  'function initialize(address _nouns, address _weth, uint256 _timeBuffer, uint256 _reservePrice, uint8 _minBidIncrementPercentage, uint256 _duration)',
  'function minBidIncrementPercentage() view returns (uint8)',
  'function nouns() view returns (address)',
  'function owner() view returns (address)',
  'function pause()',
  'function paused() view returns (bool)',
  'function renounceOwnership()',
  'function reservePrice() view returns (uint256)',
  'function setMinBidIncrementPercentage(uint8 _minBidIncrementPercentage)',
  'function setReservePrice(uint256 _reservePrice)',
  'function setTimeBuffer(uint256 _timeBuffer)',
  'function settleAuction()',
  'function settleCurrentAndCreateNewAuction()',
  'function timeBuffer() view returns (uint256)',
  'function newOwner() view returns (address)',
  'function unpause()',
  'function weth() view returns (address)',
] as const

/**
 * Seaport
 * https://etherscan.io/address/0x00000000000001ad428e4906ae43d8f9852d0dd6
 */
export const seaportHumanReadableAbi = [
  'constructor(address conduitController)',
  // structs
  'struct AdditionalRecipient { uint256 amount; address recipient; }',
  'struct AdvancedOrder { OrderParameters parameters; uint120 numerator; uint120 denominator; bytes signature; bytes extraData; }',
  'struct BasicOrderParameters { address considerationToken; uint256 considerationIdentifier; uint256 considerationAmount; address offerer; address zone; address offerToken; uint256 offerIdentifier; uint256 offerAmount; uint8 basicOrderType; uint256 startTime; uint256 endTime; bytes32 zoneHash; uint256 salt; bytes32 offererConduitKey; bytes32 fulfillerConduitKey; uint256 totalOriginalAdditionalRecipients; AdditionalRecipient[] additionalRecipients; bytes signature; }',
  'struct ConsiderationItem { uint8 itemType; address token; uint256 identifierOrCriteria; uint256 startAmount; uint256 endAmount; address recipient; }',
  'struct CriteriaResolver { uint256 orderIndex; uint8 side; uint256 index; uint256 identifier; bytes32[] criteriaProof; }',
  'struct Execution { ReceivedItem item; address offerer; bytes32 conduitKey; }',
  'struct Fulfillment { FulfillmentComponent[] offerComponents; FulfillmentComponent[] considerationComponents; }',
  'struct FulfillmentComponent { uint256 orderIndex; uint256 itemIndex; }',
  'struct OfferItem { uint8 itemType; address token; uint256 identifierOrCriteria; uint256 startAmount; uint256 endAmount; }',
  'struct Order { OrderParameters parameters; bytes signature; }',
  'struct OrderComponents { address offerer; address zone; OfferItem[] offer; ConsiderationItem[] consideration; uint8 orderType; uint256 startTime; uint256 endTime; bytes32 zoneHash; uint256 salt; bytes32 conduitKey; uint256 counter; }',
  'struct OrderParameters { address offerer; address zone; OfferItem[] offer; ConsiderationItem[] consideration; uint8 orderType; uint256 startTime; uint256 endTime; bytes32 zoneHash; uint256 salt; bytes32 conduitKey; uint256 totalOriginalConsiderationItems; }',
  'struct OrderStatus { bool isValidated; bool isCancelled; uint120 numerator; uint120 denominator; }',
  'struct ReceivedItem { uint8 itemType; address token; uint256 identifier; uint256 amount; address recipient; }',
  'struct SpentItem { uint8 itemType; address token; uint256 identifier; uint256 amount; }',
  // functions
  'function cancel(OrderComponents[] orders) external returns (bool cancelled)',
  'function fulfillBasicOrder(BasicOrderParameters parameters) external payable returns (bool fulfilled)',
  'function fulfillBasicOrder_efficient_6GL6yc(BasicOrderParameters parameters) external payable returns (bool fulfilled)',
  'function fulfillOrder(Order order, bytes32 fulfillerConduitKey) external payable returns (bool fulfilled)',
  'function fulfillAdvancedOrder(AdvancedOrder advancedOrder, CriteriaResolver[] criteriaResolvers, bytes32 fulfillerConduitKey, address recipient) external payable returns (bool fulfilled)',
  'function fulfillAvailableOrders(Order[] orders, FulfillmentComponent[][] offerFulfillments, FulfillmentComponent[][] considerationFulfillments, bytes32 fulfillerConduitKey, uint256 maximumFulfilled) external payable returns (bool[] availableOrders, Execution[] executions)',
  'function fulfillAvailableAdvancedOrders(AdvancedOrder[] advancedOrders, CriteriaResolver[] criteriaResolvers, FulfillmentComponent[][] offerFulfillments, FulfillmentComponent[][] considerationFulfillments, bytes32 fulfillerConduitKey, address recipient, uint256 maximumFulfilled) external payable returns (bool[] availableOrders, Execution[] executions)',
  'function getContractOffererNonce(address contractOfferer) external view returns (uint256 nonce)',
  'function getOrderHash(OrderComponents order) external view returns (bytes32 orderHash)',
  'function getOrderStatus(bytes32 orderHash) external view returns (bool isValidated, bool isCancelled, uint256 totalFilled, uint256 totalSize)',
  'function getCounter(address offerer) external view returns (uint256 counter)',
  'function incrementCounter() external returns (uint256 newCounter)',
  'function information() external view returns (string version, bytes32 domainSeparator, address conduitController)',
  'function name() external view returns (string contractName)',
  'function matchAdvancedOrders(AdvancedOrder[] orders, CriteriaResolver[] criteriaResolvers, Fulfillment[] fulfillments) external payable returns (Execution[] executions)',
  'function matchOrders(Order[] orders, Fulfillment[] fulfillments) external payable returns (Execution[] executions)',
  'function validate(Order[] orders) external returns (bool validated)',
  // events
  'event CounterIncremented(uint256 newCounter, address offerer)',
  'event OrderCancelled(bytes32 orderHash, address offerer, address zone)',
  'event OrderFulfilled(bytes32 orderHash, address offerer, address zone, address recipient, SpentItem[] offer, ReceivedItem[] consideration)',
  'event OrdersMatched(bytes32[] orderHashes)',
  'event OrderValidated(bytes32 orderHash, address offerer, address zone)',
  // errors
  'error BadContractSignature()',
  'error BadFraction()',
  'error BadReturnValueFromERC20OnTransfer(address token, address from, address to, uint amount)',
  'error BadSignatureV(uint8 v)',
  'error CannotCancelOrder()',
  'error ConsiderationCriteriaResolverOutOfRange()',
  'error ConsiderationLengthNotEqualToTotalOriginal()',
  'error ConsiderationNotMet(uint orderIndex, uint considerationAmount, uint shortfallAmount)',
  'error CriteriaNotEnabledForItem()',
  'error ERC1155BatchTransferGenericFailure(address token, address from, address to, uint[] identifiers, uint[] amounts)',
  'error InexactFraction()',
  'error InsufficientNativeTokensSupplied()',
  'error Invalid1155BatchTransferEncoding()',
  'error InvalidBasicOrderParameterEncoding()',
  'error InvalidCallToConduit(address conduit)',
  'error InvalidConduit(bytes32 conduitKey, address conduit)',
  'error InvalidContractOrder(bytes32 orderHash)',
  'error InvalidERC721TransferAmount(uint256 amount)',
  'error InvalidFulfillmentComponentData()',
  'error InvalidMsgValue(uint256 value)',
  'error InvalidNativeOfferItem()',
  'error InvalidProof()',
  'error InvalidRestrictedOrder(bytes32 orderHash)',
  'error InvalidSignature()',
  'error InvalidSigner()',
  'error InvalidTime(uint256 startTime, uint256 endTime)',
  'error MismatchedFulfillmentOfferAndConsiderationComponents(uint256 fulfillmentIndex)',
  'error MissingFulfillmentComponentOnAggregation(uint8 side)',
  'error MissingItemAmount()',
  'error MissingOriginalConsiderationItems()',
  'error NativeTokenTransferGenericFailure(address account, uint256 amount)',
  'error NoContract(address account)',
  'error NoReentrantCalls()',
  'error NoSpecifiedOrdersAvailable()',
  'error OfferAndConsiderationRequiredOnFulfillment()',
  'error OfferCriteriaResolverOutOfRange()',
  'error OrderAlreadyFilled(bytes32 orderHash)',
  'error OrderCriteriaResolverOutOfRange(uint8 side)',
  'error OrderIsCancelled(bytes32 orderHash)',
  'error OrderPartiallyFilled(bytes32 orderHash)',
  'error PartialFillsNotEnabledForOrder()',
  'error TokenTransferGenericFailure(address token, address from, address to, uint identifier, uint amount)',
  'error UnresolvedConsiderationCriteria(uint orderIndex, uint considerationIndex)',
  'error UnresolvedOfferCriteria(uint256 orderIndex, uint256 offerIndex)',
  'error UnusedItemParameters()',
] as const

/**
 * WagmiMintExample
 * https://etherscan.io/address/0xaf0326d92b97df1221759476b072abfd8084f9be
 */
export const wagmiMintExampleHumanReadableAbi = [
  'constructor()',
  'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
  'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function approve(address to, uint256 tokenId)',
  'function balanceOf(address owner) view returns (uint256)',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function mint()',
  'function name() view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)',
  'function setApprovalForAll(address operator, bool approved)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function symbol() view returns (string)',
  'function tokenURI(uint256 tokenId) pure returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transferFrom(address from, address to, uint256 tokenId)',
] as const

/**
 * WETH
 * https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
 */
export const wethHumanReadableAbi = [
  'function name() view returns (string)',
  'function approve(address guy, uint wad) returns (bool)',
  'function totalSupply() view returns (uint)',
  'function transferFrom(address src, address dst, uint wad) returns (bool)',
  'function withdraw(uint wad)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function balanceOf(address guy) view returns (uint256)',
  'function symbol() view returns (string)',
  'function transfer(address dst, uint wad) returns (bool)',
  'function deposit() payable',
  'function allowance(address src, address guy) view returns (uint256)',
  'event Approval(address indexed src, address indexed guy, uint wad)',
  'event Transfer(address indexed src, address indexed dst, uint wad)',
  'event Deposit(address indexed dst, uint wad)',
  'event Withdrawal(address indexed src, uint wad)',
  'fallback()',
] as const

/**
 * WritingEditionsFactory
 * https://optimistic.etherscan.io/address/0x302f746eE2fDC10DDff63188f71639094717a766
 */
export const writingEditionsFactoryHumanReadableAbi = [
  'constructor(address _owner, address _treasuryConfiguration, uint256 _maxLimit, bool _guardOn)',
  'event BaseDescriptionURISet(address indexed clone, string oldBaseDescriptionURI, string newBaseDescriptionURI)',
  'event CloneDeployed(address indexed factory, address indexed owner, address indexed clone)',
  // Convert JSON ABI below to Human-Readable ABI string format
  'event EditionsDeployed(address indexed owner, address indexed clone, address indexed implementation)',
  'event FactoryGuardSet(bool guard)',
  'event FactoryImplementationSet(address indexed factory, address indexed oldImplementation, address indexed newImplementation)',
  'event FactoryLimitSet(address indexed factory, uint256 oldLimit, uint256 newLimit)',
  'event FundingRecipientSet(address indexed clone, address indexed oldFundingRecipient, address indexed newFundingRecipient)',
  'event NewImplementation(address indexed oldImplementation, address indexed newImplementation)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event PriceSet(address indexed clone, uint256 oldLimit, uint256 newLimit)',
  'event RendererSet(address indexed clone, address indexed renderer)',
  'event RoyaltyChange(address indexed clone, address indexed oldRoyaltyRecipient, uint256 oldRoyaltyBPS, address indexed newRoyaltyRecipient, uint256 newRoyaltyBPS)',
  'event Transfer(address indexed clone, address indexed from, address indexed to, uint256 indexed tokenId)',
  'event TributarySet(address indexed factory, address indexed clone, address indexed oldTributary, address indexed newTributary)',
  'event WritingEditionLimitSet(address indexed clone, uint256 oldLimit, uint256 newLimit)',
  'event WritingEditionPurchased(address indexed clone, uint256 indexed tokenId, address indexed recipient, uint256 price, string message)',
  'function CREATE_TYPEHASH() view returns (bytes32)',
  'function DOMAIN_SEPARATOR() view returns (bytes32)',
  'function VERSION() view returns (uint8)',
  'function acceptOwnership()',
  'function baseDescriptionURI() view returns (string)',
  'function cancelOwnershipTransfer()',
  'struct WritingEdition { string name; string symbol; string description; string imageURI; string contentURI; uint8 price; uint256 limit; address fundingRecipient; address renderer; uint256 nonce; uint16 fee; }',
  'function create(WritingEdition edition) returns (address clone)',
  'function createWithSignature(address owner, WritingEdition edition, uint8 v, bytes32 r, bytes32 s, address tokenRecipient, string message) payable returns (address clone)',
  'function getSalt(address owner, WritingEdition edition) view returns (bytes32)',
  'function guardOn() view returns (bool)',
  'function implementation() view returns (address)',
  'function isNextOwner() view returns (bool)',
  'function isOwner() view returns (bool)',
  'function isValid(address owner, bytes32 salt, uint8 v, bytes32 r, bytes32 s) view returns (bool)',
  'function maxLimit() view returns (uint256)',
  'function o11y() view returns (address)',
  'function owner() view returns (address)',
  'function predictDeterministicAddress(address _implementation, bytes32 salt) view returns (address)',
  'function purchaseThroughFactory(address clone, address tokenRecipient, string message) payable returns (uint256 tokenId)',
  'function renounceOwnership()',
  'function salts(bytes32) view returns (bool)',
  'function setGuard(bool _guardOn)',
  'function setImplementation(address _implementation)',
  'function setLimit(uint256 _maxLimit)',
  'function setTributary(address clone, address _tributary)',
  'function transferOwnership(address nextOwner_)',
  'function treasuryConfiguration() view returns (address)',
] as const

export const eip165HumanReadableAbi = [
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
]
