import { EmptyState } from '../components/EmptyState';
import { Archive } from 'lucide-react';

export const ProofPage = () => {
    return (
        <EmptyState
            icon={<Archive size={48} />}
            title="Proof artifacts will be collected here"
            message="Track your application progress and success metrics."
        />
    );
};
