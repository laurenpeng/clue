import { UserService } from './user.service';
import { GameService } from './game.service';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  text = "";
    
  constructor(private db: AngularFirestore, 
    public gameService: GameService, 
    public userService: UserService) {

    this.text = ""
  }

  ngOnInit() {

    // this.customers = this.db.collection('customers').valueChanges({ idField: 'id' });

    let x = this.gameService.subscribeTo();
    console.log("sub",x)

    x.subscribe()

    this.userService.loadUser()
  }

  add() {
    this.gameService.addData(this.text)
  }

  createGame(name: string) {
    this.gameService.createGame(name)
  }


}
