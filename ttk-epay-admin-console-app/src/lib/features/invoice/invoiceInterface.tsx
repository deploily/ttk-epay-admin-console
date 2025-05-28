

export interface Invoice {
  ID: number;
  INVOICE_NUMBER: number;
  ORDER_ID: string;
  INVOICE_DATE: string | null; 
  INVOICE_TYPE_CODE: string | null;
  NET_AMOUNT: number;
  INVOICE_TVA: number | null;
  AMOUNT_TVA: number | null;
  AMOUNT_TTC: number | null;
  INVOICE_STATE_CODE: string;
  ORDER_NAME: string | null;
  CLIENT_CODE: number | null;
  CLIENT_NAME: string;
  CLIENT_NRC: string;
  CLIENT_ADDRESS: string;
  CLIENT_MAIL: string;
  CLIENT_IDF: string;
  PRODUCT_NAME: string | null;
  IS_PAID: boolean;
}