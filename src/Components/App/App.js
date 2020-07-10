import React from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'
import SearchBar from '../SearchBar/SearchBar'

import Spotify from '../../util/Spotify'

//Tentremos que importar Playlist SearchBar   SearchResults

class App extends React.Component{
  constructor(props){
    super(props);

    this.state =({
      searchResults: [],

      playListName: 'Lacreo.com',

      playlistTracks: []
      //Array de objetos, cada uno tiene propiedades como name, artists, album y id.
    });

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    const tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }
  removeTrack(track){
    const tracks = this.state.playlistTracks;
    let aux = tracks.findIndex(tracks=> tracks.id === track.id);
    tracks.splice(aux , 1);
    this.setState({
      playlistTracks: tracks,
    })
  }
  updatePlaylistName(name){
    this.setState({
      playListName: name,
    })
  }
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackUris).then(() => {
      this.setState({
        playListName: "New Playlist",
        playlistTracks: []
      })
    })
  }
  search(term){
    Spotify.search(term).then(searchResults =>{
      this.setState({searchResults: searchResults})
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className = "highlight">mmm</span>ing</h1>
        <div className = "App">
          <SearchBar onSearch = {this.search}/>
          <div className = "App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd = {this.addTrack}/>
            <Playlist playListName={this.state.playListName}
                  playlistTracks={this.state.playlistTracks}
                  onRemove = {this.removeTrack} 
                  onNameChange = {this.updatePlaylistName}
                  onSave ={this.savePlaylist}/>
          </div>
      </div>
      </div>
  );}
}

export default App;
