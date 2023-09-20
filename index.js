import { Observable } from "rxjs";

const observable = new Observable((subscriber)=>{
    // What do you want to send to the subscriber
    subscriber.next(10);
    subscriber.next(11);
    subscriber.next(12);
})

const observer = {
    next: (value) => {
        console.log('Got value from observer ' + value);
    },
    error: (err) => {
        console.log('Observer got an error ' + err)
    },
    complete: () => {
        console.log('Observer got complete notification')
    }
}

observable.subscribe(observer);