import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import SlideLogin from '../Slide';
function Login() {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            {/* slide */}
            <SlideLogin></SlideLogin>
            <div className={cv('form-Login')}>
                <div className={cv('wrapper-Login-center')}>
                    <div className={cv('wrapper-Login-label')}>
                        <label>Đăng nhập</label>
                        <div>
                            <label>Đăng với QR</label>
                            <a href="/"><label>QR</label></a>
                        </div>
                    </div>
                    <div className={cv('wrapperForm')}>
                        <form>
                            <input class="form-control" type="text" placeholder="Tên đăng nhập...." aria-label="default input example" />
                            <input class="form-control" type="text" placeholder="Mật khẩu...." aria-label="default input example" />
                            <div class="d-grid gap-2">
                                <button class="btn" type="button">Đăng nhập</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;