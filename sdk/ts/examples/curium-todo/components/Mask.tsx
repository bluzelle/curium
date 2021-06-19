import {ReactChild} from "react";
import {Spinner} from "react-bootstrap";

export const Mask = ({show, children}: {show: boolean, children: ReactChild[]}) => show ? (
    <div  style={{color: '#999'}}>
        {children}
        <div style={{position: 'absolute', textAlign: "center", ...style}}>
            <Spinner animation="border" />
        </div>
    </div>
) : (
    <div>
        {children}
    </div>
)

const style = {
    height: '100%',
    width: '100%',
    opacity: .6,
    backgroundColor: '#eee',
    top: 0,
    left: 0,
    padding: 20
}