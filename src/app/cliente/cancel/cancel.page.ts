import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SchedulingService } from 'src/app/models/service/scheduling.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.page.html',
  styleUrls: ['./cancel.page.scss'],
})
export class CancelPage implements OnInit {
  id = localStorage.getItem('id_client');

  schedulings: any = [];
  constructor(private modalCtrl: ModalController, private service: SchedulingService) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.schedulings = response;
      console.log(this.schedulings)

    });
  }

  fecharModal(): void {
    this.modalCtrl.dismiss();

  }
}
