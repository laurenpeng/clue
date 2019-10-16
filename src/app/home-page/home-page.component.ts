import { UserService } from './user.service';
import { GameService } from './game.service';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  message = "";
  gameTitle = "";
  games = [];

  constructor(private db: AngularFirestore, 
    public gameService: GameService, 
    public userService: UserService) {

    this.message = ""
    this.gameTitle = ""

    this.games = []
  }

  ngOnInit() {
    let messages = this.gameService.subscribeToMessages();
    messages.subscribe()
    this.userService.loadUser()

    let games = this.gameService.subscribeToGames();
    games.snapshotChanges()
    .pipe(
        map(change => {
          this.games = change.map(this.gameService.documentToDomainObject)
          console.log(this.games)
        })
    ).subscribe()
    
  }

  sendMessage() {
    this.gameService.addData(this.message)
  }

  createGame() {
    if (this.gameTitle === "") {
      alert("Please Enter a Name first")
      return;
    }
    this.gameService.createGame(this.gameTitle)
  }

  clickCell(x: number, y: number) {
    alert(`Clicked on ${x} - ${y}`)
  }

  joinGame(game) {
    console.log(game)
    this.gameService.joinGame(game)
  }
}
