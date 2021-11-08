export interface Payment {
    paymentType:string;
    amount: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
    cardNumber: string;
    expDate: string;
    cardCode: string;
    cardType: string;
    accountHolderFirstName: string;
    accountHolderLastName: string;
    accountHolderAddress: string;
    accountHolderCity: string;
    accountHolderState: string;
    accountHolderZip: string;
    paymentId: string;
    paymentDay: string;
    paymentSubmittedDate: string
}