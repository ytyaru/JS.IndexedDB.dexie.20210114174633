class DexieTest {
    #VERSION;
    constructor(version=null) {
        this.#VERSION = version || 1;
        this.#test();    
    }
    #test() {
        const db = this.#create();
        this.#put(db);
        this.#get(db);
//        this.#delete(db);
    }
    #create() {
        const db = new Dexie("SocialDB");
        db.version(this.#VERSION).stores({
            friends: "name,age"  // key, index
        });
        return db;
    }
    #put(db) {
        console.log('----- put()');
        db.friends
            .put({
                name:"山田",
                age: 20,
                address: "日本"
            })
            .catch((error)=>{
                console.error(error);
            });
    }
    #get(db) {
        console.log('----- get()');
        db.friends.get("山田")
            .then((friend)=>{
                console.log(friend);
            })
            .catch((error)=>{
                console.error(error);
            });
    }
    #delete(db) {
        console.log('----- delete()');
        db.friends.delete("山田")
            .then((friend)=>{
                console.log(friend);
            })
            .catch((error)=>{
                console.error(error);
            });
    }
}
