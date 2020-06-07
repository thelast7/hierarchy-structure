import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    authToken: ''
  }

  handleChangeInput = (e) => {
    console.log('eee', e.target.value)
    // let target = {e}
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.requestDataToServer()
  }

  async requestDataToServer() {
    try{
      let temp, url = 'https://emonica-demo-api.nusatek.id/v1/auth',
      postData = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      temp = await postData.json()
      if(temp.status_code !== 200){
        alert(temp.description)
      }else{
        this.setState({
          authToken: temp.payload.token
        })
        localStorage.setItem('token', temp.payload.token)
        this.props.history.push("/")
      }
    }catch(error){
      console.log(error)
      alert('check your connection')
    }
  }

  render() {
    if(this.state.authToken) return <Redirect to="/" />
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 col-lg-5 mt-5">
            <h3>Login Page</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  className="form-control"
                  type="text"
                  placeholder="Insert your username"
                  value={this.state.username}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  placeholder="Insert your password"
                  value={this.state.password}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-success"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}