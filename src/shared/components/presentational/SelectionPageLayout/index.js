import React from "react"
import styles from "./selection-page-layout.scss"

export function SelectionPageBanner(props) {
  const {
    children = null
  } = props

  const childrenArray = React.Children.toArray(children)
  const leftChild = childrenArray[0] || null
  const rightChild = childrenArray[1] || null

  return (
    <div className={styles.banner}>
      <div className={styles.bannerHeading}>
        { leftChild }
      </div>
      <div className={styles.bannerCopy}>
        { rightChild }
      </div>
    </div>
  )
}

export function SelectionPageCentered(props) {
  const {
    children = null
  } = props

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.centeredContent}>
        { children }
      </div>
    </div>
  )
}

export function SelectionPageContent(props) {
  const {
    children = null,
    noFill = false,
    noPadding = false
  } = props

  const enhancementClasses = []
  if (noFill) {
    enhancementClasses.push(styles.noFill)
  }

  if (noPadding) {
    enhancementClasses.push(styles.noPadding)
  }

  return (
    <div className={`${styles.content} ${enhancementClasses.join(" ")}`}>
      { children }
    </div>
  )
}

export function SelectionPageRow(props) {
  const {
    children = null,
    hasSpacerBottom = false,
    hasSpacerTop = false,
    noFill = false,
    roundedBottom = false,
    roundedTop = false,
    verticalPadding = false
  } = props

  const childrenArray = React.Children.toArray(children)
  const enhancementClasses = []
  
  if (noFill) {
    enhancementClasses.push(styles.noFill)
  }
  
  if (roundedBottom) {
    enhancementClasses.push(styles.roundedBottom)
  }

  if (roundedTop) {
    enhancementClasses.push(styles.roundedTop)
    
  }
  if (verticalPadding) {
    enhancementClasses.push(styles.verticalPadding)
  }

  return (
    <React.Fragment>
      { !hasSpacerTop ? null : <div className={styles.rowSpacer} /> }
      <div className={styles.row}>
        {
          childrenArray.map((child, i) => {
            return (
              <div key={`child-${i}`} className={styles.col}>
                <div className={`${styles.colContent} ${enhancementClasses.join(" ")}`}>
                  { child }
                </div>
              </div>
            )
          })
        }
      </div>
      { !hasSpacerBottom ? null : <div className={styles.rowSpacer} /> }
    </React.Fragment>
  )
}

export function SelectionPageSpacer(props) {
  const {
    children = null
  } = props

  return (
    <div className={styles.spacer}>
      <div className={styles.centeredContent}>
        { children }
      </div>
    </div>
  )
}

export default function SelectionPageLayout(props) {
  const {
    children = null
  } = props

  // this layout has up to three children
  // all the children need to be the type SelectionPageContent
  const childrenArray = React.Children.toArray(children)
  const upperContent = childrenArray[0] || null
  const lowerContent = childrenArray[1] || null
  const footerContent = childrenArray[2] || null

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.upperContent}>
          <div className="pageContainer">
            <div className="contentContainer">
              { upperContent }
            </div>
          </div>
        </div>
        <div className={styles.lowerContent}>
          <div className="pageContainer">
            <div className="contentContainer">
              { lowerContent }
            </div>
          </div>
          { footerContent || null }
        </div>
      </div>
    </div>
  )
}