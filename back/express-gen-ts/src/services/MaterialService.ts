import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import MaterialRepo from '@src/repos/MaterialRepo';
import { IMaterial } from '@src/models/Material';
import { get } from 'http';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IMaterial[]> {
  return MaterialRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(material: IMaterial): Promise<void> {
  return MaterialRepo.add(material);
}
function getAllDias(): Promise<IMaterial[]> {
  return MaterialRepo.getAllDias();
}
/**
 * Update one user.
 */
async function updateOne(material: IMaterial): Promise<void> {
  const persists = await MaterialRepo.persists(material.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return MaterialRepo.update(material);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await MaterialRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return MaterialRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  getAllDias,
  updateOne,
  delete: _delete,
} as const;
