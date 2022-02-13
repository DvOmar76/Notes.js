const NoteOB=new Notes();
// this use one time
NoteOB.connect().then(() => console.log('done'));
async function rev(){
    NoteOB.reverseOrder=!NoteOB.reverseOrder
    console.log( NoteOB.reverseOrder)
    getAllNote()
}
document.addEventListener('submit',(e)=>{
    e.preventDefault()
    let target=e.target;
    if (target&& target.classList.contains('add-note')){
        addNote(target)
    }
    else if (target&& target.classList.contains('update-note')){
        let noteId=parseInt(target.dataset.id)
        let note=target.querySelector('textarea').value
        // console.log(note)
        updateNote({id:noteId,note:note})
       // console.log(target)
    }
})
document.addEventListener('click',(e)=>{
    let {target}=e
    if (target&& target.classList.contains('del')){
        let noteId=parseInt(target.dataset.id)
        delNote(noteId)
        // console.log()
    }
    else if (target&& target.classList.contains('edit')){
        editeNote(target)
        // console.log('edite')
    }
})

async function addNote(target){
    let textarea = target.querySelector('textarea')
    let newNote=textarea.value
    let add= await NoteOB.add({note:newNote})
    add.onsuccess=()=>{textarea.value=''; getAllNote() }
    add.onerror=()=>{console.log('error')}
}
async function delNote(noteId){
   if (confirm('Are you sure?')){
       let deleteN= await NoteOB.delete(noteId);
       deleteN.onsuccess=()=>{document.getElementById('note-'+noteId).remove()}
       deleteN.onerror=(e)=>{console.log(e.name)}
   }
}
function editeNote(note){
    let noteContainer=document.getElementById('note-'+note.dataset.id)
    let oldText=noteContainer.querySelector('.text').innerText;
    let form=`<form class="update-note" data-id="${note.dataset.id}" >
                <textarea>${oldText}</textarea>
                <button class="btn" type="submit">update</button>
                </form>`
    noteContainer.innerHTML=form
    console.log(oldText)
}
async function updateNote(note){
    let update= await NoteOB.update(note);
    update.onsuccess=()=>{getAllNote()}
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
            console.log(cursor.value.note)
            cursor.continue()
        }else {
          displayNote(notesArray)
            console.log(notesArray)
        }
    }
    get.onerror=()=>{console.log('error')}
}
async function delAllNote (){
    console.log('clear')
    let del= await NoteOB.clearAllNote();
    del.onsuccess=()=>{console.log('notes is deleted');getAllNote()}
    del.onerror=()=>{console.log('error')}
}
 function displayNote(notes){
    let note_space=document.getElementById('notes_space')
     let ul=document.createElement('ul')

     for (let note of notes) {
         let elm=document.createElement('li')
         elm.innerHTML=`
            <div class=""  id="${note.id}">
               <p class="text">${note.note}</p>
               <img  data-id="${note.id}" src="imgs/edit-icon.png" class="edit" width="20" height="20"> 
               <img data-id="${note.id}" src="imgs/delete-icon.png" class="del" width="20" height="20">
            </div>`
         elm.id="note-"+note.id
         ul.append(elm)

     }
     note_space.innerHTML='';
     note_space.append(ul)
     console.log()
}

// addNote('test');
// deleteNote(2);
// delNotes()
// clear()
// updateNote({id:3,note:'update'})
getAllNote()