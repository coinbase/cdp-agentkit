from pydantic import BaseModel


class GetWalletDetailsInput(BaseModel):
    """Input schema for getting wallet details."""

    # No additional fields needed as this action doesn't require any input parameters
    pass


class GetBalanceInput(BaseModel):
    """Input schema for getting native currency balance."""

    # No additional fields needed as this action doesn't require any input parameters
    pass
