import Head from 'next/head'
import Router from 'next/router'
import Nprogress from 'nprogress'

Router.onRouteChangeStart = url => {
  Nprogress.start()
}

Router.onRouteChangeComplete = () => Nprogress.done()
Router.onRouteChangeError = () => Nprogress.done()

export default ({ children, title }) => (
  <div className="root">
    <Head>
      <title>Brews</title>
    </Head>
    <header>
    </header>
    <h1>{title}</h1>
      {children}
    <footer>&copy; {new Date().getFullYear()}</footer>
    <style jsx>{`
      .root {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem;
        background: #f0f0f0;
      }

      header {
        width: 100%;
        display: flex;
        justify-content:space-around;
        padding: 1em;
        font-size: 1.2 rem;
        background: rgb(56, 54, 54);
      }

      header a {
        color: darkgrey;
        text-decoration: none;
      }

      header a:hover {
        font-weight: bold;
        color: lightgrey;
      }

      footer {
        padding: 1em;
      }
    `}</style>

  </div>
)