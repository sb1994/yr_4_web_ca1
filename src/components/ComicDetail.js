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
    axios.get(`https://gateway.marvel.com/v1/public/comics/${this.state.comicID}?&apikey=61be4a8b6426e8e735c9682a26dbe279`)
      .then((response) => {
        this.setState({
          comic: response.data.data.results[0],
        })
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <p>{this.state.comic.title}</p>
        <p></p>
      </div>
    )
  }
}
export default ComicDetail
