import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SchedulingService } from 'src/app/models/service/scheduling.service';


@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  id = localStorage.getItem('id_client');

  schedulings: any = [];
  constructor(private modalCtrl: ModalController, private service: SchedulingService, private alertController: AlertController) {

  }




  cancelar() {

  }
  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.schedulings = response;
      console.log(this.schedulings)

    });
  }

  fecharModal(): void {
    this.modalCtrl.dismiss();


  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cancelamento de serviço',
      subHeader: 'Seu cancelamento foi feito com sucesso!',

      buttons: ['OK'],
    });

    await alert.present().then(modal => {
      this.fecharModal();

    });


  }

}
