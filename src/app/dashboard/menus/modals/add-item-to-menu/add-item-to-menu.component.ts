import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, mergeMap, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { Location } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { MenuService } from '../../menu-details/menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-to-menu',
  templateUrl: './add-item-to-menu.component.html',
  styleUrls: ['./add-item-to-menu.component.scss']
})
export class AddItemToMenuComponent implements OnInit, AfterViewInit {
  private _unsubscribeAll!: Subject<any>;
  fileName!: string;
  uploadProgress!: any;
  uploadSub!: Subscription | null;
  product!: Product;
  pageType!: string;
  productForm!: FormGroup;
  productId!: string;
  isLoading: boolean = false;

  constructor(
    private productService: ProductService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private menusService: MenuService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.pageType = data.pageType;
    if (this.pageType == 'new') {
      this.product = new Product();
      this.product.menu = this.data.menuId;
      this.product.store = this.data.storeId;
    } else {
     this.data.product as Product
      this.product = new Product(this.data.product);
      this.product.menu = this.data.menuId;
      this.product.store = this.data.storeId;
    }
  }

  ngOnInit(): void {
    this.productForm = this.createProductForm();
    this.product.options.forEach((data: any, i: number) => {
      this.addOption(data);
    })
  }

  ngAfterViewInit(): void {
    if (this.pageType == 'new') {
      this.data.product.options.forEach((data: Product, i:number) => {
        this.addOption(data);
      })
    }
  }


  createProductForm(): FormGroup {
    return this._formBuilder.group({
      _id: [this.product._id],
      name: [this.product.name, Validators.required],
      menu: [this.product.menu],
      store: [this.product.store],
      description: [this.product.description, Validators.required],
      photos: [this.product.photos],
      quantity: [this.product.quantity],
      price: [this.product.price, Validators.required],
      active: [this.product.active],
      options: this._formBuilder.array([])
    });
  }

  newOptions(data?: any): FormGroup {
    return this._formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      mandatory: [data ? data.mandatory : false, Validators.required],
      selectedType: [data ? data.selectedType : '', Validators.required],
      options: this._formBuilder.array(data ? data.options.map((p: any) => this.newSubOptions(p)) : [])
    })
  }

  newSubOptions(data?: any): FormGroup {
    return this._formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      price: [data ? data.price : 0, Validators.required],
    })
  }

  get options(): FormArray | any {
    return this.productForm.get("options") as FormArray
  }

  addOption(data?: any) {
    this.options.push(this.newOptions(data));
  }

  addSubOption(data?: any) {
    <FormArray>data.push(this.newSubOptions(data))
  }

  removeOptions(index: number) {
    this.options.removeAt(index);
  }

  removeSubOptions(data: any, index: number) {
    data.removeAt(index)
  }

  onFileSelected(event: any) {
    const file: File = event.target.files;
    for (var i = 0; i < event.target.files.length; i++) {
      if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("files", event.target.files[i]);

        const upload$ = this.productService.uploadPhoto(formData, this.product._id)
          .pipe(
            finalize(() => this.reset())
          );

        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          } else if (event.hasOwnProperty('body')) {
            this.product.photos.push(event.body.photos[0])
          }
        })
      }
    }
  }

  saveProduct(): void {
    this.isLoading = true;
    if (this.pageType == 'new') {
      const data = this.productForm.getRawValue();
    this.productService.addProduct(data).pipe(
      mergeMap((val) => this.menusService.addFoodToMenu(val._id, this.data.menuId))
    ).subscribe((data) => {
      this.isLoading = false;
        this.dialogRef.close(data)
        // Trigger the subscription with new data
        // Show the success message
        this._matSnackBar.open('Product saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        
      });
    } else {
    const data = this.productForm.getRawValue();
    this.productService.saveProduct(data, this.data.product._id).subscribe((data) => {
      this.isLoading = false;
        this.dialogRef.close('data')
        this._matSnackBar.open('Product saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        
      });
    }
  }

  deleteImages(index:number) {
    this.product.photos.splice(index, 1)
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
