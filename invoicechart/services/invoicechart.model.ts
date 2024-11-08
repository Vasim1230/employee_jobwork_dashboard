export interface Invoice {
    docType: string;
    docId: string;
    invoiceNo: string;
    invoiceDate: string;
    name: string;
    address: string;
    state: string;
    district: string;
    city: string;
    postalCode: string;
    contactPerson: string;
    email: string;
    phone: number;
    customerGstNumber: string;
    dueDate: string;
    totalAmount: string;
    totalQuantity: number;
    subTotal: number;
    totalDiscount: number;
    shipping: number;
    totalGst: number;
    igst: number;
    cgst: number;
    sgst: number;
    adjustment: number;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    reference: string;
    source: string;
    userId: string;
    cid: string;
    status: string; 
    paid: boolean;
  }
  export interface InvoiceResponse {
    invoicechart: Invoice[]; 
  }
  