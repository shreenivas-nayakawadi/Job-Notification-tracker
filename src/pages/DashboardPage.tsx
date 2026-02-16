import { EmptyState } from '../components/EmptyState';
import { Inbox } from 'lucide-react';

export const DashboardPage = () => {
    return (
        <EmptyState
            icon={<Inbox size={48} />}
            title="No jobs yet"
            message="In the next step, you will load a realistic dataset."
        />
    );
};
