"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.bootstrap = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const aws_serverless_fastify_1 = require("aws-serverless-fastify");
const fastify_1 = require("fastify");
const binaryMimeTypes = [];
async function bootstrap() {
    const instance = (0, fastify_1.fastify)({
        logger: false,
    });
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(instance));
    nestApp.setGlobalPrefix('api/v1/');
    nestApp.enableCors();
    await nestApp.init();
    return instance;
}
exports.bootstrap = bootstrap;
let fastifyServer;
const handler = async (event, context) => {
    if (!fastifyServer) {
        fastifyServer = await bootstrap();
    }
    return await (0, aws_serverless_fastify_1.proxy)(fastifyServer, event, context);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map