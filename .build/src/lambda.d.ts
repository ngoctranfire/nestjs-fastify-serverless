import { APIGatewayProxyResult } from 'aws-lambda';
import { FastifyInstance } from 'fastify';
export declare function bootstrap(): Promise<FastifyInstance>;
export declare const handler: (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>;
