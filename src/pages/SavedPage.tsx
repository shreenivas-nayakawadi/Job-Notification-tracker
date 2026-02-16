import { EmptyState } from '../components/EmptyState';
import { Bookmark } from 'lucide-react';

export const SavedPage = () => {
    return (
        <EmptyState
            icon={<Bookmark size={48} />}
            title="No saved jobs yet"
            message="Jobs you save will appear here for easy access later."
        />
    );
};
