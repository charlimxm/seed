import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Prismic from 'prismic-javascript'
import qs from 'qs'
import Router from 'next/router'

const PREVIEW_EXPIRES = 1 / 48 // 30 minutes

const linkResolver = function (doc) {
  if (doc.type === 'about') return '/about'
  return '/'
}

class Preview extends Component {
  componentDidMount () {
    const params = qs.parse(window.location.search.slice(1))
    console.log(window.location.search);
    const apiEndpoint = 'https://seedly.prismic.io/api/v2'
    Prismic.api(apiEndpoint).then(api => {
      api.previewSession(params.token, linkResolver, '/').then((url) => {
        Cookies.set(Prismic.previewCookie, params.token, { expires: PREVIEW_EXPIRES })
        Router.push(url)
      })
    })
  }

  render () {
    return <p>Loading preview...</p>
  }
}

export default Preview
