from unittest.mock import MagicMock

import pytest


@pytest.fixture
def wallet_provider_factory():
    """Create a mock wallet provider factory."""
    def _factory():
        mock_wallet_provider = MagicMock()
        mock_wallet_provider.get_address.return_value = "0xmockWalletAddress"
        return mock_wallet_provider
    return _factory
