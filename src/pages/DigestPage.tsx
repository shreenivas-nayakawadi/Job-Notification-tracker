import { EmptyState } from '../components/EmptyState';
import { Mail } from 'lucide-react';

export const DigestPage = () => {
    return (
        <EmptyState
            icon={<Mail size={48} />}
            title="Daily digest will arrive at 9AM"
            message="Your personalized job digest will be delivered here every morning."
        />
    );
};
