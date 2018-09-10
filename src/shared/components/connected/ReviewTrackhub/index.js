import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styles from "./reviewtrackhub.scss"
import DisplayTrackhub from "connected/DisplayTrackhub"
import TrackhubList from "connected/TrackhubList"

class ReviewTrackhub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'selectedTrackhub': null
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.error("ReviewTrackhub", error, info)
  }

  handleTrackhubListClick = (selectedTrackhub) => {
    this.setState({ 'selectedTrackhub': selectedTrackhub })
  }

  render() {
    return (
      <div className="pageContainer">
        <div className={`${styles.wrapper}`}>
          <div className={`appScrollable ${styles.leftCol}`}>
            <TrackhubList
              onTrackhubListClick={this.handleTrackhubListClick}
            />
          </div>
          <div className={`appScrollable ${styles.rightCol}`}>
            <DisplayTrackhub trackhub={this.state.selectedTrackhub} />
          </div>
        </div>
      </div>
    )
  }
}

ReviewTrackhub.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = function (store) {
  return {
    trackhubs: store.firebase.trackhubs,
  }
}

export default connect(mapStateToProps)(ReviewTrackhub)