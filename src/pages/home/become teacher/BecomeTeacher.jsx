import teacherImg from '../../../assets/teacher.png'
import Btn from '../../../components/button/Btn';
import Container from '../../../components/container/Container';

const BecomeTeacher = () => {
    return (
        <div className='lg:pb-20 md:pb-14 pb-12'>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center">
                    <div>
                        <img className='px-4 md:px-8' src={teacherImg} alt="" />
                    </div>
                    <div className='md:text-left text-center'>
                        <h3 className='text-3xl md:text-5xl font-semibold'>Become an Instructor</h3>
                        <p className='mt-3 mb-8'>Embark on a rewarding journey as an educator with QuillAcademy. Share your expertise, ignite curiosity, and shape the future of learners around the globe. Our platform provides a dynamic space for passionate individuals to create, innovate, and engage in impactful teaching. </p>
                        <Btn text='Start Teaching Today'></Btn>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BecomeTeacher;