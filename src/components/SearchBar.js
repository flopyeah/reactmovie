import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            placeholder: 'Tapez Votre Film ',
            intervalBeforeRequest : 2000,
            lockRequest : false}
    }

    ///*<p>{this.state.searchText}</p>*/

    render () {
        return (
            <div className="row mt-3 mb-3">
                <form action="" className="col-12" onSubmit={this.handleOnSearch.bind(this)}>
                    <div className="input-group">
                        <input onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder={this.state.placeholder} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" >Rechercher</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    handleOnSearch(event) {
        event.preventDefault()
        this.search()
    }

    search() {
        this.props.callback(this.state.searchText)
        this.setState({lockRequest : false})
    }

    handleChange(event) {
        this.setState({searchText: event.target.value})
        if (!this.state.lockRequest)
        {
            this.setState({lockRequest : true})
            setTimeout(function(){
                //this.search()
                console.log(this.state.searchText)
            }.bind(this), this.state.intervalBeforeRequest);
        }

    }
}

export default SearchBar