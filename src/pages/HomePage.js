import React from 'react'
import EmpFragment from './EmpFragment'
import { Tabs, Tab } from 'react-bootstrap';
import DepFragment from './DepFragment';

class HomePage extends React.Component {

    render() {
        return(
            <Tabs defaultActiveKey="employees" >
                <Tab eventKey="employees" title="Employees" >
                    <EmpFragment />
                </Tab>
                <Tab eventKey="departments" title="Departments">
                    <DepFragment />
                </Tab>
            </Tabs>
        ) 
    }
}

export default HomePage;