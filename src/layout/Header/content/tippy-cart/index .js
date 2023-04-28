import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
function TippyCart() {
    var [state, setState] = useState(
        [
            {
                type: 'language',
                datalist: [
                    {
                        name: 'tieng viet'
                    },
                    {
                        name: 'tieng anh'
                    },
                    {
                        name: 'tieng trung',
                        child: {
                            type: 'china language',
                            datalist: [
                                {
                                    name: 'tieng trung 1'
                                },
                                {
                                    name: 'tieng trung 2'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    )
    var dataTippy = () => {
        let data = state[state.length - 1];
        return data.datalist.map(item => {
            if (item.child == undefined) {
                return <div>{item.name}</div>
            }
            else {
                return <div onClick={() => {
                    setState(preState => ([...preState, item.child]))
                }}>{item.name}</div>
            }

        }
        )
    }
    return (
        <div>
            <div>{state[state.length - 1].type}</div>
            {dataTippy()}
        </div>
    )
}
export default TippyCart