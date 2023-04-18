import objStyle from './Content.module.scss'
import classNames from 'classnames/bind'
function Content(obj) {
    var cv = classNames.bind(objStyle)
    console.log(obj.func)
    return (
        <div className={cv('wrapper')}>
            {/* {children} */}
            <obj.Element func={obj.func} />
        </div>
    );
}

export default Content;