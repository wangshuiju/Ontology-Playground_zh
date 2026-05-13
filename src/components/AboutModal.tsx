import { motion } from 'framer-motion';
import { X, Info } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 720 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>关于本体游乐场</h2>
          <button className="icon-btn" onClick={onClose} aria-label="关闭关于对话框">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="feature-card" style={{ marginBottom: 0 }}>
            <p className="feature-text" style={{ margin: 0 }}>
              本体游乐场是面向社区的学习与设计体验，可用于构建 RDF/OWL 本体、探索图谱关系，并准备兼容 Microsoft Fabric IQ 工作流的模型。
            </p>
            <p className="feature-text" style={{ margin: '10px 0 0 0' }}>
              了解 Microsoft Fabric IQ：{' '}
              <a
                className="about-link"
                href="https://learn.microsoft.com/fabric/iq/overview"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://learn.microsoft.com/fabric/iq/overview
              </a>
            </p>
          </div>

          <div
            style={{
              padding: 16,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'rgba(0, 120, 212, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Info size={18} color="var(--ms-blue)" />
              <strong style={{ color: 'var(--text-primary)' }}>商标声明</strong>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              本项目可能包含项目、产品或服务相关的商标或徽标。Microsoft 商标或徽标的授权使用必须遵循 Microsoft 商标与品牌指南。
              在本项目的修改版本中使用 Microsoft 商标或徽标时，不得造成混淆或暗示 Microsoft 赞助。任何第三方商标或徽标的使用均受对应第三方政策约束。
            </p>
          </div>
        </div>

        <div style={{ marginTop: 22, textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={onClose}>关闭</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
