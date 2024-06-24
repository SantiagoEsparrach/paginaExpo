import HttpStatusCodes from '@src/common/HttpStatusCodes';

import MaterialService from '@src/services/MaterialService';
import { IMaterial } from '@src/models/Material';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const materiales = await MaterialService.getAll();
  return res.status(HttpStatusCodes.OK).json({ materiales });
}

/**
 * Add one user.
 */
async function add(req: IReq<{material: IMaterial}>, res: IRes) {
  const { material } = req.body;
  await MaterialService.addOne(material);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{material: IMaterial}>, res: IRes) {
  const { material } = req.body;
  await MaterialService.updateOne(material);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await MaterialService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
