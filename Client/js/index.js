function renderAllSongs(){
    //GET ALL SONGS WITH AJAXCALL

}

function GetAllSongsSuccess(data){
    data.forEach(song => {
        allSongs = document.getElementById("allSongs")
        append(allsongs).renderSong(song)
    });
}

function renderSong(){

}