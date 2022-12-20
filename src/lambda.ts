import {
    Context,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { proxy } from 'aws-serverless-fastify';
import { fastify, FastifyInstance } from 'fastify';
// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

export async function bootstrap(): Promise<FastifyInstance> {
    const instance: FastifyInstance = fastify({
        logger: false,
    });

    const nestApp = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(instance),
    );
    nestApp.setGlobalPrefix('api/v1/');
    nestApp.enableCors();
    await nestApp.init();
    return instance;
}

let fastifyServer: FastifyInstance;
export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
): Promise<APIGatewayProxyResult> => {
    if (!fastifyServer) {
        fastifyServer = await bootstrap();
    }
    return await proxy(fastifyServer, event, context);
};
