import express from 'express';
import * as unitTypeController from '../controllers/unit-type.controller';

const router = express.Router();

router.get('/', unitTypeController.getUnitTypes);

router.get('/:id', unitTypeController.getUnitTypeById);

router.get('/name/:name', unitTypeController.getUnitTypeByName);

router.delete('/:id', unitTypeController.deleteUnitType);

router.patch('/', unitTypeController.updateUnitTypes);

export default router;

