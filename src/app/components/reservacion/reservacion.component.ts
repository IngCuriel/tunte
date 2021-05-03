import { Component, OnInit } from '@angular/core';
import { User } from '@core/model/user';
import { UserService } from '@core/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Reservacion } from '@core/model/reservacion'

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

  constructor(private userService:UserService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getResevacion();
  }
   getResevacion = async () => {
     this.user = new User();
     try {
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
       
       console.log('data', this.data)
     } catch (e) {
      console.log('response error reser', e)
      this.toastrService.warning(e.error,'Error')
     }
   }
}
