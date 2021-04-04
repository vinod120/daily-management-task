import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Update from '../components/Update'


export default class Routes extends Component {
    render() {
        return (
            <>
                <div>
                    <Switch>
                        <Route exact path='/' render={()=><Dashboard />} />
                        <Route exact path='/edit/:id' render={(props)=><Update {...props}/>} />
                    </Switch>
                </div>
            </>
        )
    }
}