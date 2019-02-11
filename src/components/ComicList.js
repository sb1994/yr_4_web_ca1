import React, { Component } from 'react'
import axios from 'axios';
import ComicThumbnail from './ComicThumbnail';

class ComicList extends Component {
  constructor(props) {
    super(props);
    this.state={
      comics:[],
      isDisabled:true,
      titleStartsWith:'',
      filteredComics:[],
      selectedFormat:''
    }
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  componentDidMount(){
    for (let i = 0; i < 2; i++) {
      axios.get(`https://gateway.marvel.com/v1/public/comics?limit=100&offset=${i}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
        .then((response) => {
          this.setState({
            comics: [...this.state.comics, ...response.data.data.results]
          })
          console.log(this.state.comics);

        }).catch((err) => {
          console.log(err);
        });
      }
    // axios.get(`https://gateway.marvel.com/v1/public/comics?limit=100&offset=0&apikey=61be4a8b6426e8e735c9682a26dbe279`)
    //   .then((response) => {
    //     this.setState({
    //       comics: response.data.data.results
    //     })
    //     console.log(this.state.comics);

    //   }).catch((err) => {
    //     console.log(err);
    //   });
  }
  handleSearchChange(e){
    this.setState({
      titleStartsWith:e.target.value,
      filteredComics:[]
    })// console.log(this.state.titleStartsWith);
    //localversion of array
    let localFilteredComics=[]
    if (this.state.titleStartsWith !== '' ) {
      localFilteredComics = this.state.comics.sort().filter((comic,i) => {
        // console.log(comic);
        
        return comic.title.toLowerCase()
        .indexOf(
          this.state.titleStartsWith.toLowerCase()
          ) !== -1
        })
        this.setState({
          filteredComics:localFilteredComics
        })// console.log(this.state.titleStartsWith);
    }
      // this.setState({
      //   filteredComics: this.state.comics
      // })
    
    
    
  }
  handleSelectChange(e){
    let selectedFormat = e.target.value
    
    this.setState({
      selectedFormat: selectedFormat
    }) //
    
  }
  handleSearchClick(e){
    let localFilteredComics
    let {titleStartsWith,filteredComics,selectedFormat,comics} =this.state
    console.log(this.state);
    if (titleStartsWith !=='' && selectedFormat !=='') {
      
        localFilteredComics = comics.sort().filter((comic, i) => {
          // console.log(comic);
          return comic.title.toLowerCase()
            .indexOf(
              titleStartsWith.toLowerCase()
            ) !== -1
        })
        localFilteredComics = localFilteredComics.sort().filter((comic, i) => {
          // console.log(comic);
          return comic.format ===selectedFormat
        })
       
        this.setState({
          filteredComics: localFilteredComics
        }) // console.log(this.state.titleStartsWith);
        console.log(localFilteredComics);
    }else{

    }
    console.log();
    if (titleStartsWith ==="" && selectedFormat !== '') {
      localFilteredComics = this.state.comics.sort().filter((comic, i) => {
        // console.log(comic);

        return comic.format
          .indexOf(
            this.state.selectedFormat
          ) !== -1
      })
      this.setState({
        filteredComics: localFilteredComics
      })
    } 
    // console.log(this.state.selectedFormat);
  }
  
  render() {
    let comicsList =[]
    if (this.state.titleStartsWith==='') {
      comicsList= this.state.comics.map((comic, index) => (
        <ComicThumbnail key={index} comic={comic} />
      ));
    }else if(this.state.filteredComics.length >0){
      comicsList = this.state.filteredComics.map((comic, index) => <ComicThumbnail key={index} comic={comic} />) 
      // console.log(comicsList.);
    }
    return (
      
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <input type="text" name='titleStartsWith' value={this.state.titleStartsWith} onChange={this.handleSearchChange} />
            <label>
              Filter By preferd medium:
              <select value={this.state.selectedFormat} onChange={this.handleSelectChange}>
                <option>Please Select one</option>
                < option value = "Comic" > Comic</option>
                < option value = "Digital Comic" >Digital Comic</option>
              </select>
            </label>
            <button className="btn btn-primary" placeholder="Please enter part of a title" onClick={this.handleSearchClick}>Search</button>
          </div>
        </div>
        <div className="col-md-12">
          <p>Results returned:{comicsList.length}</p>
        </div>
        {comicsList}
      </div>
      
    )
  }
}
export default ComicList