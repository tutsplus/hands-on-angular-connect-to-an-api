import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    private readonly fb: FormBuilder,
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
  }

  public onSubmit(): void {
  }
}
