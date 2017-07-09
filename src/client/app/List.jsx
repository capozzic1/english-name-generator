import React from 'react';

class List extends React.Component {
  render(){
    let namesObj = this.props;
    let ready = this.props.ready;
    let listItems;

    if(ready) {
      listItems = namesObj.names.map((obj, i) =>
          <li key={i}>{obj.name}</li>
      )
    }
    //  console.log(namesObj);

    return (
      <ul className="list">{listItems}</ul>
    );
  }
}

module.exports = List;
