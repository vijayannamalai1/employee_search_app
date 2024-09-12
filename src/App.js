import React, { Component } from 'react'
import './App.css'
import Suggestions from './Components/Suggestions'
import Tabular from './Components/Tabular'
import Data from './data.json'
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : Data.data,
      keyword : "",
      results : [],
      showsugg : false,
      showdetails : false
    }
  }
  doesNameMatch = (name,keyword) => {
    let keyLen = keyword.length
    keyword = keyword.toLowerCase()
    name = name.toLowerCase().substring(0,keyLen)
    return name === keyword && keyLen!==0
  }
  filterResults = value => {
    let results = this.state.data.filter(item => this.doesNameMatch(item.name,value))
    this.setState({
      results : results
    })
  }
  handleInputChange = value =>{
    this.setState({
      keyword : value,
      showsugg : true
    })
    this.filterResults(value)
  }
  handleSuggestionClick = (name,id) => {
    let res = this.state.data.filter(item => item.name === name && item.Emp_id === id)
    this.setState({
      keyword : name,
      showsugg:false,
      results : res
    })
  }
  clearSearch = () => {
    this.setState({
      keyword : "",
      showsugg:false,
      results : []
    })
  }
  displayDetails = () => {
    this.setState({
      showdetails : true
    })
  }

  closeDetailsView = () => {
    this.setState({
      showdetails : false,
      results:[],
      keyword: "",
      showsugg : false
    })
  }
  render() {
    return (
      <div className = "App">
        {
          this.state.showdetails ? <Tabular results = {this.state.results} onclick = {this.closeDetailsView}/> :
        <div className = "autocomplete-container">
          <h1 className = "main-head">Employee Details</h1>
          <br/>
          <br/>
          <div className="search-container">
            <div className = "input">
              <input className = "search-bar" placeholder = "Search . . ." onChange = {event => this.handleInputChange(event.target.value) } value = {this.state.keyword} />
              {
                this.state.keyword.length > 0 ?
                <div className = "button">
                  <button onClick = {() => this.clearSearch()}className="clear">x</button>
                  </div> : null
              }
            </div>
          </div>
          {
            this.state.showsugg && this.state.results.length > 0 ? 
            <div className = "suggestion-container">
              <Suggestions results = {this.state.results} update = {this.handleSuggestionClick}/>
              </div> : 
              this.state.keyword.length >0 && this.state.results.length === 0 ? 
              <div className = "no-results">
                <h1>No Results Found</h1><br/>
                <h4>Try Different Keywords</h4>
                </div> : null
          }
          {
            this.state.results.length === 1 && this.state.keyword.toLowerCase() === this.state.results[0].name.toLowerCase() ?
            <div className = "details">
                <button className = "detailsbutton" onClick = {() => this.displayDetails()}>Get Details</button>
              </div> : null
          }
        </div>
  }
      </div>
        
    )
  }
}
