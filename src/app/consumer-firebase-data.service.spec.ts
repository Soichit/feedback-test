/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ConsumerFirebaseDataService } from './consumer-firebase-data.service';

describe('ConsumerFirebaseData Service', () => {
  beforeEachProviders(() => [ConsumerFirebaseDataService]);

  it('should ...',
      inject([ConsumerFirebaseDataService], (service: ConsumerFirebaseDataService) => {
    expect(service).toBeTruthy();
  }));
});
