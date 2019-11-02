import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as rooms from './constants';

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    user = null 

    constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
       
        this.afAuth.user.subscribe((user) => {
            this.user = user.email
        })
        
    }

    possibleMoves(currentRoom) {
        switch(currentRoom) {
            case rooms.STUDY: 
                return [rooms.HALL_A, rooms.HALL_C, rooms.KITCHEN]
            case rooms.HALL:
                return [rooms.HALL_A, rooms.HALL_B, rooms.HALL_D]
            case rooms.LOUNGE:
                return [rooms.HALL_B, rooms.CONSERVATORY, rooms.HALL_E]
            case rooms.LIBRARY:
                return [rooms.HALL_C, rooms.HALL_F, rooms.HALL_H]
            case rooms.BILLARD:
                return [rooms.HALL_D, rooms.HALL_F, rooms.HALL_G,rooms. HALL_I]
            case rooms.DINING:
                return [rooms.HALL_E, rooms.HALL_G, rooms.HALL_J]
            case rooms.CONSERVATORY:
                return [rooms.HALL_H, rooms.HALL_K, rooms.LOUNGE]
            case rooms.BALL_ROOM:
                return [rooms.HALL_I, rooms.HALL_K, rooms.HALL_L]
            case rooms.KITCHEN:
                return [rooms.HALL_J, rooms.HALL_L, rooms.STUDY]
            case rooms.HALL_A:
                return [rooms.STUDY, rooms.HALL]
            case rooms.HALL_B:
                return [rooms.HALL, rooms.LOUNGE]
            case rooms.HALL_C:
                return [rooms.STUDY, rooms.LIBRARY]
            case rooms.HALL_D:
                return [rooms.HALL, rooms.BILLARD]
            case rooms.HALL_E:
                return [rooms.LOUNGE, rooms.DINING]
            case rooms.HALL_F:
                return [rooms.LIBRARY, rooms.BILLARD]
            case rooms.HALL_G:
                return [rooms.BILLARD, rooms.DINING]
            case rooms.HALL_H:
                return [rooms.LIBRARY, rooms.CONSERVATORY]
            case rooms.HALL_I:
                return [rooms.BILLARD, rooms.BALL_ROOM]
            case rooms.HALL_J:
                return [rooms.DINING, rooms.KITCHEN]
            case rooms.HALL_K:
                return [rooms.CONSERVATORY, rooms.BALL_ROOM]
            case rooms.HALL_L:
                return [rooms.BALL_ROOM, rooms.KITCHEN]
            default: 
                console.log("Awk Broken");
        }
    }

    moves(currentRoom, otherPlayerLocations) {
        let moves = this.possibleMoves(currentRoom);
        return moves.filter((move) => {
            return !otherPlayerLocations.contains(move)
        })
    }
}
