import React from 'react'
import Layout from "../components/Layout";
import { Component } from "react";
import apiService from "../lib/apiService";
import { Col, FormGroup, Label, Input, Card, CardTitle, CardColumns,CardSubtitle } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import { withRedux } from '../lib/redux'
import { connect } from 'react-redux';

const states = process.env.STATES.split(' ').map((st) => {
  return st.replace('-', ' ')
})
export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: props.state,
      type: props.type,
      brewsList: [],
      br: {}
    };
  }
  static async getInitialProps({ reduxStore }) {
    const { dispatch } = reduxStore
    
    let addToStore
    const data = reduxStore.getState().data
    console.log(data)
    if (!data) {
      let allData = await Promise.all(
        states.map( async (el) => {
          let call = await apiService(`/breweries/search?query=${el}`)
          return call.data
        })
      )
      addToStore = [].concat.apply([], allData)
      dispatch({ type: 'ADD_DATA', payload: addToStore })
    } else {
      addToStore = data
    }
    return { brews: addToStore }
  }

  handleStateChange = (event) => {
    this.props.dispatch({ type: 'CHANGE_STATE', payload: event.target.value })
    this.setState({
      state: event.target.value,
    }, () => {
      if (this.state.type !== '') {
        this.setState({
          brewsList: this.state.brews.filter(el => {
            return el.state === this.state.state && el.brewery_type === this.state.type
          }),
          br: {}
        })
      }
    })
  }

  handleTypeChange = (event) => {
    this.props.dispatch({ type: 'CHANGE_TYPE', payload: event.target.value })
    this.setState({
      type: event.target.value,
    }, () => {
      if (this.state.state !== '') {
        this.setState({
          brewsList: this.state.brews.filter(el => {
            return el.state === this.state.state && el.brewery_type === this.state.type
          }),
          br: {}
        })
      }
    })
  }

  handleBrew = (e, data) => {
    this.setState({
      br: data
    })
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  componentDidMount() {
    const { brews } = this.props;
    this.setState({
      brews: JSON.parse(JSON.stringify(brews)),
    }, () => {
      this.setState({
        brewsList: this.state.brews.filter(el => {
          return el.state === this.state.state && el.brewery_type === this.state.type
        })
      })
    })
  }

  render() {
    return (
      <Layout>
        <h4>Powered By</h4>
        <img className="headImg" src="/static/obd.png" alt="Open Brewery DB" />
        <div>
          <FormGroup row>
            <Label className="labels" for="stateSelect" sm={2}>
              State
            </Label>
            <Col sm={10}>
              <Input
                className="selects"
                value={this.state.state}
                onChange={this.handleStateChange}
                type="select"
                name="state"
                id="stateSelect"
              >
                {states.map((el, i) => {
                  return <option 
                    key={i}
                    value={el}>{el}
                  </option>
                })}
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="typeSelect" className="labels" sm={2}>
              Type
            </Label>
            <Col sm={10}>
              <Input
                className="selects"
                value={this.state.type}
                onChange={this.handleTypeChange}
                type="select"
                name="type"
                id="typeSelect"
              >
                <option value={"micro"}>Micro</option>
                <option value={"brewpub"}>Pub</option>
                <option value={"planning"}>Planning</option>
                <option value={"contract"}>Contract</option>
                <option value={"proprietor"}>Proprietor</option>
                <option value={"regional"}>Regional</option>
                <option value={"large"}>Large</option>
              </Input>
            </Col>
          </FormGroup>
        </div>
        <CardColumns>
          {this.state.brewsList.map((value, index) => {
            return (
                    <Card 
                      key={index}
                      body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                      <CardTitle>{value.name}</CardTitle>
                      <CardSubtitle>{value.city}, {value.state}</CardSubtitle>
                      <Link 
                        href="/brew/[id]" 
                        as={`/brew/${value.id}`}>
                        <a>Brew</a>
                      </Link>
                    </Card>
            )
          })}
        </CardColumns>
      </Layout>
    );
  }
}

const mapState = (state) => { 
  return {
    state: state.initState,
    type: state.initType
  }
}

export default withRedux(connect(
  mapState
)(Index))
