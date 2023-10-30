import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SchedulingService } from 'src/app/models/service/scheduling.service';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss'],
})
export class LembretesPage implements OnInit {
  id = localStorage.getItem('id_client');

  schedulings: any = [];
  constructor(private modalCtrl: ModalController, private service: SchedulingService, private alertController: AlertController) {

  }




  fecharModal(): void {
    this.modalCtrl.dismiss();

  }
  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.schedulings = response;
      console.log(this.schedulings)

    });
  }
}
