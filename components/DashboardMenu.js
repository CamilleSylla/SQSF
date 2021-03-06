import Image from 'next/image'
import style from '../styles/dashboardmenu.module.scss'

export default function DashboardMenu () {

    return (
        <>
        <div className={style.dashboard_menu_wrapper}>
            <div className={style.dashboard_pp_wrapper}>
                <Image
                  src="/image.svg"
                  alt="profile picture"
                  layout="fill"
                  sizes="100%"
                  objectFit="contain"
                />
            </div>
            <ul>
                <li>Menu</li>
                <li>Commandes</li>
                <li>Produits</li>
                <li>Rapports</li>
                <li>Profil</li>
                <li>Messages</li>
            </ul>

            <div className={style.branding}>
                <div className={style.branding_img}>
                <Image
                  src="/sqmarket.svg"
                  alt="profile picture"
                  layout="fill"
                  sizes="100%"
                  objectFit="contain"
                />
                </div>
            </div>
        </div>
        </>
    )
}