import { motion } from 'framer-motion';
import { X, MousePointer, Target, MessageSquare, Link2, Lightbulb, Command } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export function HelpModal({ onClose }: HelpModalProps) {
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
        style={{ maxWidth: 700 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>如何使用本体游乐场（预览版）</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <MousePointer size={20} color="var(--ms-blue)" />
              <span className="feature-title" style={{ marginBottom: 0 }}>探索图谱</span>
            </div>
            <p className="feature-text">
              点击任意<strong>实体类型</strong>（彩色节点）查看其属性、关系和数据绑定。
              点击<strong>关系连线</strong>查看实体如何连接。使用左下角控件缩放或重置布局。
            </p>
          </div>

          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Target size={20} color="var(--ms-purple)" />
              <span className="feature-title" style={{ marginBottom: 0 }}>完成任务</span>
            </div>
            <p className="feature-text">
              从左侧面板选择任务，开始引导式探索。按说明点击指定实体或关系，完成全部步骤即可获得<strong>徽章</strong>和<strong>积分</strong>。
            </p>
          </div>

          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <MessageSquare size={20} color="var(--ms-yellow)" />
              <span className="feature-title" style={{ marginBottom: 0 }}>提出自然语言问题</span>
            </div>
            <p className="feature-text">
              使用右下角查询面板提问，例如“显示所有金卡客户”或“哪些产品来自埃塞俄比亚？”。图谱会高亮相关实体和关系。
            </p>
          </div>

          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Link2 size={20} color="var(--ms-green)" />
              <span className="feature-title" style={{ marginBottom: 0 }}>查看数据绑定</span>
            </div>
            <p className="feature-text">
              选择实体类型后，检查器会显示本体属性如何映射到 OneLake 中的真实数据源，包括 Lakehouse 表和 Power BI 语义模型。
            </p>
          </div>

          <div style={{ 
            padding: 16, 
            background: 'rgba(0, 120, 212, 0.1)', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12
          }}>
            <Lightbulb size={20} color="var(--ms-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong style={{ color: 'var(--ms-blue)' }}>关于 Microsoft Fabric IQ 本体</strong>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
                本体是业务中可共享、机器可理解的词汇体系。它定义实体类型（如客户、产品）、属性和关系。本演示使用虚构的“星际咖啡公司”说明这些概念。
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Command size={20} color="var(--ms-blue)" />
              <span className="feature-title" style={{ marginBottom: 0 }}>键盘快捷键</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
              <kbd className="help-kbd">⌘K</kbd><span>打开命令面板</span>
              <kbd className="help-kbd">?</kbd><span>打开此帮助窗口</span>
              <kbd className="help-kbd">Esc</kbd><span>关闭任意对话框</span>
              <kbd className="help-kbd">↑ ↓</kbd><span>浏览命令面板结果</span>
              <kbd className="help-kbd">↵</kbd><span>选择命令</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={onClose}>
            明白了！
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
