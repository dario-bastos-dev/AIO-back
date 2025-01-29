import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	// Cria a aplicação Nest
	const app = await NestFactory.create(AppModule);

	// Configuração do Swagger para documentação da API
	const config = new DocumentBuilder()
		.setTitle('All In One - AIO')
		.setDescription('The API of All In One - AIO')
		.setVersion('1.0')
		.build();

	// Cria o documento Swagger
	const document = SwaggerModule.createDocument(app, config);
	// Configura o endpoint do Swagger
	SwaggerModule.setup('api', app, document);

	// Inicia a aplicação na porta especificada
	await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
