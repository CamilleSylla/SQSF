import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../context/userLog'
import style from '../styles/dashboardmenu.module.scss'

export default function DashboardMenu () {
    const [user, setUser] = useContext(UserContext)
    const Disconnect = ()  => {
        setUser(null)
    }
    return (
        <>
        <div className={style.dashboard_menu_wrapper}>
            <div className={style.dashboard_pp_wrapper}>
                <Image
                  src={user.profile_picture ? user.profile_picture : "/image.svg"}
                  alt="profile picture"
                  layout="fill"
                  sizes="100%"
                  objectFit="contain"
                />
            </div>
            <ul>
                <li><Link href={`/dashboard/${user.society}`}><a>Tableau de bord</a></Link></li>
                <li><Link href={`/dashboard/commandes/${user.id}`}><a>Commandes</a></Link></li>
                <li><Link href={`/dashboard/produits/${user.society}`}><a>Produits</a></Link></li>
                <li>Rapports</li>
                <li><Link href={`/dashboard/profil_info/${user.society}`}><a>Profil</a></Link></li>
                <li>Messages</li>
                <li ><Link href={`/`}><a onClick={Disconnect}>Déconnexion</a></Link></li>
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