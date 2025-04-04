import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../common/services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule,CategoryPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories:CategoryModel[]=[];
  updateCategory:CategoryModel=new CategoryModel();
  search: string="";
  constructor(
    private _toastr:ToastrService,
    private _category:CategoryService,
    private _swal:SwalService

  ){}

  ngOnInit():void{
    this.getAll();
  }
  getAll(){
    this._category.getAll(res=>this.categories=res);
  }
  get(model:CategoryModel)
  {
    this.updateCategory={...model};
  }
  add(form:NgForm)
  {
      if(form.valid)
      {
        this._category.add(form.controls["name"].value,res=>{
          this._toastr.success(res.message);
          let element=document.getElementById("addModelCloseBtn");
          element?.click();
          form.reset();
          this.getAll();
        })
      }
  }
  update(form:NgForm){
    if(form.valid){
      this._category.update(this.updateCategory,res=>{
        this._toastr.warning(res.message);
        this.getAll();
        let element=document.getElementById("updateModelCloseBtn");
        element?.click();
      })
    }
  }

  removeById(model:CategoryModel){
    this._swal.callSwal(`Do you want to delete ${model.name} category?`,"","Delete",()=>{
      this._category.removeById(model._id,res=>{
        this._toastr.info(res.message);
        this.getAll()
      })
    });
  }
}
