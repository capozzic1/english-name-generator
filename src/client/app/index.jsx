import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.jsx';
import {Col} from 'react-bootstrap';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './../styles/app.scss';
import axios from 'axios';


//test
class Container extends React.Component {
  constructor() {

    super();

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      names: [],
      boyNames: [],
      girlNames: [],
      boy25:[],
      girl25:[],
      ready: false,
      btnMsg: "Loading"
    }
  }

  componentDidMount(){
      this.getData();

  }

  handleClick(){
    this.choose25();

  }

  getData(){
    axios.get('/names')
    .then(response => {
    //console.log(response.data[0].sex);

      this.setState({
        names: response.data
      })

      this.separateNames();

    })
    .catch(function(error){
      console.log(error);
    });
  }

  separateNames() {
  let len = this.state.names.length;

    for (let i = 0; i < len; i++){

      if (this.state.names[i].sex == "M" ) {

        let newBoys = this.state.boyNames.slice();
        newBoys.push(this.state.names[i]);
        this.setState({
          boyNames : newBoys
        })
      } else {
        let newGirls = this.state.girlNames.slice();
        newGirls.push(this.state.names[i]);
        this.setState({
          girlNames: newGirls
        })
      }
    }

    this.setState({
      ready: true,
      btnMsg: "Generate"
    })


  }

  choose25(){
    let newBoyNames = [];
    let newGirlNames = [];
    let counter = 0;

    while (counter < 25){
      //Boys/girls have different array lengths so therefore need
      //different random numbers.
      let boyLength = this.state.boyNames.length - 1;
      let girlLength = this.state.boyNames.length - 1;
      let randomNumBoy = Math.floor(Math.random() * (boyLength - 0 + 1)) + 0;
      let randomNumGirl = Math.floor(Math.random() * (girlLength - 0 + 1)) + 0;
      let currentBoy = this.state.boyNames[randomNumBoy];
      let currentGirl = this.state.girlNames[randomNumGirl];
      newBoyNames.push(currentBoy);
      newGirlNames.push(currentGirl);
      counter++;
    }

    this.upperCase(newBoyNames, newGirlNames);

    this.setState({
      boy25: newBoyNames,
      girl25: newGirlNames
    })

  }

  upperCase(arr1, arr2){

    for (let i = 0, j=0,
      len1 = arr1.length,
      len2 = arr2.length;
      i < len1,
      j < len2;
      i++,
      j++){

        arr1[i].name = arr1[i].name.charAt(0).toUpperCase() + arr1[i].name.slice(1);
        arr2[j].name = arr2[j].name.charAt(0).toUpperCase() + arr2[j].name.slice(1);
    }

    return arr1, arr2;

  }


  render() {
        console.log(this.state.btnMsg);
    return (
      <Grid>
        <Row className="header-button">
          <Col md={12}>
            <h2 className="h2-header text-center">The English Name Generator</h2>
          </Col>
          <Row>
            <Col md={12}>
              <Button className="center-block" onClick={this.handleClick}>
                {this.state.btnMsg}
              </Button>
            </Col>
          </Row>
        </Row>
        <Row className="boy-girl-h2">
          <Col md={12} className="boy-girl-wrap">
            <div className="boy-h2">
              <h2>Boy names</h2>
            </div>
            <div className="girl-h2">
              <h2>Girl names</h2>
            </div>
          </Col>
        </Row>
        <Row className="names-container">
          <Col md={12} className="list-container">
            <div className="boys-list">
              <List names={this.state.boy25} ready={this.state.ready} />
            </div>
            <div className="girls-list">
              <List names={this.state.girl25} ready={this.state.ready}/>
            </div>
          </Col>
        </Row>
      </Grid>

    );
  }
}

ReactDOM.render(
  <Container/>, document.getElementById('app'));
