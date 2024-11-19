import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage }from '@angular/fire/compat/storage';
// import { uploadString, getDownloadURL, ref, deleteObject, getStorage } from '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);
  // Autenticación
  getAuth(){
    return getAuth();
  }

  // Acceder

  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crear usuario
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Modificar usuario
  updateUser(user: User){
    return updateProfile(getAuth().currentUser, {displayName: user.name});
  }

  // Enviar email de recuperación de contraseña
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Cerrar sesión
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  // Obtener documentos
  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path );
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }

  // Base de datos
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path ), data);
  }

  // Actualizar documento
  updateDocument(path: string, data: any){
    return updateDoc(doc(getFirestore(), path ), data);
  }

  // Eliminar documento
  deleteDocument(path: string){
    return deleteDoc(doc(getFirestore(), path ));
  }

  // Obtener documento
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path ))).data();
  }

  // Agregar documento
  addDocument(path: string, data: any){
    return addDoc(collection(getFirestore(), path ), data);
  }

  // Almacenamiento

  // ! No puedo utilizar imagenes ya que en Firebase el apartado de 'Storage' el cual sirve para subir las fotos es de pago

  // async uploadImage(path: string, data_url: string){
  //   return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
  //     return getDownloadURL(ref(getStorage(), path));
  //   });
  // }

  // async getFilePath(url: string){
  //   return ref(getStorage(), url).fullPath;
  // }

  // deleteFile(path: string){
  //   return deleteObject(ref(getStorage(), path));
  // }
}
