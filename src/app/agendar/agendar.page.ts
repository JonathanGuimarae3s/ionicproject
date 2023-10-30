import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LessonService } from '../models/service/lesson.service';
import { AgendarbarbPage } from '../agendarbarb/agendarbarb.page';
@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit {
  id = localStorage.getItem('client_id');
  cursos: any = [];

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();


    return utcDay !== 0 && utcDay !== 6;
  };

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private alertController: AlertController, private lesson: LessonService) { }

  ngOnInit() {
    this.lesson.getLesson().subscribe(response => {
      this.cursos = response;
      console.log(this.cursos)
    })

  }
  agendar(curso: any) {
      this.modalCtrl.create({
        componentProps: { "curso": curso },
        component: AgendarbarbPage
      }).then(modal => {
        modal.present();
      }
      )
   

  }

  fecharModal(): void {
    this.modalCtrl.dismiss();

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


