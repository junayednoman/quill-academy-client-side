
import PropTypes from 'prop-types';

const Container = ({ children }) => {
    return (
        <div className="max-w-screen-xl px-2 sm:px-4 md:px-8  lg:px-12 xl:mx-auto xl:px-14">
            {children}
        </div >
    );
};

Container.propTypes={
    children: PropTypes.node
}

export default Container;