import objStyle from './Content.module.scss'
import classNames from 'classnames/bind'
function Content({ children }) {
    var cv = classNames.bind(objStyle)
    let Element = children
    return (
        <div className={cv('wrapper')}>
            <Element />
        </div>
    );
}

export default Content;