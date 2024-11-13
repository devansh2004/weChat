import DeleteForm from "../components/DeleteForm"

function DeleteUser(){
    return <DeleteForm route="/api/user/delete/" method="delete" />
}

export default DeleteUser