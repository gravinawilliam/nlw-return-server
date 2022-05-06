import { Router } from 'express';

import { adapterRoute } from '@main/adapters/express-router';
import { makeCreateFeedbacksController } from '@main/factories/application/controllers/feedbacks/create-user-controller.factory';

const router = Router();

router.post('/create', adapterRoute(makeCreateFeedbacksController()));

export default router;
