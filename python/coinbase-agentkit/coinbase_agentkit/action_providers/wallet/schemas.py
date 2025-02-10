from pydantic import BaseModel


class GetWalletDetailsSchema(BaseModel):
    """Input schema for getting wallet details."""

    pass


class GetBalanceSchema(BaseModel):
    """Input schema for getting native currency balance."""

    pass
