import PropTypes from 'prop-types';


const Btn = ({ text, fullWidth }) => {
    return (
        <>
            <button style={fullWidth && { width: '100%' }} className={`py-3 px-6 text-white rounded-[4px] bg-[#3673BE] hover:bg-[#265185] duration-500`}>{text}</button>
        </>
    );
};

Btn.propTypes = {
    text: PropTypes.string,
    width: PropTypes.string,
}

export default Btn;