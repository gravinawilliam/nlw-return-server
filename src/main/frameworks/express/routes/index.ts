import { Router } from 'express';

import feedbacks from './feedbacks.route';

const routes = Router();

routes.use('/feedbacks', feedbacks);

export default routes;
