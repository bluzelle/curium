import grpc from 'grpc';
import services from './codec/crud/query_grpc_pb';
import {QueryAllCrudValueRequest} from "./codec/crud/query_pb";

const client = new services.QueryClient('localhost:9090', grpc.credentials.createInsecure());
const v = new QueryAllCrudValueRequest()
    .setUuid('uuid')
client.crudValueAll(v, (a: any, b: any) => console.log(b.toObject()));



