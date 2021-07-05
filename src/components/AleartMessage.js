import React, { Component } from 'react'

export class AleartMessage extends Component {
    render() {
        return (
            <div>
                {this.props.alertmess && 
                    <p style={{color:'red', fontSize:'40px' ,textAlign:'center'}}>
                        Please Enter correct city name ...!
                    </p>
        }
            </div>
        )
    }
}

export default AleartMessage