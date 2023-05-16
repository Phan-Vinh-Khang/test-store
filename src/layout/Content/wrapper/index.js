import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
function WrapperContent({ children }) {
    let cv = classNames.bind(objStyle)
    let Element = children
    return (
        <div className={cv('wrapper')}>
            <Element />
        </div>
    );
}

export default WrapperContent;