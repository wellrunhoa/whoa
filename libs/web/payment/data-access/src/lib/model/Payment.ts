export interface Payment {
    amount: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    accountHolderFirstName: string;
    accountHolderLastName: string;
    accountHolderAddress: string;
    accountHolderCity: string;
    accountHolderState: string;
    accountHolderZip: string;
}