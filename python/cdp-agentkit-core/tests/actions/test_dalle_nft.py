"""Tests for the DALL-E NFT action."""
import os
from unittest.mock import MagicMock, patch
import pytest
from cdp import Wallet
from cdp_agentkit_core.actions.dalle_nft import (
    DalleNftAction,
    generate_dalle_image,
    upload_to_ipfs,
    create_and_upload_metadata,
    get_openai_client
)

@pytest.fixture
def mock_env_vars():
    """Set up environment variables for testing."""
    os.environ["OPENAI_API_KEY"] = "test_openai_key"
    os.environ["PINATA_JWT"] = "test_pinata_jwt"
    yield
    del os.environ["OPENAI_API_KEY"]
    del os.environ["PINATA_JWT"]

@pytest.fixture
def mock_wallet():
    """Create a mock wallet for testing."""
    wallet = MagicMock(spec=Wallet)
    # Mock deploy_nft result
    deploy_result = MagicMock()
    deploy_result.contract_address = "0x123"
    deploy_result.transaction.transaction_link = "https://test.com/deploy"
    wallet.deploy_nft.return_value.wait.return_value = deploy_result
    
    # Mock invoke_contract result
    mint_result = MagicMock()
    mint_result.transaction.transaction_link = "https://test.com/mint"
    wallet.invoke_contract.return_value.wait.return_value = mint_result
    
    return wallet

@pytest.fixture
def action():
    """Create DalleNftAction instance."""
    return DalleNftAction()

def test_generate_dalle_image(mock_env_vars):
    """Test DALL-E image generation."""
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.data = [MagicMock(url="https://test.com/image.png")]
    mock_client.images.generate.return_value = mock_response

    result = generate_dalle_image("test prompt", client=mock_client)
    assert result == "https://test.com/image.png"
    mock_client.images.generate.assert_called_once_with(
        model="dall-e-3",
        prompt="test prompt",
        size="1024x1024",
        quality="standard",
        n=1,
    )

def test_upload_to_ipfs(mock_env_vars):
    """Test uploading to IPFS via Pinata."""
    with patch("requests.get") as mock_get, patch("requests.post") as mock_post:
        # Mock image download
        mock_get.return_value.content = b"test_image_data"
        
        # Mock Pinata upload
        mock_post.return_value.json.return_value = {"IpfsHash": "test_hash"}
        
        ipfs_url, gateway_url = upload_to_ipfs("https://test.com/image.png")
        
        assert ipfs_url == "ipfs://test_hash"
        assert gateway_url == "https://gateway.pinata.cloud/ipfs/test_hash"
        
        # Verify Pinata API call
        mock_post.assert_called_once()
        assert mock_post.call_args[0][0] == "https://api.pinata.cloud/pinning/pinFileToIPFS"

def test_create_and_upload_metadata(mock_env_vars):
    """Test creating and uploading NFT metadata."""
    with patch("requests.post") as mock_post:
        mock_post.return_value.json.return_value = {"IpfsHash": "test_metadata_hash"}
        
        result = create_and_upload_metadata(
            "test prompt", 
            "ipfs://test_image_hash"
        )
        
        assert result == "ipfs://test_metadata_hash/0"
        
        # Verify metadata format
        called_files = mock_post.call_args[1]["files"]
        assert "file" in called_files
        assert called_files["file"][0] == "0"  # Check filename is "0"
        assert "pinataOptions" in called_files
        assert "pinataMetadata" in called_files

def test_run_with_new_contract(action, mock_wallet, mock_env_vars):
    """Test full NFT creation process with new contract deployment."""
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.data = [MagicMock(url="https://test.com/image.png")]
    mock_client.images.generate.return_value = mock_response

    with patch("cdp_agentkit_core.actions.dalle_nft.get_openai_client", return_value=mock_client), \
         patch("requests.get") as mock_get, \
         patch("requests.post") as mock_post:
        
        # Mock image download and Pinata upload
        mock_get.return_value.content = b"test_image_data"
        mock_post.return_value.json.return_value = {"IpfsHash": "test_hash"}
        
        result = action.func(
            wallet=mock_wallet,
            prompt="test prompt",
            destination="0xdest",
            collection_name="Test Collection",
            collection_symbol="TEST"
        )
        
        # Verify result contains all expected information
        assert "Successfully created" in result
        assert "0x123" in result  # Contract address
        assert "https://test.com/image.png" in result
        assert "https://gateway.pinata.cloud/ipfs/test_hash" in result
        assert "ipfs://test_hash" in result
        assert "https://test.com/mint" in result
        assert "https://test.com/deploy" in result
        
        # Verify contract deployment
        mock_wallet.deploy_nft.assert_called_once()
        
        # Verify NFT minting
        mock_wallet.invoke_contract.assert_called_once_with(
            contract_address="0x123",
            method="mint",
            args={"to": "0xdest", "quantity": "1"}
        )

def test_run_with_existing_contract(action, mock_wallet, mock_env_vars):
    """Test NFT creation process with existing contract."""
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.data = [MagicMock(url="https://test.com/image.png")]
    mock_client.images.generate.return_value = mock_response

    with patch("cdp_agentkit_core.actions.dalle_nft.get_openai_client", return_value=mock_client), \
         patch("requests.get") as mock_get, \
         patch("requests.post") as mock_post:
        
        # Mock image download and Pinata upload
        mock_get.return_value.content = b"test_image_data"
        mock_post.return_value.json.return_value = {"IpfsHash": "test_hash"}
        
        result = action.func(
            wallet=mock_wallet,
            prompt="test prompt",
            destination="0xdest",
            contract_address="0xexisting"
        )
        
        # Verify result
        assert "Successfully created" in result
        assert "0xexisting" in result
        assert "Deploy Transaction" not in result  # Should not contain deploy tx
        
        # Verify no contract deployment
        mock_wallet.deploy_nft.assert_not_called()
        
        # Verify NFT minting
        mock_wallet.invoke_contract.assert_called_once_with(
            contract_address="0xexisting",
            method="mint",
            args={"to": "0xdest", "quantity": "1"}
        )

def test_run_missing_collection_info(action, mock_wallet, mock_env_vars):
    """Test error handling when collection info is missing."""
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.data = [MagicMock(url="https://test.com/image.png")]
    mock_client.images.generate.return_value = mock_response

    with patch("cdp_agentkit_core.actions.dalle_nft.get_openai_client", return_value=mock_client), \
         pytest.raises(ValueError) as exc_info:
        action.func(
            wallet=mock_wallet,
            prompt="test prompt",
            destination="0xdest"
        )
    assert "collection_name and collection_symbol required" in str(exc_info.value)

def test_missing_env_vars():
    """Test error handling when environment variables are missing."""
    with pytest.raises(Exception) as exc_info:
        generate_dalle_image("test")
    assert "OPENAI_API_KEY" in str(exc_info.value)
