import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);   


  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',   

  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Sistema de gestión')
    .setDescription('Se vera las APIs de nuestro sistema')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('Documentación de Swagger está disponible en: http://localhost:2000/api');

  await app.listen(2000);
}
bootstrap();