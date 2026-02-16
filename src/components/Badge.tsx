import clsx from 'clsx';
import './Badge.css';

export interface BadgeProps {
    label: string;
    variant?: 'neutral' | 'success' | 'warning' | 'error';
    className?: string;
}

export const Badge = ({
    label,
    variant = 'neutral',
    className
}: BadgeProps) => {
    return (
        <span className={clsx('badge', `badge-${variant}`, className)}>
            {label}
        </span>
    );
};
