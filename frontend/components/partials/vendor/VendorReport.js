import React, { Component } from 'react';
import axios from 'axios';
import { backendurl } from './../../../backendurl';


class VendorReport extends Component {
    constructor(props) {
        super(props);
        this.state ={
            reportDetails: []
        }
        
    }

    componentWillMount(){
        let id = "";
        if (typeof window !== 'undefined' ) {
          id = localStorage.getItem('user_id');
        }
        console.log("User id:  ", id);
        const data = {
            sellerId: id
        }
        
        axios.post(backendurl + '/seller/getSalesDetails', data)
            .then(response => {
                console.log(" Status Code : ", response.status,  "  response: " , response);
                if (response.status === 200) {
                    this.setState({
                        reportDetails:response.data.message
                    });
                }
            })
            .catch(err => {
                this.setState({ errorMessage: "Report could not be viewed" });
            });
    }


    

    render() {
        console.log("Inside render ", this.state)
        return (
            <div className="ps-vendor-dashboard">
                <div className="container">
                    <div className="ps-section__header">
                        <h3>Vendor Report</h3>
                    </div>
                    <div className="ps-section__content">

                        <div className="ps-block--vendor-dashboard">
                            <div className="ps-block__header">
                                <h3>Sale Report</h3>
                            </div>
                            <div className="ps-block__content">
                            
                                <div className="table-responsive">
                                    <table className="table ps-table ps-table--vendor">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Month</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state && this.state.reportDetails.map(listItem => (
                                                <tr>
                                                    <td>{listItem.productName}</td>
                                                    <td>{listItem.quantityTotal}</td>
                                                    <td>{listItem.amount}</td>
                                                    <td>{listItem.month}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




export default VendorReport;



// //export default EventDetail;
