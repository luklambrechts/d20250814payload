const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Redirect www to non-www
  const wwwRedirect = {
    source: '/:path*',
    has: [
      {
        type: 'host',
        value: 'www.lenoweb.be',
      },
    ],
    destination: 'https://lenoweb.be/:path*',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, wwwRedirect]

  return redirects
}

export default redirects
