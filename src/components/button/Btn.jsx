import PropTypes from 'prop-types';


const Btn = ({text}) => {
    return (
        <>
            <button className='py-3 px-6 text-white rounded-md  bg-[#3673BE] hover:bg-[#265185] duration-400'>{text}</button>
        </>
    );
};

Btn.propTypes={
    text: PropTypes.node
}

export default Btn;