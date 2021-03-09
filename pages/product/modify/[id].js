import axios from "axios";

export default function ModifyProduct ({item}) {

    return( 
        <>
yo
        </>
    )
}

export async function getServerSideProps({params}) {
    const item = await axios
      .get(`http://localhost:3001/api/items/modify/item/${params.id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      props: {
        item,
      },
    };
  }