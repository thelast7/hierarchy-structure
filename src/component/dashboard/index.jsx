import React,{Component} from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  render() {
    let authToken = localStorage.getItem('token')
    if(!authToken) return <Redirect to='/login' />
    return (
      <div>
        <h1>hello {authToken}</h1>
      </div>
    )
  }
}