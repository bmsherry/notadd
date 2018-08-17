import { FastifyAdapter, NestFactory } from "@nestjs/core";
import { GraphQLFactory } from "@nestjs/graphql";
import * as bodyParser from "body-parser";
import { fastifyGraphiQL, fastifyGraphQL } from "fastify-graphql-middleware";
import { join } from 'path';

import { AppModule } from "./app.module";
import { graphqlConfig } from "./configurations";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  if (graphqlConfig.ide.enable) {
    app.use(
      graphqlConfig.ide.prefix,
      fastifyGraphiQL({ endpointURL: graphqlConfig.ide.endpointURL })
    );
  }

  app.use("/graphql", bodyParser.json());

  const graphQLFactory = app.get(GraphQLFactory);
  const typeDefs = graphQLFactory.mergeTypesByPaths(graphqlConfig.typeDefsPath);
  const schema = graphQLFactory.createSchema({ typeDefs });
  app.use("/graphql", fastifyGraphQL(req => ({ schema, rootValue: req })));

  app.useStaticAssets({
    root: join(__dirname, "/public"),
    prefix: "/public/"
  });
  app.setViewEngine({
    engine: {
      handlebars: require("handlebars")
    },
    templates: join(__dirname, "/views")
  });
  await app.listen(3000);
}

bootstrap();
