import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuController, NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AgendamentosPage } from '../cliente/agendamentos/agendamentos.page';
import { CancelPage } from '../cliente/cancel/cancel.page';
import { LembretesPage } from '../cliente/lembretes/lembretes.page';
import { NvcPage } from '../cliente/nvc/nvc.page';
import { CadastroPage } from '../cadastro/cadastro.page';
import { LoginPage } from '../login/login.page';
import { ClientService } from '../models/service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  client: any;
  item: any;
  url: any;
  msg: any;
  constructor(private domSanitizer: DomSanitizer, private menuCtrl: MenuController, private navCtrl: NavController, private modalCtrl: ModalController, private service: ClientService, private route: ActivatedRoute, private router: Router) {
    this.msg = this.route.snapshot.paramMap.get('msg') ? '' : this.route.snapshot.paramMap.get('msg');

  }
  sair() {
    localStorage.removeItem('client_id');
    this.router.navigate(['/tabs/tab1']);
  }
  ngOnInit(): void {
    this.item = localStorage.getItem('client_id');

    if (this.item) {
      this.service.getUser(this.item).subscribe(response => {
        this.client = response;
      })
    }
  }

  cadastro() {
    this.modalCtrl.create({

      component: CadastroPage
    }).then(modal => {
      modal.present();
    }
    )
  }
  logar() {
    this.modalCtrl.create({

      component: LoginPage
    }).then(modal => {
      modal.present();
    }
    )
  }
  Agendamen() {
    this.modalCtrl.create({

      component: AgendamentosPage
    }).then(modal => {
      modal.present();
    }
    )

  }

  Novocu() {
    this.modalCtrl.create({

      component: NvcPage
    }).then(modal => {
      modal.present();
    }
    )

  }

  Cancel() {
    this.modalCtrl.create({

      component: CancelPage
    }).then(modal => {
      modal.present();
    }
    )

  }

  Lembre() {
    this.modalCtrl.create({

      component: LembretesPage
    }).then(modal => {
      modal.present();
    }
    )

  }
  fecharModal(): void {
    this.modalCtrl.dismiss();

  }

}



