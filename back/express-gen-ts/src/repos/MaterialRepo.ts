import { getRandomInt } from '@src/util/misc';
import mongoose, { ObjectId } from "mongoose";
import Schemas from './Schemas';
import { IMaterial } from '@src/models/Material';
//import Artista from './ConciertoRepo';

const DB_URL: string = "mongodb://localhost:27017/PaginaExpo";

mongoose.connect(DB_URL);

const Material = mongoose.model('Material', Schemas.materialSchema);

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IMaterial | null> {
  return await Material.findOne({ id: id });
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const material = await Material.findOne({ id: id });
  return material != null;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IMaterial[]> {
  return await Material.find({});
}
async function getAllDias(): Promise<IMaterial[]> {
  const date = new Date();
  date.setDate(date.getDate()-7);
  return await Material.find({tirado: { $gte: date }});
}

/**
 * Add one user.
 */
async function add(material: IMaterial): Promise<any> {
  do{
    material.id = getRandomInt()
    const now = new Date();
    now.setHours(now.getHours() - 3);
    material.tirado = now;

  } while(await persists(material.id));
  const nuevoMaterial = new Material(material);
  return await nuevoMaterial.save();
}

/**
 * Update a user.
 */
async function update(material: IMaterial): Promise<any> {
  return await Material.findOneAndUpdate({ id: material.id }, material, { new: true });
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<any> {
  return await Material.findOneAndDelete({ id: id });
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  getAllDias,
  add,
  update,
  delete: delete_,
} as const;