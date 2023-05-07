import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from '../index.module.scss'
function TippyCart({ data }) {
    let cv = classNames.bind(objStyle)
    const [state, setState] = useState(data)
    var dataTippy = () => {
        let data = state[state.length - 1];
        return data.datalist.map(item => {
            if (item.child == undefined)
                return <div>{item.name}</div>
            else return <div onClick={() => {
                setState(preState => ([...preState, item.child]))
            }}>{item.name}</div>
        }
        )
    }
    return (
        <div>
            {
                (state == '') ? (<div className={cv('size-NoProducts')}>Chưa Có Sản Phẩm</div>) : (<div className={cv('size-Products')}><div>{state[state.length - 1].type}</div>{dataTippy()} </div>)
            }

        </div>
    )
}
export default TippyCart