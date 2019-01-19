import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse, HttpProgressEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getData(): Observable<any> {
    const opts = {
      headers: new HttpHeaders({
        'X-Requested-With': 'HttpClient'
      })
    };
    return this.http.get('api/products', opts);
  }

  public postData(newProduct: any): Observable<any> {
    return this.http.post('api/products', newProduct, {
      observe: 'response'
    });
  }

  public putData(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return new Observable((success) => {
      const req = new HttpRequest('PUT', 'api/upload', formData, {
        reportProgress: true
      });

      this.http.request(req).subscribe((event: HttpProgressEvent) => {
        if (event.type === HttpEventType.UploadProgress) {
          success.next(event.loaded);
        } else if (event instanceof HttpResponse) {
          success.complete();
        }
      })
    });
  }
}
