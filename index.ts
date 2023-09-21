import { Observable, map } from "rxjs";

interface Users {
    data: DataElement[];
}

interface DataElement {
    status: string,
    age: number
}

const users = {
    "data":[
        {
            "status":"active",
            "age": 13
        },
        {
            "status":"inactive",
            "age": 53
        },
        {
            "status":"active",
            "age": 24
        },
        {
            "status":"inactive",
            "age": 33
        },
        {
            "status":"active",
            "age": 23
        },
        {
            "status":"active",
            "age": 11
        },
        {
            "status":"inactive",
            "age": 37
        },
    ]
}

const observable = new Observable<Users>((subscriber)=>{
    // What do you want to send to the subscriber
    subscriber.next(users)
}).pipe(
    map((value)=>{
        console.log("Got data from observer", value.data)
        return value.data
    }),
    map((value)=>{
        console.log("Got data from first operator", value)
        const filteredArray = value.filter((user)=> user.status ==='active');
        return filteredArray;
    }),
    map((value)=>{
        console.log("Got data from second operator", value)
        const avgAge: number = value.reduce((sum, user) => sum + user.age, 0)/value.length;
        return avgAge
    }),
    map((value)=>{
        console.log("Got data from third operator", value)
        if (value < 18){
            throw new Error("Avrage age is too young")
        } else {
            return value;
        }
    })
)

const observer = {
    next: (value: any) => {
        console.log('Got value from observer ' + value);
    },
    error: (err: any) => {
        console.log('Observer got an error ' + err)
    },
    complete: () => {
        console.log('Observer got complete notification')
    }
}

observable.subscribe(observer);

console.log()