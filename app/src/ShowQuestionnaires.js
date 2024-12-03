import { Button, Card, Container } from 'react-bootstrap'
import { ListQuestionnaires } from './components/ListQuestionnaires';
import { useNavigate } from 'react-router-dom';

export const ShowQuestionnaires = () => {
    const user = JSON.parse(localStorage.user)
    const navigate= useNavigate();

    return (
        <Container>
            <Card>
                <Card.Body>
                    <h1>bienvenido de nuevo: {user.name}</h1>
                    <Card.Title>{user.rol === "administrator" ? "Cuestionarios creados" : "Tus cuestionarios"}</Card.Title>
                    <Card.Text><b>Formularios recientes:</b></Card.Text>
                    {
                        user.rol==="client" && (
                            <Button onClick={()=> navigate("/create-questionnaires")}>crear cuestionario</Button>
                        )
                    }
                    <ListQuestionnaires rol={user.rol} />
                </Card.Body>
            </Card>
        </Container>
    )
}
