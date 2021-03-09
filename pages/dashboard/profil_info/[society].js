import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/userLog";
import { storage } from "../../../firebase/firebase"

export default function ProfilInfos () {
    const [user, setUser] = useContext(UserContext)
    const [image, setImage] = useState(null)
    const [imageTransferred, setImageTransferred] = useState({
        bytes: 0,
        total: 0,
        nothing: "L'importation d'une image est obligatoire pour créer un produit"
    })

    const [updated, setUpdated] = useState({})

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };


    const handleUpload = e => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {console.log(error)},
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    if (e.target.value === "PP"){
                        setUpdated({...updated, profile_picture: url});
                    } else {
                        setUpdated({...updated, banniere_picture: url})
                    }

                    console.log(updated);
                })
            }
        )
    } ;
    
    const onValidate = () => {
        let config = {
            headers: {
                vendeur_auth_token: user.token
            }
        }
        axios
        .patch(`http://localhost:3001/api/profil/update/${user.id}`, {...updated})
        .then(res => console.log(res))
    }
    


    return (

        <>
        <p> In building</p>
        <label>Photo de profil</label>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload} value="PP">Upload</button>
        <label>Banniere de profil</label>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload} >Upload</button>

        <button onClick={onValidate}>Validée les changements</button>
        </>

    )
}