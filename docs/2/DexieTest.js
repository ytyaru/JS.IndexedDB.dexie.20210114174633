class DexieTest {
    #VERSION;
    constructor(version=null) {
        this.#VERSION = version || 1;
        this.#test();    
    }
    #test() {
        const db = this.#create();
        this.#bulkPut(db);
        this.#bulkGet(db);
//        this.#bulkDelete(db);
    }
    #create() {
        const db = new Dexie("SocialDB");
        db.version(this.#VERSION).stores({
            friends: "name,age"  // key, index
        });
        return db;
    }
    #bulkPut(db) {
        console.log('----- bulkPut()');
        db.friends
            .bulkPut([
                {name: "山田", age: 20, address: "日本"},
                {name: "Andy", age: 33, address: "U.S.A"},
                {name: "ニャルラトホテプ", age: 9999, address: "冥界"},
            ])
            .catch((error)=>{
                console.error(error);
            });
    }
    #bulkGet(db) {
        console.log('----- bulkGet()');
        db.friends.bulkGet(["山田","Andy","存在しない名前"])
            .then((friends)=>{
                friends.forEach((friend)=>{
                    if(friend !== undefined ){
                        console.log(friend);
                    }
                });
            })
            .catch((error)=>{
                console.error(error);
            });
    }
    #bulkDelete(db) {
        console.log('----- bulkDelete()');
        db.friends.bulkDelete("山田","Andy")
            .catch((error)=>{
                console.error(error);
            });
    }
}
