import { TestBed } from '@angular/core/testing';

import { HttpRequestFilterInterceptor } from './http-request-filter.interceptor';

describe('HttpRequestFilterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpRequestFilterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpRequestFilterInterceptor = TestBed.inject(HttpRequestFilterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
