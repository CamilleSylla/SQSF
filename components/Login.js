import Image from 'next/image'
import style from '../styles/login.module.scss'

export default function Login () {

    return (
        <>
            <div className={style.login_wrapper}>
                <div className={style.login_img}>
                <Image
              src="/login.svg"
              alt="imagecont"
              layout="fill"
              sizes="100%"
              objectFit="contain"
            />
                </div>
            <form>
                <div className={style.form_img}>
                <Image
              src="/sqmarket.svg"
              alt="imagecont"
              width="auto"
         height="50%"
            />
                </div>
                <input type="email" placeholder="Adresse e-mail"/>
                <input type="password" placeholder="Mot de passe"/>
                <input type="button" value="Connection" className={style.connection_btn}/>
            </form>
            </div>
        </>
    )
}