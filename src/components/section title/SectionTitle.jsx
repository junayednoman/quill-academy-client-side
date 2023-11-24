import PropTypes from 'prop-types';
import lineImg from '../../assets/line.png'

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className='text-center mb-10'>
            <h2 className='text-3xl md:text-5xl font-semibold sectionH'>{heading}</h2>
            {/* <img className='mx-auto w-[200px] -mt-2' src={lineImg} alt="" /> */}
            <p className='mt-2'>{subHeading}</p>
        </div>
    );
};


SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
}

export default SectionTitle;