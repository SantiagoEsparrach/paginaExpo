import Material, { IMaterial } from '@src/models/Material';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IMaterial | null> {
  const db = await orm.openDb();
  for (const material of db.materiales) {
    if (material.id === id) {
      return material;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.materiales) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IMaterial[]> {
  const db = await orm.openDb();
  return db.materiales;
}

/**
 * Add one user.
 */
async function add(material: IMaterial): Promise<void> {
  const db = await orm.openDb();
  material.id = getRandomInt();
  db.materiales.push(material);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(material: IMaterial): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.materiales.length; i++) {
    if (db.materiales[i].id === material.id) {
      const dbMaterial = db.materiales[i];
      db.materiales[i] = {
        ...dbMaterial,
        nombre: material.nombre
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.materiales.length; i++) {
    if (db.materiales[i].id === id) {
      db.materiales.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
