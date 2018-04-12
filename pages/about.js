import React, { Component } from 'react'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import get from 'lodash/get'

const apiEndpoint = 'https://seedly.prismic.io/api/v2'

class About extends Component {
  static async getInitialProps (context) {
    const response = await Prismic.getApi(apiEndpoint).then(api => {
      return api.query('') // An empty query will return all the documents
    })

    const doc = get(
      response,
      'results[3].data'
    )

    return { doc }
  }

  componentDidUpdate () {
    this.refreshToolbar()
  }

  refreshToolbar () {
    // Start an experiment if there is one
    const maybeCurrentExperiment = this.state.api.currentExperiment()
    if (maybeCurrentExperiment) {
      window.PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId())
    }

    // Launch the prismic.io toolbar
    window.PrismicToolbar.setup(apiEndpoint)
  }

  render () {
    const { doc } = this.props

    if (!doc) return null

    if (doc) {
      const investorsGallery = doc.investorsImg.map((investor, index) => {
        return <img key={index} src={investor.image.url} />
      })

      return (
        <div>
          {RichText.render(doc.intro)}
          {RichText.render(doc.investors)}
          <div>
            {investorsGallery}
          </div><br /><br />
          {RichText.render(doc.joinUs)}
        </div>
      )
    }
  }
}

export default About
