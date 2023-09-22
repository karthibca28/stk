import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationDataSubject = new BehaviorSubject<{ latitude: number; longitude: number }>(null);

  setLocationData(latitude: number, longitude: number): void {
    const locationData = { latitude, longitude };
    this.locationDataSubject.next(locationData);
  }

  getLocationData(): BehaviorSubject<{ latitude: number; longitude: number }> {
    return this.locationDataSubject;
  }
}
