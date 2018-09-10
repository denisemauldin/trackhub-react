import React, { Component } from 'react'
import { fetchTrackhubs } from 'store/actions/firebase-actions'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styles from "./trackhublist.scss"

class TrackhubList extends Component {
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
    console.error("Trackhublist", error, info)
  }

  componentWillMount() {
    this.context.store.dispatch(fetchTrackhubs())
  }


  handleTrackhubListClick = (event) => {
    const item = event.currentTarget
    const trackhubIndex = parseInt(item.getAttribute("data-trackhubindex"))
    const selectedTrackhub = this.props.trackhubs[trackhubIndex]
    this.setState({'selectedTrackhub': selectedTrackhub })
    this.props.onTrackhubListClick(selectedTrackhub)
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

    return (
      <div className={styles.homepage}>
        <ul className={styles.list}>
          {this.props.trackhubs.map((trackhub, i) => {
            const selectedClass = trackhub === this.state.selectedTrackhub
              ? styles.isSelected
              : "";

            return (
              <li
                key={i + trackhub.data.hubName}
                className={`${styles.item} ${selectedClass}`}
                onClick={this.handleTrackhubListClick}
                data-trackhubindex={i}
              >
                <div className={styles.details}>
                  <div className={styles.hubName}>
                    {trackhub.data.hubName}
                  </div>
                  <div className={styles.shortLabel}>
                    {trackhub.data.shortLabel} - {trackhub.data.genome } ({trackhub.data.samples.length})
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

TrackhubList.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = function (store) {
  return {
    errorMsg: store.firebase.trackhubErrorMessage,
    trackhubs: store.firebase.trackhubs,
    loading: store.firebase._loading
  }
}

export default connect(mapStateToProps)(TrackhubList)