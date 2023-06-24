export interface Quotation{
    id: number;
    idclient: number;
    idconfigquot: number;
    idprop: number;
    period: number;
    frecuency: string;
    tax: number;
    amount: number;
    fee: number;
    initial: boolean;
    final: boolean;
}