import { MessageService } from 'primeng/api';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.scss']
})
export class SingleCarComponent implements OnInit {
  images = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 6
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  data: any = null;
  constructor(private route: ActivatedRoute, private carService: CarService,private messageService:MessageService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const sellerId = this.route.snapshot.params['sellerId'];
    await this.getCarDetails(id);
  }
  async getCarDetails(id) {

    try {
      const res = await this.carService.getCarDetails(id);
      this.data = res;
    } catch (err) {
      if (Array.isArray(err.error.message)) {
        err.error.message.forEach(element => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    }

  }

}
