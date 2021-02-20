import { TestBed } from '@angular/core/testing';

import { FlowerFomularService } from './flower-fomular.service';

describe('FlowerFomularService', () => {
  let service: FlowerFomularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowerFomularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
