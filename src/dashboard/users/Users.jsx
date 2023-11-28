import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/Container';

const Users = () => {
    return (
        <div>
            <Helmet>
                <title>Users | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                users
            </Container>
        </div>
    );
};

export default Users;