import './App.css'

function App() {
  return (
    <div className="container">
      <div />

      <main>
        <div className="hero">
          <h1 className="title">GraphQL API to power your Nounish ideas</h1>
          <div className="hero__buttons">
            <a className="btn" href="https://api.nounishdata.com/graphql">
              Try it now
            </a>
            <a className="btn btn--secondary" href="https://nounslist.com/">
              See it in action
            </a>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>
          by <a href="https://twitter.com/gregskril/">@gregskril</a>
        </span>
        <span>
          code on <a href="https://github.com/gskril/nouns-api">github</a>
        </span>
      </footer>
    </div>
  )
}

export default App
