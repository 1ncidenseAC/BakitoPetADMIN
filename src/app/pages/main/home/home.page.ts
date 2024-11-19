import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // ! No puedo utilizar imagenes ya que en Firebase el apartado de 'Storage' el cual sirve para subir las fotos es de pago

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  products: Product[] = [];

  ngOnInit() {
  }

  // Cerrar sesion
  // signOut(){
  //   this.firebaseSvc.signOut();
  // }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user', this.user);
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  // Obtener productos
  getProducts(){
    let path = `users/${this.user().uid}/products`;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.products = res;
        console.log(res);
        sub.unsubscribe();
      }
    });
  }

  // Agregar o modificar producto
  async addUpdateProduct(product?: Product){
    let success = await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product: product}
    })
    if(success) this.getProducts();
  }

  async confirmDeleteProduct(product: Product){ {
    this.utilsSvc.presentAlert({
      header: 'Cuidado!',
      message: '¿Quieres eliminar este producto?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProduct(product);
          }
        }
      ]
    });
  }}

  // Eliminar producto
  async deleteProduct(product: Product){
    let path = `users/${this.user().uid}/products/${product.id}`
      const loading = await this.utilsSvc.loading();
      await loading.present();
      // let imagePath = await this.firebaseSvc.getFilePath(product.image);
      // await this.firebaseSvc.deleteFile(imagePath);
      this.firebaseSvc.deleteDocument(path).then(async res => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.utilsSvc.presentToast({
          message: 'Producto eliminado exitosamente',
          duration: 2000,
          color: 'success',
          position: 'middle',
          icon: 'bag-check'
        })
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message:error.message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      })
  }
}
