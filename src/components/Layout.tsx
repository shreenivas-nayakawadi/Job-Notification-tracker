import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  topBar: React.ReactNode;
  contextHeader: React.ReactNode;
  proofFooter: React.ReactNode;
}

export const Layout = ({
  children,
  topBar,
  contextHeader,
  proofFooter,
}: LayoutProps) => {
  return (
    <div className="layout-root">
      <header className="layout-topbar">{topBar}</header>
      <section className="layout-context">{contextHeader}</section>
      <main className="layout-main">
        <div className="layout-content">{children}</div>
      </main>
      <footer className="layout-footer">{proofFooter}</footer>
    </div>
  );
};
