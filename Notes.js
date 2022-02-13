class Notes{
    dbVersion=1;
    dbName="Notes";
    reverseOrder=false;
     connect(){
        return new Promise((resolve, reject) => {
            const  request= indexedDB.open(this.dbName, this.dbVersion)
            request.onupgradeneeded=()=>{
                let db=request.result;
                if (!db.objectStoreNames.contains('notes')){
                    db.createObjectStore('notes',{keyPath:"id",autoIncrement:true})
                }
            }
            request.onsuccess=()=>resolve(request.result)
            request.onerror=()=>reject(request.error.message)
            request.onblocked=()=>{console.log('database is blocked')}
        })

    }
   async accessStore(accessType){
        let connect=await this.connect();
        let tx= connect.transaction('notes',accessType)// "readonly"/"readwrite"
       return tx.objectStore('notes');
    }
    async add(note){
        let obNote= await this.accessStore("readwrite");
        return obNote.add(note)
    }
    async delete(noteId){
         let obNote= await this.accessStore("readwrite");
         return  obNote.delete(noteId)
    }
   async clearAllNote(){
       let obNote= await this.accessStore("readwrite");
       return  obNote.clear()
    }
   async all(){
         let obNote=await  this.accessStore("readonly");
         return obNote.openCursor(null,this.reverseOrder ? "prev": "next")
    }
    async update(note){
    //put
        let obNote= await this.accessStore("readwrite");
        return  obNote.put(note)
    }

}