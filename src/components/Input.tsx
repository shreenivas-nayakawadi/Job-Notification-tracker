import clsx from 'clsx';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({
    label,
    error,
    className,
    id,
    ...props
}: InputProps) => {
    const inputId = id || props.name;

    return (
        <div className="input-wrapper">
            {label && <label htmlFor={inputId} className="input-label">{label}</label>}
            <input
                id={inputId}
                className={clsx('input-field', error && 'input-error', className)}
                {...props}
            />
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};
