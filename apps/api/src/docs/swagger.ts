import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

export const swaggerDocs = Router();

swaggerDocs.use('/', swaggerUi.serve);
swaggerDocs.get('/', swaggerUi.setup(swaggerDocument));

swaggerDocs.get('.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});
