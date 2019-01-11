import React, { Component } from 'react'
import axios from 'axios'
class ComicDetail extends Component {
  constructor(props) {
    super(props)

    this.state={
      comicID: this.props.match.params.id,
      comic:{}
    }
  }
  componentDidMount(){
    // this.setState({
    //   comicID: this.props.match.params.id
    // })
    // console.log(this.props.match.params.id);
    
    console.log(this.state);
    
    axios.get(`https://gateway.marvel.com/v1/public/comics/${this.state.comicID}?&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comic: response.data.data.results[0],
        })
        console.log(this.state);
        // console.log(this.state.offset);
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <p>this is the ComicDetail</p>
      </div>
    )
  }
}
export default ComicDetail
