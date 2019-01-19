import { InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';
import { HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as products from '../assets/products.json';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const p = products.default;
    return { products: p };
  }

  responseInterceptor(responseOptions: ResponseOptions): ResponseOptions {
    responseOptions.headers = responseOptions.headers.set('X-Response-From', 'InMemoryDb');
    return responseOptions;
  }

  put(): Observable<any> {
    return new Observable((success) => {
      const progressEvent = {} as HttpProgressEvent;
      progressEvent.type = HttpEventType.UploadProgress;
      progressEvent.total = 100;
      progressEvent.loaded = 0;

      setInterval(() => {
        if (progressEvent.loaded < progressEvent.total) {
          progressEvent.loaded += 1;
          success.next(progressEvent);
        } else {
          success.complete();
        }
      }, 10);
    });
  }
}