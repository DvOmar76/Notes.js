const NoteOB=new Notes();
// this use one time
// NoteOB.connect().then(() => console.log('done'));
async function addNote(note){
    let add= NoteOB.add({note:note})
    add.onsuccess=()=>{console.log('note is added')}
    add.onerror=()=>{console.log('error')}
}
addNote('test')