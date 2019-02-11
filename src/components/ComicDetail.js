import React, { Component } from 'react'
import axios from 'axios'
class ComicDetail extends Component {
  constructor(props) {
    super(props)
    this.state={
      comicID: this.props.match.params.id,
      comic:{},
      creators:[],
      thumbnail:''
    }
  }
  componentDidMount(){
    axios.get(`https://gateway.marvel.com/v1/public/comics/${this.state.comicID}?&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comic: response.data.data.results[0],
          thumbnail: response.data.data.results[0].thumbnail.path +"."+ response.data.data.results[0].thumbnail.extension,
        })
        //checks wether the creators of the comic are aviable 
        //and will set accordingly
        if (this.state.comic.creators.available >0 ) {
          this.setState({
            creators:response.data.data.results[0].creators.items
          })
          // console.log('Authors exist');
        }else{
          console.log('author cant be retrived');
        }

        // console.log(this.state.creators);
        console.log(this.state);
        console.log(this.state.comic);
        console.log(this.state.thumbnail);
        
        
        // console.log(response.data.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    // const thumbnailURL = this.state.comic.thumbnail.path
    const creatorsListItems = this.state.creators.map((creator,index)=>
        <li key={index}><span>{creator.role}</span>- {creator.name}</li>
      )
    return (
      <div>
        {/* <p>{this.state.comic.thumbnail.path}</p> */}
        <p>{this.state.comic.title}</p>
        <p>{this.state.comic.description}</p>
        <img src={this.state.thumbnail} alt=""/>
        <ul>
          {creatorsListItems}
        </ul>
      </div>
    )
  }
}
export default ComicDetail
