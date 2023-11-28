import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/Container';

const Profile = () => {
    return (
        <div>
            <Helmet>
                <title>Profile | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                profile
            </Container>
        </div>
    );
};

export default Profile;