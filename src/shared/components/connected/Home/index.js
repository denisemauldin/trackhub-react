import { loadPageData } from "store/actions/page-actions"
import axios from "axios"
import { Link } from "react-router-dom"
import hocPageLoader from "connected/hocPageLoader"
import React from "react"
import styles from "./home.scss"

class Home extends React.Component {

  // optional external data needs
  // static loadData(storeDispatch, params) {
  //  return storeDispatch(loadPageData(`https://jsonplaceholder.typicode.com/posts`))
  // }

  // optional custom data check
  // static checkData(props) {
  //  const {
  //   page: {
  //    slug: pageSlug
  //   }
  //  } = props

  //  return pageSlug === "homepage"
  // }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.homepage}>
        <div className={styles.containerBox}>
          <div className={styles.box}>
            <div className={styles.primaryBox}>
              <p className={styles.primary}>Generate Trackhubs</p>
            </div>
            <p className={styles.text}>Upload a CSV file of bigWig, bed, or vcfTabix files to create a trackhub</p>
            <div className={`${styles.centered} ${styles.buttonSpacer}`}><Link className="button" to="/generate">Get Started</Link></div>
          </div>
          <div className={styles.spacer}></div>
          <div className={styles.box}>
            <div className={styles.primaryBox}>
              <p className={styles.primary}>View Trackhubs</p>
            </div>
            <p className={styles.text}>View your custom trackhub in Biodalliance</p>
            <div className={`${styles.centered} ${styles.buttonSpacer}`}><Link className="button" to="/trackhublist">Visualize</Link></div>
          </div>
        </div>
      </div>
    )
  }
}

export default hocPageLoader(Home)
