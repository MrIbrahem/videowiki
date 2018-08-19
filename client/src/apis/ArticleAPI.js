import { httpGet, httpPost, makeCallback } from './Common'
import request from 'superagent'

function fetchArticle ({ title, mode, wikiSource }) {
  const edit = mode !== 'viewer'
  let url = `/api/wiki/article?title=${encodeURIComponent(title)}&edit=${edit}`
  
  if (wikiSource) {
    url += `&wikiSource=${wikiSource}`;
  }
  
  return httpGet(url).then(
    ({ text }) => ({
      article: JSON.parse(text),
    }),
  )
}

function fetchTopArticles () {
  const url = '/api/articles/top?limit=100'
  return httpGet(url)
    .then(
      ({ text }) => (JSON.parse(text)),
    )
    .catch((reason) => { throw { error: 'FAILED', reason } })
}

const makeFileUploadMethod = (method) =>
  (url, title, slideNumber, file, headers = {}) =>
    new Promise((resolve, reject) => {
      method(url)
      .set(headers)
      .field('title', title)
      .field('slideNumber', slideNumber)
      .attach('file', file)
      .on('progress', (event) => {
        const uploadStatus = event
        return {
          uploadStatus,
        }
      })
      .end(makeCallback(resolve, reject))
    })

function uploadContent ({ title, slideNumber, file }) {
  const url = '/api/wiki/article/upload'

  return makeFileUploadMethod(request['post'])(url, title, slideNumber, file).then(
    ({ body }) => ({
      uploadStatus: body,
    }),
  )
}

function uploadImageUrl ({ title, wikiSource, slideNumber, url }) {
  const uploadUrl = '/api/wiki/article/imageUpload'

  const data = {
    title,
    wikiSource,
    slideNumber,
    url,
  }

  return httpPost(uploadUrl, data).then(
    ({ body }) => ({
      uploadStatus: body,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}

function fetchConversionProgress ({ title, wikiSource }) {
  const url = `/api/articles/progress?title=${title}&wikiSource=${wikiSource}`

  return httpGet(url)
    .then(
      ({ text }) => (JSON.parse(text)),
    )
    .catch((reason) => { throw { error: 'FAILED', reason } })
}

function publishArticle ({ title, wikiSource }) {
  let url = `/api/articles/publish?title=${title}`
  
  if (wikiSource) {
    url += `&wikiSource=${wikiSource}`
  }

  return httpGet(url)
    .then(
      ({ text }) => (text),
    )
    .catch((reason) => { throw { error: 'FAILED', reason } })
}

function fetchContributors ({ title }) {
  const url = `/api/articles/contributors?title=${title}`

  return httpGet(url).then(
    ({ body }) => ({
      contributors: body.contributors,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}

function fetchArticleCount () {
  const url = '/api/articles/count'

  return httpGet(url).then(
    ({ body }) => ({
      count: body.count,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}

function fetchAllArticles ({ offset }) {
  const url = `/api/articles/all?offset=${offset}`

  return httpGet(url).then(
    ({ body }) => ({
      articles: body.articles,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}

function fetchDeltaArticles ({ offset }) {
  const url = `/api/articles/all?offset=${offset}`

  return httpGet(url).then(
    ({ body }) => ({
      articles: body.articles,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}


function fetchImagesFromWikimediaCommons ({ searchText }) {
  const url = `/api/articles/wikimediaCommons/images?searchTerm=${searchText}`

  return httpGet(url).then(
    ({ body }) => ({
      images: body.images,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}


function fetchGifsFromWikimediaCommons ({ searchText }) {
  const url = `/api/articles/wikimediaCommons/gifs?searchTerm=${searchText}`

  return httpGet(url).then(
    ({ body }) => ({
      gifs: body.gifs,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}

function fetchImagesFromBing ({ searchText }) {
  const url = `/api/articles/bing/images?searchTerm=${searchText}`

  return httpGet(url).then(
    ({ body }) => ({
      images: body.images,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}

function fetchGifsFromGiphy ({ searchText }) {
  const url = `/api/articles/gifs?searchTerm=${searchText}`

  return httpGet(url).then(
    ({ body }) => ({
      gifs: body.gifs,
    }),
  ).catch((reason) => { throw { error: 'FAILED', reason } })
}

export default {
  fetchArticle,
  uploadContent,
  uploadImageUrl,
  fetchTopArticles,
  fetchConversionProgress,
  publishArticle,
  fetchContributors,
  fetchArticleCount,
  fetchAllArticles,
  fetchImagesFromWikimediaCommons,
  fetchGifsFromWikimediaCommons,
  fetchImagesFromBing,
  fetchGifsFromGiphy,
  fetchDeltaArticles,
}
