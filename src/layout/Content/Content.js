import objStyle from './Content.module.scss'
import classNames from 'classnames/bind'
function Content({ children }) {
    var cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            {children}
        </ div>
    );
}

export default Content;