const Button = ({ type="button", children }) => {

    return (
        <button type={type} >
            {children}
        </button>
    );
}
export default Button;