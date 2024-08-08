import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../common/Paths';
import Material from '@src/models/Material';
import MaterialRoutes from './MaterialRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const materialRouter = Router();

// Get all users
materialRouter.get(
  Paths.Materiales.Get,
  MaterialRoutes.getAll,
);

materialRouter.get(
  Paths.Materiales.GetAllDays,
  MaterialRoutes.getAllDias,
);

// Add one user
materialRouter.post(
  Paths.Materiales.Add,
  validate(['material', Material.isMaterial]),
  MaterialRoutes.add,
);

// Update one user
materialRouter.put(
  Paths.Materiales.Update,
  validate(['material', Material.isMaterial]),
  MaterialRoutes.update,
);

// Delete one user
materialRouter.delete(
  Paths.Materiales.Delete,
  validate(['id', 'number', 'params']),
  MaterialRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Materiales.Base, materialRouter);


// **** Export default **** //

export default apiRouter;
