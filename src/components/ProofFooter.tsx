import { useState } from 'react';
import { Check } from 'lucide-react';
import './ProofFooter.css';

interface ProofItem {
    id: string;
    label: string;
    checked: boolean;
}

export const ProofFooter = () => {
    const [items, setItems] = useState<ProofItem[]>([
        { id: 'ui', label: 'UI Built', checked: false },
        { id: 'logic', label: 'Logic Working', checked: false },
        { id: 'test', label: 'Test Passed', checked: false },
        { id: 'deployed', label: 'Deployed', checked: false },
    ]);

    const toggleItem = (id: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <div className="proof-footer-container">
            {items.map(item => (
                <label key={item.id} className={`proof-item ${item.checked ? 'checked' : ''}`}>
                    <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="proof-checkbox-input"
                    />
                    <div className="proof-checkbox-custom">
                        {item.checked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className="proof-label">{item.label}</span>
                </label>
            ))}
        </div>
    );
};
