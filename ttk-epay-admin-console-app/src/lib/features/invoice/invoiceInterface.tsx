export interface InvoiceResponse {
  ITEMS: Invoice[],
  CURRENTPAGE: number,
  TOTALPAGES: number
}

export interface Invoice {
  ID: number;
  INVOICE_NUMBER: number;
  ORDER_ID: string;
  INVOICE_DATE: string ; 
  INVOICE_TYPE_CODE: string ;
  NET_AMOUNT: number;
  INVOICE_TVA: number ;
  AMOUNT_TVA: number;
  AMOUNT_TTC: number 
  INVOICE_STATE_CODE: string;
  ORDER_NAME: string ;
  CLIENT_CODE: number ;
  CLIENT_NAME: string;
  CLIENT_NRC: string;
  CLIENT_ADDRESS: string;
  CLIENT_MAIL: string;
  CLIENT_IDF: string;
  PRODUCT_NAME: string 
  IS_PAID: boolean;
}