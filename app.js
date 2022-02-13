const NoteOB=new Notes();
// this use one time
// NoteOB.connect().then(() => console.log('done'));
document.addEventListener('submit',(e)=>{
    e.preventDefault()
    let target=e.target;
    if (target&& target.classList.contains('add-note')){
        addNote(target)
    }
})
async function addNote(target){
    let textarea =target.querySelector('textarea')
    let newNote=textarea.value
    let add= await NoteOB.add({note:newNote})
    add.onsuccess=()=>{textarea.value=''}
    add.onerror=()=>{console.log('error')}
}
async function deleteNote(noteId){
    let deleteN= await NoteOB.delete(noteId);
    deleteN.onsuccess=()=>{console.log('note is deleted')}
    deleteN.onerror=()=>{console.log('error')}
}
async function updateNote(note){
    let update= await NoteOB.update(note);
    update.onsuccess=()=>{console.log('note is updated')}
    update.onerror=()=>{console.log('error')}
}
async function getAllNote(){
    let get= await NoteOB.all();
    let notesArray=[];
    console.log( get)
    get.onsuccess=()=>{
        let cursor= get.result
        if (cursor){
            notesArray.push(cursor.value)
            console.log(cursor.value)
            cursor.continue()
        }else {
          displayNote(notesArray)
        }
    }
    get.onerror=()=>{console.log('error')}
}
async function delNotes (){
    let del= await NoteOB.clear();
    del.onsuccess=()=>{console.log('notes is deleted')}
    del.onerror=()=>{console.log('error')}
}
 function displayNote(notes){
    let note=document.create
     for (let note of notes) {

     }
}
// addNote('test');
// deleteNote(2);
// updateNote({id:3,note:'update'})
getAllNote()