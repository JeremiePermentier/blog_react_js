const Input: React.FC<{type: string, placeholder: string, register: any}> = ({type, placeholder, register}) => {
    return (
        <input type={type} placeholder={placeholder} {...register} />
    );
};

export default Input;