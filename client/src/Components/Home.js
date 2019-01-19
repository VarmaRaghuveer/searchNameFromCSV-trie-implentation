import React, { Component, Fragment } from 'react';
import Navbar from './navbar';
import NameList from './nameList';

export default class Home extends Component {

    state = {
        'name': [],
        'nameSearch': '',
        'errorMessage': '',
        'infoMessage': '',
        'isLoading': false
    }

    handleSearch = async e => {
        e.preventDefault();
        if(this.state.nameSearch.length < 3){            
            this.setState({
                'errorMessage': 'Please enter atleast 3 characters',
                'infoMessage': '',
                'name': []
            });
            return;
        }
        if(this.state.nameSearch !== ''){
            this.setState({'errorMessage': '', 'infoMessage': '', 'isLoading': true});
            const url = `/${this.state.nameSearch}`;            
            const data = await fetch(url);
            const response = await data.json();
            this.setState({
                'name': response.data ? response.data : [],
                'isLoading': false
            });            
            if(!response.data || response.data.length === 0){
                this.setState({
                    'infoMessage': 'Ooops!!! No name found...',
                    'errorMessage': '',
                    'name': []
                })
            }
        } else {
            this.setState({
                'errorMessage': 'Please enter a name to search',
                'name': []
            });
        }        
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return(
            <Fragment>
                <Navbar />
                <div className="container">
                    <div className="col-sm-12 col-md-12">
                        <form className="form m-2 pt-3">
                            <input className="form-control mr-sm-2"
                                type="text"
                                name="nameSearch"
                                onChange={e => this.handleChange(e)}
                                placeholder="Enter Name" />
                            <button
                                className="btn btn-secondary m-2 my-sm-2"
                                onClick={e => this.handleSearch(e)}>
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        <hr />
                        {
                            this.state.isLoading
                                ?
                                    <div className="text-center">
                                        <img src="/img/loading.gif" alt="loading" />
                                    </div>
                                :
                                    null
                        }
                        {
                            this.state.errorMessage !== ''
                                ?
                                    <div className="alert alert-dismissible alert-danger text-center">
                                        <strong>{this.state.errorMessage}</strong>
                                    </div>
                                :
                                    null
                        }
                        <NameList name={this.state.name} />
                        {
                            this.state.infoMessage !== ''
                            ?
                                <div className="alert alert-info text-center">
                                    <strong>{this.state.infoMessage}</strong>
                                </div>
                            :
                                null
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}