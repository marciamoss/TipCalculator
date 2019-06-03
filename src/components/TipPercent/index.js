import React, { Component } from "react";   
import { Input, FormBtn } from "../../components/Form";
import PopUps from "../../components/PopUps";

class TipPercent extends Component {
    constructor() {
      super();
      this.state = {
        bill:"",
        percent:['No Tip','5%','10%','20%','25%','Custom'],
        value:[0,5,10,20,25,9999],
        billamount:"",
        tipamount:"",
        total:"",
        show: false,
        custom:false,
        customtip:"",
        handleClose() {
        this.setState({ show: false });
        },
        handleShow() {
        this.setState({ show: true });
        }
      };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        },()=>{
            if(isNaN(this.state.bill) || isNaN(this.state.customtip)){
                let handleCloseCopy = this.state.handleClose.bind(this);
                if(name === "customtip"){
                    this.setState({customtip:"", tipamount:"NAN", total:"", custom:false, show:true, 
                              handleClose: handleCloseCopy});
                }else{
                    this.setState({bill:"", customtip:"", tipamount:"NAN", total:"", custom:false, show:true, 
                                handleClose: handleCloseCopy});
                }
            };
        });
        
    };

    calculateTip = (tip,type) => {
        let tipamount, total, billamount;
        if(this.state.custom===true){
            if(type==="dollar"){
                billamount=(parseFloat(this.state.bill)).toFixed(2);
                tipamount=(parseFloat(this.state.customtip)).toFixed(2);
                total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                let handleCloseCopy = this.state.handleClose.bind(this);
                this.setState({bill:"", billamount, tipamount, total, custom:false, customtip:"",show:true, handleClose:handleCloseCopy});
            }else if(type==="percent"){
                billamount=(parseFloat(this.state.bill)).toFixed(2);
                tipamount=(this.state.bill*(this.state.customtip/100)).toFixed(2);
                total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                let handleCloseCopy = this.state.handleClose.bind(this);
                this.setState({bill:"", billamount, tipamount, total, custom:false, customtip:"",show:true, handleClose:handleCloseCopy});
            }
        }
        if(tip !== 9999 && this.state.custom !== true){
            billamount=(parseFloat(this.state.bill)).toFixed(2);
            tipamount=(this.state.bill*(tip/100)).toFixed(2);
            total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
            let handleCloseCopy = this.state.handleClose.bind(this);
            this.setState({bill:"", billamount, tipamount, total, show:true, handleClose:handleCloseCopy});
        }
        else if(tip === 9999 ){
            this.setState({custom:true});
        }

    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 style={{color:"orange", fontWeight:"bold" ,textAlign:"center"}}>Tip Calculator</h1>
                    </div>
                </div>
                <form> 
                    <PopUps show={this.state.show} handleClose={this.state.handleClose} bill={this.state.billamount} tipamount={this.state.tipamount} total={this.state.total}></PopUps>
                    <div className="row mt-5">
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <label style={{fontWeight: "bold", color:"orange"}}>Enter the bill amount</label>
                            <Input
                                value={this.state.bill}
                                onChange={this.handleInputChange}
                                name="bill"
                                placeholder="Bill Amount" 
                            />
                        </div>
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
                    </div>
                    { this.state.bill ? (
                        <div className="row">
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                {this.state.percent.map((percent,index) => (
                                    <FormBtn 
                                        key={index}
                                        disabled={(this.state.custom)}
                                        data-value={this.state.value[index]}
                                        label={percent}
                                        onClick=
                                        {(event) => 
                                            {
                                            event.preventDefault();
                                            this.calculateTip(this.state.value[index])
                                            }
                                        } 
                                    >
                                        {percent}
                                    </FormBtn>
                                    
                                ))}
                            </div>
                        </div>
                    ): (
                        <div className="row">
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <p style={{fontWeight: "bold", color:"orange"}}>To Calculate Tip enter the amount on the bill </p>
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
                        </div>
                    )}
                </form>
                { this.state.custom ? (
                    <div className="row">
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <Input
                            value={this.state.customtip}
                            onChange={this.handleInputChange}
                            name="customtip"
                            placeholder="Custom Tip Amount" 
                            />
                            { this.state.customtip ? (
                                <>
                                <FormBtn
                                    onClick=
                                    {(event) => 
                                        {
                                        event.preventDefault();
                                        this.calculateTip(this.state.customtip,"dollar")
                                        }
                                    } 
                                >
                                    Submit Tip in $
                                </FormBtn>
                                <FormBtn 
                                    onClick=
                                    {(event) => 
                                        {
                                        event.preventDefault();
                                        this.calculateTip(this.state.customtip,"percent")
                                        }
                                    } 
                                >
                                    Submit Tip in %
                                </FormBtn>
                                </>
                            ) : (null)
                            }
                        </div>
                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
                    </div>
                        
                ) : (
                    null
                )}

            </div>
        );
    }
}

export default TipPercent;