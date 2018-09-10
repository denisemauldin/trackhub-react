import React, { Component } from 'react'
import { fetchTrackhubs } from 'store/actions/firebase-actions'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styles from "./trackhublist.scss"

class TrackhubList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.context.store.dispatch(fetchTrackhubs())
  }

  render() {
    if (this.props.loading) {
      return <div className={styles.homepage}>Loading trackhub list</div>
    }
    if (!this.props.trackhubs) {
      return null
    }
    if (this.props.trackhubErrorMessage) {
      return <div className={styles.homepage}>Failed to load trackhubs {this.props.trackhubErrorMessage}</div>
    }
    if (this.props.trackhubs.length === 0) {
      return <div className={styles.homepage}>No trackhubs in list.</div>
     }

    return(
      <div className={styles.homepage}>
        { this.props.trackhubs.map((trackhub,i) => {
        return <div key={i + trackhub.data.hubName}>{trackhub.data.hubName} - {trackhub.data.shortLabel}</div>
        })}
      </div>
    )
  }
}

TrackhubList.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = function(store) {
  return {
    errorMsg: store.firebase.trackhubErrorMessage,
    trackhubs: store.firebase.trackhubs,
    loading: store.firebase._loading
  }
}

export default connect(mapStateToProps)(TrackhubList)