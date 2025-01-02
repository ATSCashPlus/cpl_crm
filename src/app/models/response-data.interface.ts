export interface IResponseData <DataType>{
    code: string;
    error: string;
    data: DataType;
}