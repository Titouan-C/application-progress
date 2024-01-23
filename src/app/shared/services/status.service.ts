import { Injectable } from '@angular/core';
import { Status } from '../models/status.model';
import { Observable, liveQuery } from 'dexie';
import { db } from '../indexed-db';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  statusList: Observable<Array<Status>> = liveQuery(
    () => this.listAllStatus()
  );

  private async listAllStatus(): Promise<Array<Status>> {
    return await db.status.toArray();
  }

  getAllStatus(): Observable<Array<Status>> {
    return this.statusList;
  }

  async addStatus(statusName: string) {
    try {
      const length = (await this.listAllStatus()).length || -1;
      if (length > 0) {
        await db.status.add(new Status(length + 1, statusName));
      } else {
        throw Error("Erreur lors de la récupération de la liste des statuts");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async updateStatus(status: Status) {
    if (status.id) {
      await db.status.update(status.id, { ...status });
    } else {
      throw Error("L'identifiant du statut est inconnue");
    }
  }
}
