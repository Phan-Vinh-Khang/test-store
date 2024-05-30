import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
let cv = classNames.bind(objStyle)
function WrapperContent({ children }) {
    const Element = children;
    return (
        <div className={cv('wrapper')}>
            {children()}
        </div>
    );
}
export default WrapperContent;