import { motion } from 'framer-motion';
import { Sparkles, GitBranch, Database, MessageSquare } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="modal-header">
          <div className="modal-logo">☕</div>
          <h1 className="modal-title">欢迎使用本体游乐场（预览版）</h1>
          <p className="modal-subtitle">
            通过星际咖啡公司的场景探索 Microsoft Fabric IQ 本体
          </p>
        </div>

        <div className="modal-features">
          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles size={24} color="#0078D4" />
            </div>
            <div className="feature-title">实体类型</div>
            <div className="feature-text">
              发现客户、产品、订单等可复用逻辑模型
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <GitBranch size={24} color="#5C2D91" />
            </div>
            <div className="feature-title">关系</div>
            <div className="feature-text">
              查看实体如何通过带类型、带方向的连接关联起来
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Database size={24} color="#107C10" />
            </div>
            <div className="feature-title">数据绑定</div>
            <div className="feature-text">
              将本体概念连接到真实 OneLake 数据源
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MessageSquare size={24} color="#FFB900" />
            </div>
            <div className="feature-title">自然语言查询</div>
            <div className="feature-text">
              用自然语言提问并遍历图谱
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            <Sparkles size={18} />
            开始探索
          </button>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 24, 
          fontSize: 12, 
          color: 'var(--text-tertiary)' 
        }}>
          完成任务、获得徽章，并学习 Microsoft Fabric IQ 本体
        </div>
      </motion.div>
    </motion.div>
  );
}
