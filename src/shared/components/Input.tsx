interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    register?: any;
}

const Input: React.FC<InputProps> = ({ register, ...props }) => {
    return (
        <input {...props} {...register} />
    );
};

export default Input;