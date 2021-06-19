import 'bootstrap/dist/css/bootstrap.css'
import 'mobx-react/batchingForReactDom'

export default ({Component, pageProps}) => {
    return (
        <div style={{width: 400, margin: "auto"}}>
            <h1 style={{textAlign: 'center'}}>Curium Todo Demo</h1>
            <Component {...pageProps} />
        </div>
    )
}


