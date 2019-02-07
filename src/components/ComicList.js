import React, { Component } from 'react'
import axios from 'axios';
import ComicThumbnail from './ComicThumbnail';

class ComicList extends Component {
  constructor(props) {
    super(props);
    this.state={
      comics:[],
      offset:0,
      pageLimitSize:20,
      startPage:1,
      endPage:0,
      currentPage:0,
      comicCount:0,
      isDisabled:true,
      titleStartsWith:'',
      filteredComics:[]
    }
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    // this.handleSearchClick = this.handleSearchClick.bind(this)
  }
  componentDidMount(){
    // for (let i = 0; i < 2; i++) {
    //   axios.get(`https://gateway.marvel.com/v1/public/comics?limit=100&offset=${i}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
    //     .then((response) => {
    //       this.setState({
    //         comics: [...this.state.comics, ...response.data.data.results]
    //       })
    //       console.log(this.state.comics);

    //     }).catch((err) => {
    //       console.log(err);
    //     });
    //   }
    axios.get(`https://gateway.marvel.com/v1/public/comics?limit=100&offset=0&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comics: response.data.data.results
        })
        console.log(this.state.comics);

      }).catch((err) => {
        console.log(err);
      });
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
        return comic.title.toLowerCase()
        .indexOf(
          this.state.titleStartsWith.toLowerCase()
          ) !== -1
        })
        this.setState({
          filteredComics:localFilteredComics
        })// console.log(this.state.titleStartsWith);
    }else{
      this.setState({
        filteredComics: this.state.comics
      })
    }
    
  }
  handleNextClick(){
    if (this.state.offset === 0 && this.state.titleStartsWith === '') {
      this.setState({
        offset: this.state.offset + 1,
      })
      axios.get(`https://gateway.marvel.com/v1/public/comics?limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
        .then((response) => {
          this.setState({
            comics: response.data.data.results,
            // offset: this.state.offset+1,
            isDisabled: false
          })
          // console.log(this.state.offset);
        }).catch((err) => {
          console.log(err);
          
        });  
    } else if (this.state.offset >= 0 && this.state.titleStartsWith === '') {
      this.setState({
        offset: this.state.offset + 1
      })
      axios.get(`https://gateway.marvel.com/v1/public/comics?limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comics: response.data.data.results,
          isDisabled: false
        })
        console.log(`Updated-offset ${this.state.offset}`);
        // console.log(this.state.offset);
      }).catch((err) => {
        console.log(err);
      }); 
    }else if (this.state.offset >= 0 && this.state.titleStartsWith !== '') {
      this.setState({
        offset: this.state.offset + 1
      })
      axios.get(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${this.state.titleStartsWith}&limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comics: response.data.data.results,
          isDisabled: false
        })
        console.log(`Updated-offset ${this.state.offset}`);
        // console.log(this.state.offset);
      }).catch((err) => {
        console.log(err);
      })
    }else if (this.state.offset === 0 && this.state.titleStartsWith !== '') {
      this.setState({
        offset: this.state.offset + 1
      })
      axios.get(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${this.state.titleStartsWith}&limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comics: response.data.data.results,
          isDisabled:true
        })
        console.log(`Updated-offset ${this.state.offset}`);
        // console.log(this.state.offset);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  handlePrevClick(){
    // console.log('previous page');
    
    if (this.state.offset === 0) {
      this.setState({
        offset: 0,
        isDisabled: true
      })
    }else{
      this.setState({
        offset: this.state.offset-1,
        isDisabled: false
      })
      // let url = `https://gateway.marvel.com/v1/public/comics?limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`
      // console.log(url);
      
      axios.get(`https://gateway.marvel.com/v1/public/comics?limit=16&offset=${this.state.offset}&apikey=a3b9711a705d3887e3524bf610e36053e33003c9`)
        .then((response) => {
          this.setState({
            comics: response.data.data.results
          })
          this.setState({
            offset: response.data.data.offset
          });
          // console.log(this.state.offset);
        }).catch((err) => {
          console.log(err);
        }); 
    }
  }  
  render() {
    let comicsList =[]
    if (this.state.titleStartsWith==='') {
      comicsList= this.state.comics.map((comic, index) => (
        <ComicThumbnail key={index} comic={comic} />
      ));
    }else{

      
      comicsList = this.state.filteredComics.map((comic, index) => <ComicThumbnail key={index} comic={comic} />) 
      console.log(comicsList);
      
    }
    return (
      
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <input type="text" name='titleStartsWith' value={this.state.titleStartsWith} onChange={this.handleSearchChange} />
            <button className="btn btn-primary" placeholder="Please enter part of a title" onClick={this.handleSearchClick}>Search</button>
          </div>
        </div>
        <div className="col-md-12">
          <p>results returned:{comicsList.length}</p>
        </div>
        {comicsList}
      </div>
      
    )
  }
}
export default ComicList