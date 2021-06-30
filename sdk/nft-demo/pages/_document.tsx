import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html style={{background: '#0f0921', height: '100%', textAlign: 'center'}}>
                <Head />
                <body>
                <header style={{padding: 50}}>
                    <img src="logo.png"/>
                </header>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument