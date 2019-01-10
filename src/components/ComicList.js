import React, { Component } from 'react'
import axios from 'axios';
import ComicThumbnail from './ComicThumbnail';

class ComicList extends Component {
  constructor(props) {
    super(props);
    this.state={
      comics:[],
      offset:0,
      isDisabled:true,
      titleStartsWith:''
    }
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }
  componentDidMount(){
    axios.get(`https://gateway.marvel.com/v1/public/comics?limit=16&offset=0&apikey=61be4a8b6426e8e735c9682a26dbe279`)
    .then((response) => {
      this.setState({comics: response.data.data.results})
      this.setState({offset:response.data.data.offset+1});
    }).catch((err) => {
      console.log(err);  
    });
  }
  handleSearchClick(){
    // let url = `https://gateway.marvel.com:443/v1/public/comics?limit=16&titleStartsWith=${this.state.titleStartsWith}&apikey=61be4a8b6426e8e735c9682a26dbe279`
    // console.log(url);
    if (this.state.offset===0 && this.state.titleStartsWith === '') {
      axios.get('https://gateway.marvel.com/v1/public/comics?limit=16&offset=0&apikey=61be4a8b6426e8e735c9682a26dbe279')
        .then((response) => {
          this.setState({
            comics: response.data.data.results,
            offset: response.data.data.offset,
            isDisabled:true
          })
          console.log(this.state);
        }).catch((err) => {
          console.log(err);
        });
    }else{
      axios.get(`https://gateway.marvel.com:443/v1/public/comics?limit=16&titleStartsWith=${this.state.titleStartsWith}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comics: response.data.data.results,
          offset:response.data.data.offset
        });
      }).catch((err) => {
        console.log(err);  
      });

    }
    // console.log(this.state.titleStartsWith);
    
  }
  handleSearchChange(e){
    this.setState({
      titleStartsWith:e.target.value
    })
    // console.log(this.state.titleStartsWith);
  }
  handleNextClick(){
    // if (this.state.offset >= 0) {
    //   this.setState({
    //     offset:this.state.offset+1,
    //     isDisabled:false
    //   })
    // }
    // axios.get(`https://gateway.marvel.com/v1/public/comics?limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
    //   .then((response) => {
    //     this.setState({
    //       comics: response.data.data.results
    //     })
    //     // console.log(this.state.offset);
    //   }).catch((err) => {
    //     console.log(err);

    //   });
    let url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${this.state.titleStartsWith}&limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`
    console.log(url);
    
    if (this.state.offset === 0 && this.state.titleStartsWith === '') {
      axios.get(`https://gateway.marvel.com/v1/public/comics?limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
        .then((response) => {
          this.setState({
            comics: response.data.data.results,
            offset: this.state.offset+1,
            isDisabled: false
          })
          console.log(this.state.offset);
        }).catch((err) => {
          console.log(err);
          
        });  
      } else if (this.state.offset >= 0 && this.state.titleStartsWith === '') {
        axios.get(`https://gateway.marvel.com/v1/public/comics?limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
        .then((response) => {
          this.setState({
            comics: response.data.data.results,
            offset: this.state.offset + 1,
            isDisabled: false
          })
          console.log(`Updated-offset ${this.state.offset}`);
          // console.log(this.state.offset);
        }).catch((err) => {
          console.log(err);
        });
    }else{
      console.log(this.state.offset,this.state.titleStartsWith);
      
      axios.get(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${this.state.titleStartsWith}&limit=16&offset=${this.state.offset}&apikey=61be4a8b6426e8e735c9682a26dbe279`)
        .then((response) => {
          this.setState({
            comics: response.data.data.results,
            offset: this.state.offset + 1,
            isDisabled: false
          })
          console.log(this.state.offset);
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
    let comicsList =  this.state.comics.map(comic=><ComicThumbnail key={comic.id} comic={comic}/>)
    return (
      
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <input type="text" name='titleStartsWith' value={this.state.titleStartsWith} onChange={this.handleSearchChange} />
            <button className="btn btn-primary" placeholder="Please enter part of a title" onClick={this.handleSearchClick}>Search</button>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className = {"page-item " + (
                  this.state.isDisabled ? ' disabled' : ''
                )} ><span className="page-link" onClick={this.handlePrevClick}>Previous</span></li>
                <li className="page-item" ><span className="page-link" onClick={this.handleNextClick}> Next</span></li>
              </ul>
            </nav>
          </div>
        </div>
        {comicsList}
        <div className="col-md-12">
          <div className="row">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className = {"page-item " + (
                  this.state.isDisabled ? ' disabled' : ''
                )} ><span className="page-link" onClick={this.handlePrevClick}>Previous</span></li>
                <li className="page-item" ><span className="page-link" onClick={this.handleNextClick}> Next</span></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
    )
  }
}
export default ComicList