import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../App.css';
 class ComicThumbnail extends Component {
  constructor(props){
    super(props)
    this.state={
      comic:this.props.comic,
      isLiked:false
    }
    this.handleLikeClick = this.handleLikeClick.bind(this)
  }
  componentDidMount(){
    this.setState({comic:this.props.comic});
    // console.log(this.state.comic.thumbnail);
    
  }
  handleLikeClick() {
    // this.setState({
    // 	clicked: this.state.clicked + 1
    // });
    if (!this.state.isLiked) {
      this.setState({isLiked:true});
    }else{
      this.setState({isLiked:false});
      
    }
    // console.log(this.state.isLiked);
    
  }
  render() {
    let thumbnail = this.state.comic.thumbnail.path +"."+ this.state.comic.thumbnail.extension
    // let isLiked  = this.state.isLiked
    return (
      < div className ={ " col-auto card col-md-3 col-sm-4"+(this.state.isLiked? ' liked':'')} >
        <Link to={`/${this.state.comic.id}`}>
          < img className="card-img-top img-responsive"
            src={thumbnail} alt="" /> 
        </Link>
        < div className = "card-body" >
        <p>{this.state.isLiked}</p>
          < Link to = {
            `/${this.state.comic.id}`
          } >
            <h2 className = "card-title" >{this.state.comic.title} </h2> 
          </ Link>
          <p>{this.state.isLiked}</p>
          < button
          className = "btn btn-primary" type="button" onClick={this.handleLikeClick} > <i className= "fa fa-thumbs-up" ></i>Like </ button >
        </div>
       </div>
    )
  }
}
export default ComicThumbnail