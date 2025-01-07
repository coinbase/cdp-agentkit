class ProcessBlock:
    def __init__(self, transactions):
        self.transactions = transactions

    def process_transactions(self):
        for tx in self.transactions:
            if tx['from'] == "paytr-wallet" or tx['to'] == "paytr-wallet":
                self.handle_paytr_wallet_transaction(tx)
            else:
                self.process_transaction(tx)

    def handle_paytr_wallet_transaction(self, tx):
        # Handle transactions involving the paytr-wallet
        pass

    def process_transaction(self, tx):
        # Process the transaction
        pass

    def eval(self, tx):
        if tx['from'] == "paytr-wallet" or tx['to'] == "paytr-wallet":
            self.handle_paytr_wallet_transaction(tx)
        else:
            self.process_transaction(tx)
