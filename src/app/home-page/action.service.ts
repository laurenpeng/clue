import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import './constants';

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    user = null 

    constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
       
        this.afAuth.user.subscribe((user) => {
            console.log("This email is logged in", user.email)
            this.user = user.email
        })
        
    }

    possibleMoves(currentRoom) {
        switch(currentRoom) {
            case STUDY: 
                return [HALL_A, HALL_C, KITCHEN]
            case HALL:
                return [HALL_A, HALL_B, HALL_D]
            case LOUNGE:
                return [HALL_B, CONSERVATORY, HALL_E]
            case LIBRARY:
                return [HALL_C, HALL_F, HALL_H]
            case BILLARD:
                return [HALL_D, HALL_F, HALL_G, HALL_I]
            case DINING:
                return [HALL_E, HALL_G, HALL_J]
            case CONSERVATORY:
                return [HALL_H, HALL_K, LOUNGE]
            case BALL_ROOM:
                return [HALL_I, HALL_K, HALL_L]
            case KITCHEN:
                return [HALL_J, HALL_L, STUDY]
            case HALL_A:
                return [STUDY, HALL]
            case HALL_B:
                return [HALL, LOUNGE]
            case HALL_C:
                return [STUDY, LIBRARY]
            case HALL_D:
                return [HALL, BILLARD]
            case HALL_E:
                return [LOUNGE, DINING]
            case HALL_F:
                return [LIBRARY, BILLARD]
            case HALL_G:
                return [BILLARD, DINING]
            case HALL_H:
                return [LIBRARY, CONSERVATORY]
            case HALL_I:
                return [BILLARD, BALL_ROOM]
            case HALL_J:
                return [DINING, KITCHEN]
            case HALL_K:
                return [CONSERVATORY, BALL_ROOM]
            case HALL_L:
                return [BALL_ROOM, KITCHEN]
            default: 
                alert("Awk Broken");
        }
    }

    moves(currentRoom, otherPlayerLocations) {
        let moves = this.possibleMoves(currentRoom);
        return moves.filter((move) => {
            return !otherPlayerLocations.contains(move)
        })
    }
}
