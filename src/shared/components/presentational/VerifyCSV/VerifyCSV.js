import React, { Component } from "react";

class VerifyCSV extends Component {
  constructor(props){
    super(props);
  }
  verifyHeader = (props) => {
    if(props[0][0] === "URL" && 
       props[0][1] === "shortLabel" && 
       props[0][2] === "longLabel" && 
       props[0][3] === "color") {
         return true
       } else {
        return false
       }  
  }
  
  // TODO: make this its own component
  isEmpty = (value) => {return value = ""}
  removeEmpty = (props) => {
    let notEmpty = props.filter((entry) => {
     let count = 0;
      for(let i = 0; i < entry.length; i++) {
        if (entry[i] === "") {
          count ++
        }
      }
      if (count === entry.length) return false;
      return true;
    });
    return notEmpty
  }

  cleanEntry = (props) => {
    props.map((entry) => {
      for(let i = 0; i < entry.length; i++){
        entry[i] = entry[i].trim();
      }
    });
    return props;
  }

}

export default VerifyCSV