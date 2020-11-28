import { HomeService } from './home.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public pessoas = new Array();
  public hasNext = false;
  public page = 1;

  constructor(private _homeService: HomeService) { }

  ngOnInit() {
    this._carregarPessoas();
  }

  private _carregarPessoas(page: number = 1): void {
    this._homeService.buscarPessoas(page).subscribe(res => {
      console.log(this.pessoas);
      console.log(res.items);
      this.pessoas = [...this.pessoas, ...res.items];
      this.hasNext = res.hasNext;
    });
  }

  doRefresh(event: any): void {
    console.log('Realizando refresh');
    this._carregarPessoas();
    event.target.complete();
  }

  public showMorePeoples(event: any): void {
    console.log("Buscando mais pessoas!");
    if (this.hasNext) {
      const page = this.page++;
      setTimeout(() => {
        this._carregarPessoas(page);
        event.target.complete();
      }, 1000);
    } else {
      event.target.disabled = true;
    }
  }

}
