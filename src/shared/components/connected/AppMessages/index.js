import { connect } from "react-redux"
import AppMessage from "presentational/AppMessage"
import React from "react"
import styles from "./app-messages.scss"

class AppMessages extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            closedMessages: []
        }
    }

    handleMessageClose = (messageId) => {
        this.setState({
            closedMessages: [...this.state.closedMessages, messageId]
        })
    }

    render() {
        const {
            messages
        } = this.props
        if (!messages) {
            return null
        }
        return (
            <div className={styles.wrapper}>
                <div className={styles.messages}>
                    {
                        messages.map(data => {
                            return this.state.closedMessages.indexOf(data.id) !== -1
                                ? null
                                : <AppMessage
                                    key={data.id}
                                    data={data}
                                    onCloseClick={this.handleMessageClose}
                                />
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        messages: store.app.messages
    }
}

export default connect(mapStateToProps)(AppMessages)
