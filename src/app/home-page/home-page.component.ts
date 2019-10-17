import { AngularFireAuth } from '@angular/fire/auth';
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
  currentlyInGame = false;
  user = ""
  banner = ""
  game = null
  currentPlayer = ""

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    public gameService: GameService,
    public userService: UserService) {

    this.message = ""
    this.gameTitle = ""
    this.game = null
    this.games = []
    this.currentlyInGame = false
    this.banner = ""

    this.afAuth.user.subscribe((user) => {
      this.user = user.email
    })
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
          let gamesIn = this.games.filter((game) => {
            return game.players.filter((player) => {
              return player === this.user;
            }).length !== 0
          });
          if (gamesIn.length == 0) {
            this.currentlyInGame = false
          } else {
            this.currentlyInGame = true;
            this.game = gamesIn[0]
            this.currentPlayer = this.game.players[this.game.turn]
          }
          console.log(this.games)
          console.log(this.currentlyInGame)
        })
      ).subscribe()

  }

  sendMessage() {
    this.gameService.addData(this.message)
  }

  createGame() {
    if (this.gameTitle === "") {
      this.banner = "Please Enter a Name first"
      return;
    }
    this.banner = "Game Created!"
    this.gameService.createGame(this.gameTitle)
  }

  clickCell(x: number, y: number) {
    if (this.currentlyInGame) {
      if (this.isMyTurn()) {
        this.banner = `Made your move on cell ${x} ${y}`
        this.gameService.nextTurn(this.game);
      } else {
        this.banner = `Not your turn`
      }
    } else {
      this.banner = `Not in a game but clicked on cell ${x} ${y}`
    }
  }

  joinGame(game) {
    if (this.currentlyInGame) {
      this.banner = "Can't Join the game, already in a game"
      return
    }
    this.gameService.joinGame(game)
  }

  closeGame(game) {
    this.banner = "Just closed the game"
    this.gameService.closeGame(game);
  }

  isMyTurn() {
    return this.game.players[this.game.turn] === this.user;
  }
}
