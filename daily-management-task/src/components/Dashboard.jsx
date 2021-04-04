import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './styles.css';
import Calendar from './calendar';

function Dashboard() {
    return (
        <div>
            <CssBaseline />
            <Container style={{textAlign:'center'}}>
                <h1>Daily Management Task</h1>
                <div style={{marginTop:'10px'}}>
                    <Calendar />
                </div>
            </Container>
        </div>
    )
}

export default Dashboard;
