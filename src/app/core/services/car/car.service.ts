import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';

export interface ICar {
  fullName: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  public saveCar(contact: ICar): Promise<void> {
    return set(ref(getDatabase(), 'cars/' + contact.phoneNumber), {
      fullName: contact.fullName,
      phoneNumber: contact.phoneNumber,
    });
  }

  public getAllCar(): Promise<ICar[]> {
    return new Promise((resolve, reject) => {
      const contactsRef = ref(getDatabase(), 'cars/');
      onValue(contactsRef, (snapshot) => {
        const data = snapshot.val();
        const contacts: ICar[] = [];
        Object.entries(data).forEach((value) => {
          contacts.push(value[1] as ICar);
        });
        resolve(contacts);
      });
    });
  }
}
