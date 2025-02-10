from pydantic import BaseModel


class GetWalletDetailsSchema(BaseModel):
    """Input schema for getting wallet details."""

    # No additional fields needed as this action doesn't require any input parameters
    pass


class GetBalanceSchema(BaseModel):
    """Input schema for getting native currency balance."""

    # No additional fields needed as this action doesn't require any input parameters
    pass
