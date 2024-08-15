import { Observable } from 'rxjs';
import { Collection, ObjectId, InsertOneResult } from 'mongodb';
import { IMaterial } from '@src/models/Material';

// Returns an Observable which emits when the Object has been inserted
export function insertOneObs(object: IMaterial, collection: Collection<IMaterial>): Observable<ObjectId> {
    return new Observable((observer) => {
        collection.insertOne(object)
            .then((result: InsertOneResult<IMaterial>) => {
                if (result.insertedId) {
                    observer.next(result.insertedId);
                    observer.complete();
                } else {
                    observer.error(new Error('Error al insertar el material'));
                }
            })
            .catch((err) => {
                observer.error(err);
            });
    });
}
