import { Sparkles } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="app-footer">
      <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">
        <Sparkles size={14} />
        使用 GitHub Copilot 构建
      </a>
      <span className="app-footer-sep">&middot;</span>
      <a href="https://github.com/videlalvaro" target="_blank" rel="noopener noreferrer">
        由 videlalvaro 监督维护
      </a>
    </footer>
  );
}
