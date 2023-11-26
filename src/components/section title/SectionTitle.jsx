import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subHeading, line }) => {
    line = false
    return (
        <div className='text-center mb-10'>
            <h2 className={`text-3xl md:text-[45px] font-semibold ${line && 'sectionH'}`}>{heading}</h2>
            {/* <img className='mx-auto w-[200px] -mt-2' src={lineImg} alt="" /> */}
            <p className='mt-2'>{subHeading}</p>
        </div>
    );
};


SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    line: PropTypes.boolean
}

export default SectionTitle;