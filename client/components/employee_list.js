import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import EmployeeDetail from './employee_detail';
import { Employees } from '../../imports/collections/employees';

const PER_PAGE = 20;
let per = per || PER_PAGE

const click = () => {
    per += 20;
    Meteor.subscribe('employees', per);
}

const EmployeeList = (props) => {
    //props.employees => an array of employee objects
    return (
        <div>
            <div className="employee-list">
                {props.employees.map(employee =>
                    <EmployeeDetail key={employee._id} employee={employee}/>)}
            </div>
            <button onClick={ () => click()}
                className="btn btn-primary">Load More
            </button>
        </div>
    );
    
};

export default createContainer(() => {
    // set up subscription
    Meteor.subscribe('employees', PER_PAGE);
    
    // return an object. Whatever we return will sen to EmployeeList as props
    return { employees: Employees.find({}).fetch() };
}, EmployeeList);




