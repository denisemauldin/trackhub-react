import { connect } from "react-redux"
import { hideModal } from "store/actions/app-actions"
import PropTypes from "prop-types"
import React from "react"
import styles from "./app-modals.scss"

class AppModals extends React.Component {

  handleOkClick = () => {
    this.props.modal.okCallback()
    this.context.store.dispatch(hideModal())
  }

  handleCancelClick = () => {
    this.props.modal.cancelCallback()
    this.context.store.dispatch(hideModal())
  }

  render() {
    const {
      modal
    } = this.props

    const typeClass = modal && styles[modal.type]
      ? styles[modal.type]
      : ""

    if (!modal) {
      return null
    }

    return (
      <div className={styles.wrapper}>
        <div className={`${styles.modal} ${typeClass}`}>
          <div className={`${styles.heading} ${typeClass}`}>
            <div className={styles.container}>
              <p>{modal.heading}</p>
            </div>
          </div>
          <div className={`${styles.content} ${typeClass}`}>
            <div className={styles.container} dangerouslySetInnerHTML={{ __html: modal.content }} />
          </div>
          <div className={`${styles.actions} ${typeClass}`}>
            <div className={styles.container}>
            <div>
                <button onClick={this.handleOkClick}>OK</button>
              </div>
              <div className={styles.cancel}>
                <button className="secondary" onClick={this.handleCancelClick}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    modal: store.app.modal
  }
}

AppModals.contextTypes = {
  store: PropTypes.object
}

export default connect(mapStateToProps)(AppModals)
