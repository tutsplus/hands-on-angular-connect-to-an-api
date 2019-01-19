import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hands-on-http';
  public products: Array<any> = [];
  public productForm: FormGroup;
  public showForm: boolean;
  public uploadForm: FormGroup;
  public showUploadForm: boolean;
  public progressWidth: number;
  public uploadFile: File;

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ApiService
  ) {}

  public get currentYear(): number {
    return new Date().getFullYear();
  }

  public ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      stock: [''],
      price: ['']
    });

    this.uploadForm = this.fb.group({
      uploadFile: ['']
    });

    this.api.getData().subscribe(response => {
      this.products = response;
    });
  }

  public onSubmit(): void {
    this.api.postData(this.productForm.value).subscribe(response => {
      this.products.push(response.body);
      this.productForm.reset();
      this.showForm = false;

      console.log(response.headers.get('X-Response-From'));
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.uploadFile = file;
    }
  }

  public onSubmitUpload() {
    this.api.putData(this.uploadFile).subscribe(progress => {
      this.progressWidth = progress;
    });
  }
}
