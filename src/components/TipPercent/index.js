import React, { Component } from "react";   
import { Input, FormBtn } from "../../components/Form";
import PopUps from "../../components/PopUps";
import Button from 'react-bootstrap/Button';

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
        split:false,
        people:"",
        handleClose() {
        this.setState({ show: false });
        },
        handleShow() {
        this.setState({ show: true });
        },
        modaltxt1:"",
        modaltxt2:"",
        modaltxt3:""
      };
    }

    // Captures the values from input box to state after the validation
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        },()=>{
            if(isNaN(this.state.bill) || isNaN(this.state.customtip) || (isNaN(this.state.people) || (parseFloat(this.state.people))===0)){
                let handleCloseCopy = this.state.handleClose.bind(this);
                if(name === "customtip"){
                    this.setState({customtip:"", tipamount:"NAN", total:"", custom:false, show:true, 
                              handleClose: handleCloseCopy});
                }else if(name === "people"){
                    this.setState({people:"", split:false, tipamount:"NAN", total:"", custom:false, show:true, 
                              handleClose: handleCloseCopy});
                }else{
                    this.setState({bill:"", customtip:"", tipamount:"NAN", total:"", custom:false, show:true, 
                                handleClose: handleCloseCopy});
                }
            };
        });
        
    };

    //calculates tip based on user option
    calculateTip = (tip,type) => {
        let tipamount, total, billamount;
        //if user does not pick split option
        if(this.state.split===false){
            if(this.state.custom===true){
                if(type==="dollar"){
                    billamount=(parseFloat(this.state.bill)).toFixed(2);
                    tipamount=(parseFloat(this.state.customtip)).toFixed(2);
                    total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                    let handleCloseCopy = this.state.handleClose.bind(this);
                    this.setState({bill:"", billamount, tipamount, total, custom:false, customtip:"",show:true, handleClose:handleCloseCopy, 
                    modaltxt1:"The Bill: ", modaltxt2:"The Tip: ", modaltxt3:"The Total with Tip: "});
                }else if(type==="percent"){
                    billamount=(parseFloat(this.state.bill)).toFixed(2);
                    tipamount=(this.state.bill*(this.state.customtip/100)).toFixed(2);
                    total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                    let handleCloseCopy = this.state.handleClose.bind(this);
                    this.setState({bill:"", billamount, tipamount, total, custom:false, customtip:"",show:true, handleClose:handleCloseCopy,
                    modaltxt1:"The Bill: ", modaltxt2:"The Tip: ", modaltxt3:"The Total with Tip: "});
                }
            }
            if(tip !== 9999 && this.state.custom !== true){
                billamount=(parseFloat(this.state.bill)).toFixed(2);
                tipamount=(this.state.bill*(tip/100)).toFixed(2);
                total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                let handleCloseCopy = this.state.handleClose.bind(this);
                this.setState({bill:"", billamount, tipamount, total, show:true, handleClose:handleCloseCopy, 
                modaltxt1:"The Bill: ", modaltxt2:"The Tip: ", modaltxt3:"The Total with Tip: "});
            }
            else if(tip === 9999 ){
                this.setState({custom:true});
            }
        }
        //if user picks split option
        else if(this.state.split===true && this.state.people>0){
            if(this.state.custom===true){
                if(type==="dollar"){
                    billamount=(parseFloat(this.state.bill)).toFixed(2);
                    tipamount=(parseFloat(this.state.customtip)).toFixed(2);
                    total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                    let handleCloseCopy = this.state.handleClose.bind(this);
                    billamount=(billamount/this.state.people).toFixed(2);
                    tipamount=(tipamount/this.state.people).toFixed(2);
                    total=(total/this.state.people).toFixed(2);
                    this.setState({bill:"", split:false, people:"",billamount, tipamount, total, custom:false, customtip:"",show:true, handleClose:handleCloseCopy,
                    modaltxt1:"The Bill For Each Person: ", modaltxt2:"The Tip For Each Person: ", modaltxt3:"The Total with Tip For Each Person: "});
                }else if(type==="percent"){
                    billamount=(parseFloat(this.state.bill)).toFixed(2);
                    tipamount=(this.state.bill*(this.state.customtip/100)).toFixed(2);
                    total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                    let handleCloseCopy = this.state.handleClose.bind(this);
                    billamount=(billamount/this.state.people).toFixed(2);
                    tipamount=(tipamount/this.state.people).toFixed(2);
                    total=(total/this.state.people).toFixed(2);
                    this.setState({bill:"", split:false, people:"", billamount, tipamount, total, custom:false, customtip:"",show:true, handleClose:handleCloseCopy,
                    modaltxt1:"The Bill For Each Person: ", modaltxt2:"The Tip For Each Person: ", modaltxt3:"The Total with Tip For Each Person: "});
                }
            }
            if(tip !== 9999 && this.state.custom !== true){
                billamount=(parseFloat(this.state.bill)).toFixed(2);
                tipamount=(this.state.bill*(tip/100)).toFixed(2);
                total=(parseFloat(this.state.bill)+parseFloat(tipamount)).toFixed(2);
                let handleCloseCopy = this.state.handleClose.bind(this);
                billamount=(billamount/this.state.people).toFixed(2);
                tipamount=(tipamount/this.state.people).toFixed(2);
                total=(total/this.state.people).toFixed(2);
                this.setState({bill:"", split:false, people:"", billamount, tipamount, total, show:true, handleClose:handleCloseCopy,
                modaltxt1:"The Bill For Each Person: ", modaltxt2:"The Tip For Each Person: ", modaltxt3:"The Total with Tip For Each Person: "});
            }
            else if(tip === 9999 ){
                this.setState({custom:true});
            }
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
                    <PopUps show={this.state.show} handleClose={this.state.handleClose} bill={this.state.billamount} 
                            tipamount={this.state.tipamount} total={this.state.total} modaltxt1={this.state.modaltxt1} 
                            modaltxt2={this.state.modaltxt2}  modaltxt3={this.state.modaltxt3}>

                    </PopUps>
                    <div className="row mt-5">
                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <label style={{fontWeight: "bold", color:"orange"}}>Enter the bill amount</label>
                            <Input
                                value={this.state.bill}
                                onChange={this.handleInputChange}
                                name="bill"
                                placeholder="Bill Amount" 
                            />
                        </div>
                    </div>
                    { this.state.bill ? (
                        <div className="row">
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                <label style={{color: "#0f1828"}}>Split By People </label><br/>
                                <Button style={{backgroundColor: "lightgreen", fontWeight: "bold", color:"purple"}}
                                    disabled={!(this.state.bill)}
                                    onClick=
                                    {(event) => 
                                        {
                                        event.preventDefault();
                                        this.setState({split:true})
                                        }
                                    } 
                                >
                                    Split By People
                                </Button>
                                { this.state.split ? (
                                    <div className="row mt-3"> 
                                        <div className="col-9 col-sm-8 col-md-7 col-lg-5 col-xl-5 ">
                                            <Input
                                                value={this.state.people}
                                                onChange={this.handleInputChange}
                                                name="people"
                                                placeholder="#" 
                                            style={{width:"75px"}}/>
                                        </div>
                                    </div>
                                ):(
                                    null
                                )}
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                {this.state.percent.map((percent,index) => (
                                    <FormBtn 
                                        key={index}
                                        disabled={(this.state.custom || (this.state.split===true && this.state.people<=0))}
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
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <p style={{fontWeight: "bold", color:"orange"}}>To Calculate Tip enter the amount on the bill </p>
                            </div>
                            <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"></div>
                        </div>
                    )}
                    { this.state.custom ? (
                        <div className="row">
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
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
                            <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 " ></div>
                        </div>
                            
                    ) : (
                        null
                    )}
                </form>

            </div>
        );
    }
}

export default TipPercent;