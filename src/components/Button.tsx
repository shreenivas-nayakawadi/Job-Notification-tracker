import clsx from 'clsx';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export const Button = ({
    variant = 'primary',
    className,
    children,
    icon,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx('btn', `btn-${variant}`, className)}
            {...props}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};
