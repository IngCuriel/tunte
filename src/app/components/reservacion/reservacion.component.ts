import { Component, OnInit } from '@angular/core';
import { User } from '@core/model/user';
import { UserService } from '@core/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Reservacion } from '@core/model/reservacion'
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {
  user:User;
  data:Reservacion[] = [];
  displayedColumns: string[] = ['bookingId', 'cliente', 'bookingPrice', 'streetAddress', 'bookingTime'];
  dataSource: Reservacion[]=[];
  
  selectTipoFiltros;
  selectOrdenar;
   value = '';

  banderaBuscando :boolean = false;

  constructor(private userService:UserService,
              private toastrService:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')) {
      this.router.navigate(['/login'])
    }
    this.getResevacion();
  }
   getResevacion = async () => {
     this.user = new User();
     try {
       if(!this.selectTipoFiltros) {
        this.banderaBuscando = true;
        this.user.token = localStorage.getItem('token');
        this.user.emailAdmin = 'testapis@tuten.cl'
        this.user.email = 'contacto@tuten.cl'
        this.user.password  = '1234'
        const response =  await this.userService.getReservaciones(this.user).toPromise();
        this.data = response.map(reseva => {
         let newReserve = new Reservacion()
         newReserve.bookingId = reseva.bookingId
         newReserve.cliente = `${reseva.tutenUserClient.firstName} ${reseva.tutenUserClient.lastName}`
         newReserve.bookingPrice = reseva.bookingPrice
         newReserve.streetAddress = reseva.locationId.streetAddress
         newReserve.bookingTime = reseva.bookingTime;
           return  newReserve
        })
        this.dataSource = this.data;
       } else {
           if(this.value)  {
              if(this.selectOrdenar) {
                this.banderaBuscando = true;
                  this.dataSource =  this.data.filter(data=>{ 
                    if (this.selectOrdenar =='<='){
                      return data[this.selectTipoFiltros] <= Number(this.value)
                    }
                    if (this.selectOrdenar =='>='){
                      return data[this.selectTipoFiltros] >= Number(this.value)
                    }
                  });
                  this.banderaBuscando = false;
              } else {
                this.toastrService.warning('Select un tipo de filtro');
              }
           } else {
             this.toastrService.warning('Ingrese una cantidad para filtrar')
           }
       }
     } catch (e) {
      this.toastrService.warning('Necesita iniciar sesión','Error')
     } finally {
        this.banderaBuscando = false;
     }
   }
   limpiar = () => {
     this.selectTipoFiltros =null;
     this.selectOrdenar = null;
     this.value = '';
     this.getResevacion();
   }

   salir = ()=> {
     localStorage.removeItem('token')
     this.router.navigate(['/login'])
   }
}
