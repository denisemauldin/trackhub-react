import { connect } from "react-redux"
import { loadPageData } from "store/actions/page-actions"
import { withRouter } from "react-router"
import PropTypes from "prop-types"
import React from "react"

export default function hocPageLoader(WrappedComponent) {

 class HOCPageLoader extends React.Component {

  static loadData(storeDispatch, params) {
   return WrappedComponent.loadData
    ? WrappedComponent.loadData(storeDispatch, params)
    : Promise.resolve(true)
  }

  constructor(props) {
   super(props)

   this._isLoadingData = false
  }

  checkData() {
   if (WrappedComponent.checkData) {
    return WrappedComponent.checkData(this.props)
   }

   return this.props.apiData
  }

  checkDataAndLoad() {
   // if the data is not valid and isn't arleady being loaded
   // load the data duh
   if (!this._isLoadingData && !this.checkData()) {
    this._isLoadingData = true

    HOCPageLoader.loadData(this.context.store.dispatch, this.props.match.params)
     .then(() => { this._isLoadingData = false })
   }
  }

  componentDidMount() {
   this.checkDataAndLoad()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
   this.checkDataAndLoad()
  }
  
  render() {
   if (!this.checkData()) {
    return <div>Loading...</div>
   }

   return <WrappedComponent {...this.props} />
  }
 }

 HOCPageLoader.contextTypes = {
  store: PropTypes.object
 }

 const mapStateToProps = function (store) {
  return {
   apiData: store.page
  }
 }

 return withRouter(
  connect(mapStateToProps)(HOCPageLoader)
 )
}