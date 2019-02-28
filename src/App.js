import React, { Component } from 'react'
import SearchBar from "./components/SearchBar"
import VideoList from './components/VideoList'
import VideoDetail from './components/VideoDetail'
import Video from './components/Video'
import axios from 'axios'


const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=952efe3afcef1dea43c3a2342ec8c578"

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        movieList : {},
        movieCurrent : {}
    }
  }

  componentWillMount() {
    this.initMovieList()
  }

      initMovieList() {
        axios
            .get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
            .then(function (response) {
              this.setState({
                movieCurrent : response.data.results[0],
                movieList : response.data.results.slice(1,11)
              },
                  function () {
                    this.applyVideoCurrentMovie()
                  })
            }.bind(this));
      }

      applyVideoCurrentMovie() {
          window.scrollTo(0, 0)

            axios
                .get(`${API_END_POINT}movie/${this.state.movieCurrent.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
                .then(function (response) {
                    const youtubeKey = response.data.videos.results[0].key
                    let NewCurrentMovie = this.state.movieCurrent
                    NewCurrentMovie.videoId = youtubeKey;
                    this.setState({ movieCurrent : NewCurrentMovie })

                }.bind(this));
      }

    onCickListItem(movie) {
      this.setState({movieCurrent : movie}, function () {
          this.applyVideoCurrentMovie();
          this.setRecommendationList();
      })
    }

    onclickSearch(searchText) {
        if (searchText) {
            axios
                .get(`${API_END_POINT}search/movie?${API_KEY}&query=${searchText}&append_to_response=videos&include_adult=false`)
                .then(function (response) {
                    if (response.data && response.data.results[0] )
                    {
                        if (response.data.results[0].id !== this.state.movieCurrent.id)
                        {
                            this.setState({movieCurrent: response.data.results[0]}, () => {
                                this.applyVideoCurrentMovie();
                                this.setRecommendationList();
                            })
                        }
                    }
                }.bind(this));
        }
    }

    setRecommendationList() {
        axios
            .get(`${API_END_POINT}movie/${this.state.movieCurrent.id}/recommendations?${API_KEY}&append_to_response=videos&include_adult=false`)
            .then(function (response) {
                this.setState({
                        movieList : response.data.results.slice(0,10)
                    },
                    function () {
                        this.applyVideoCurrentMovie()
                    })
            }.bind(this));
    }

  render() {

    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
            <VideoList movieList={this.state.movieList} callback={this.onCickListItem.bind(this)} />
        )
      }
    }

    const renderVideoYoutube = () => {
      if (this.state.movieCurrent.videoId) {
        return (
            <Video videoId={this.state.movieCurrent.videoId} />
        )
      }
    }

    return (
        <div className="container App">
            <div className="row">
                <div className="col-12">
                    <SearchBar callback={this.onclickSearch.bind(this)} />
                </div>
                <div className="col-sm-8">
                    <div className="row">
                        {renderVideoYoutube()}
                        <VideoDetail title={this.state.movieCurrent.title} description={this.state.movieCurrent.overview}
                                     image={this.state.movieCurrent.poster_path}/>
                    </div>
                </div>
                <div className="col-sm-4">
                    {renderVideoList()}
                </div>
            </div>

        </div>
    );
  }
}

export default App;
