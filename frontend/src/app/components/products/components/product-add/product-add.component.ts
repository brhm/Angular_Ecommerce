import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { CategoryModel } from '../../../categories/models/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{
  categories: CategoryModel[]=[];
  images: File[]=[];
  imagesUrls:any[]=[];

  constructor(
    private _category:CategoryService,
    private _product:ProductService,
    private _toastr: ToastrService,
    private _router: Router

  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._category.getAll(res=>this.categories=res);
  }

  getImages(event:any){
    const file:File[]=Array.from(event.target.files);
    this.images.push(...file);

    for(let i=0;i<event.target.files.length;i++){
      const element=event.target.files[i];

      const reader = new FileReader();
      reader.readAsDataURL(element);

      reader.onload=()=>{
        const imageUrl=reader.result as string;
        this.addImage(imageUrl, file);
      }
    }
  }
  addImage(imageUrl:string,file:any){
    this.imagesUrls.push({imageUrl:imageUrl,name:file.name,size:file.size})
  }
  add(form:NgForm){
    if(form.value["categoriesSelect"].length==0)
    {
      this._toastr.error("You must select categories");
      return;
    }
    if(form.valid){
      let product= form.value;
      let categories: string[]=product["categoriesSelect"];
      let name = product["name"];
      let price=product["price"];
      let stock=product["stock"];
      price=price.toString().replace(",",".");
      let formData = new FormData();
      formData.append("name",name);
      formData.append("price",price);
      formData.append("stock",stock);
      for (const category of categories) {
        formData.append("categories",category);
      }
      for(const image of this.images){
        formData.append("images",image,image.name);
      }

      this._product.add(formData,res=>{
        this._toastr.success(res.message);
        form.reset();
        this.imagesUrls=[];
      })

    }
  }
  removeImage(name:string,size:number,index:number){
    this.imagesUrls.splice(index,1);
    let i = this.images.findIndex(p=>p.name==name&&p.size==size);
    this.images.splice(i,1);
  }

}
