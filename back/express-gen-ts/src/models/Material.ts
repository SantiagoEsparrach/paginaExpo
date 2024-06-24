import moment from 'moment';
import { Material } from './Materiales';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';
  
// **** Types **** //

export interface IMaterial {
  id: number;
  nombre: Material;
  tirado: Date;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  nombre?: Material,
  tirado?: Date,
  id?: number, // id last cause usually set by db
): IMaterial {
  return {
    id: (id ?? -1),
    nombre: (nombre ?? Material.Otro),
    tirado: (tirado ? new Date(tirado) : new Date()),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IMaterial {
  if (!isMaterial(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IMaterial;
  return new_(p.nombre, p.tirado, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isMaterial(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'nombre' in arg && Object.values(Material).includes((arg as any).nombre) &&
    'tirado' in arg && moment(arg.tirado as string | Date).isValid()
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isMaterial,
} as const;
