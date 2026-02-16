
import { Layout } from './components/Layout';
import { TopBar } from './components/TopBar';
import { ContextHeader } from './components/ContextHeader';
import { ProofFooter } from './components/ProofFooter';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';
import { Badge } from './components/Badge';
import { Copy, Play, AlertCircle, ArrowRight } from 'lucide-react';

function App() {
    return (
        <Layout
            topBar={
                <TopBar
                    projectName="KodNest Premium Build System"
                    currentStep={1}
                    totalSteps={5}
                    status="In Progress"
                />
            }
            contextHeader={
                <ContextHeader
                    title="Configure Your Environment"
                    subtext="Set up the foundational elements of your new project. Ensure all variables are correctly defined before proceeding."
                />
            }
            proofFooter={<ProofFooter />}
        >
            {/* Primary Workspace (70%) */}
            <div style={{ flex: '7', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <Card title="Project Details">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <Input label="Project Name" placeholder="e.g. My Awesome App" defaultValue="KodNest Premium Build System" />
                        <Input label="Description" placeholder="Briefly describe your project..." />
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            <Button variant="primary" icon={<Play size={16} />}>Start Build</Button>
                            <Button variant="secondary">Save Draft</Button>
                        </div>
                    </div>
                </Card>

                <Card title="Configuration">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Select the modules you wish to include in this build.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                <input type="checkbox" defaultChecked /> Authentication <Badge label="Essential" variant="neutral" />
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                <input type="checkbox" /> Stripe <Badge label="Pro" variant="warning" />
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                <input type="checkbox" /> Analytics
                            </label>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Secondary Panel (30%) */}
            <div style={{ flex: '3', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <Card title="Step Instructions">
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-md)' }}>
                        This step initializes the core configuration. Review the settings on the left.
                    </p>
                    <div style={{
                        backgroundColor: '#f5f5f5',
                        padding: '12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        marginBottom: 'var(--space-md)',
                        border: '1px solid var(--border-subtle)'
                    }}>
                        npx create-kodnest-app@latest
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        <Button variant="secondary" icon={<Copy size={16} />} style={{ width: '100%', justifyContent: 'flex-start' }}>Copy Command</Button>
                        <Button variant="ghost" icon={<ArrowRight size={16} />} style={{ width: '100%', justifyContent: 'flex-start' }}>Open Documentation</Button>
                        <Button variant="ghost" icon={<AlertCircle size={16} />} style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-accent)' }}>Report Issue</Button>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

export default App;
