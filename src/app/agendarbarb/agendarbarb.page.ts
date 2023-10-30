import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, NavParams, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { SchedulingService } from '../models/service/scheduling.service';
import { Router } from '@angular/router';
import { Scheduling } from '../models/interface/scheduling';

@Component({
  selector: 'app-agendarbarb',
  templateUrl: './agendarbarb.page.html',
  styleUrls: ['./agendarbarb.page.scss'],
})
export class AgendarbarbPage implements OnInit {

  datas;
  scheduling: Scheduling = {
    client_id: '',
    lesson_id: '',
    hora: '',
    date: '',
    confirmationCode: '',
  }

  constructor(private alertController: AlertController, private modalCtrl: ModalController, private toastCtrl: ToastController, private navParams: NavParams, private service: SchedulingService, private route: Router) {
    this.datas = this.navParams.get('curso')
  }

  ngOnInit() {
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }

  isWeekday = (dateString: string) => {
    // bloqueando os fins de semana do calendario
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();


    return utcDay !== 0 && utcDay !== 6;
  };
  send(form: NgForm) {
    let hora = form.value;
    let dataHoraString = hora.hora;
    // separando  a hora da data que estao vindo do formulario
    let dataString = dataHoraString.split("T")[0];


    //formatando a data
    let partes = dataString.split("-");

    //inserindo a data e a hora  no objeto de agendamento
    this.scheduling.date = partes[2] + "/" + partes[1] + "/2023";
    this.scheduling.hora = dataHoraString.split("T")[1];
    this.scheduling.lesson_id = this.datas.id;
    this.scheduling.confirmationCode = this.generateConfirmationCode(5);
    this.scheduling.client_id = localStorage.getItem('client_id');
    this.service.insert(this.scheduling).subscribe(response => {
    })
    this.presentAlert();


  }


  public generateConfirmationCode(length: number): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Agendamento Marcado',
      subHeader: 'Confira seu E-mail para comfirmar a data e o horário',

      buttons: ['OK'],
    });

    await alert.present().then(modal => {
      this.fecharModal();

    });


  }


}
