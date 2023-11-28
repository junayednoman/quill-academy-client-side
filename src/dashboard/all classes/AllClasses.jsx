import { Helmet } from 'react-helmet-async';
import Container from '../../components/container/Container';

const AllClasses = () => {
    return (
        <div>
            <Helmet>
                <title>All Classes | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <Container>
                classes
            </Container>
        </div>
    );
};

export default AllClasses;