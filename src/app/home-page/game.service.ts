import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    game = null;
    subscription;
    snapshot = false
    user = null

    subscribeTo() {
        this.subscription = this.db.collection('messages')
        this.db.collection('messages').doc('vtE7M6nkH81gJgS7jDoT').get().toPromise().then((x) => {
            console.log(x.data())
        })


        return this.db.collection('messages').snapshotChanges()
            .pipe(
                map(change => {
                    if (this.snapshot) {
                        console.log(change.map(this.documentToDomainObject))
                        let test = change.map(this.documentToDomainObject)
                        alert(test[0]['id'])
                    } else {
                        this.snapshot = true
                    }

                })
            )
        // if (!this.customers) {
        //   this.subscription = this.db.collection('messages').valueChanges({idField: 'message'})
        //   .subscribe(customers =>  {
        //       console.log(customers)
        //     this.customers = customers;
        //   });
        // }
    }

    addData(text: string) {
        console.log(text)
        this.db.collection('messages').doc(text).set({
            message: this.user
        })
    }

    createGame(name: string) {
        this.db.collection('games').doc(name).set({
            title: name, 
            full: false, 
            players: [this.user]
        })
    }

    documentToDomainObject = _ => {
        const object = _.payload.doc.data();
        object.id = _.payload.doc.id;
        return object;
    }

    dispose() {
        this.subscription.unsubscribe();
        this.game = null;
    }



    constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
       
        this.afAuth.user.subscribe((user) => {
            console.log("This email is logged in", user.email)
            this.user = user.email
        })
        
    }
}
