"""Pytest configuration file for Superfluid tests."""
import pytest


class MockTransaction:
    """Mock transaction object."""
    def __init__(self, tx_hash="0x123456789abcdef"):
        self.tx_hash = tx_hash

    def wait_for_receipt(self):
        """Return a mock transaction receipt."""
        return type("MockReceipt", (), {"transaction_hash": self.tx_hash})()


class MockWalletProvider:
    """Mock wallet provider implementation."""
    def __init__(self, address="0xmockWalletAddress"):
        self.address = address
        self._should_fail = False
        self._error_message = "Contract error"

    def get_address(self):
        """Return the mock wallet address."""
        return self.address

    def send_transaction(self, contract_address, abi, method, args):
        """Mock sending a transaction."""
        if self._should_fail:
            raise Exception(self._error_message)
        return MockTransaction()

    def set_should_fail(self, should_fail=True, error_message="Contract error"):
        """Configure the mock to fail or succeed."""
        self._should_fail = should_fail
        self._error_message = error_message


@pytest.fixture
def wallet_provider_factory():
    """Create a mock wallet provider factory."""
    def _factory():
        return MockWalletProvider()
    return _factory 