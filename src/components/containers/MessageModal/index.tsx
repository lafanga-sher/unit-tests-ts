import classNames from 'classnames';
import React from 'react';

import Modal, { ModalProps } from '../Modal';
import './styles.scss';

export interface ButtonConfig {
  type: 'filled' | 'outlined';
  label: string;
  onClick: () => void;
}

export interface MessageModalProps extends ModalProps {
  type: 'error' | 'success';
  title: string;
  button?: string;
  onClickButton?: () => void;
  buttonConfigs?: ButtonConfig[];
  content: React.ReactNode;
}

const MessageModal: React.FC<MessageModalProps> = ({
  type,
  title,
  button,
  onClickButton,
  buttonConfigs,
  content,
  ...modalProps
}) => {
  const close = () => {
    if (modalProps.onHide) {
      modalProps.onHide();
    }
  };

  // render button according to config
  const renderButton = (config: ButtonConfig, index: number) => {
    return (
      <button
        key={index}
        type="button"
        className={classNames(
          'btn btn-capsule md action-button',
          `btn-${config.type}`
        )}
        onClick={config.onClick}
      >
        {config.label}
      </button>
    );
  };

  return (
    <Modal {...modalProps}>
      <div className="message-modal-dialog">
        <button type="button" className="btn close-button" onClick={close}>
          <img src="/imgs/close-icon.svg" alt="" />
        </button>
        <div className="dialog-header">
          <img
            src={
              {
                error: '/imgs/warning-icon.svg',
                success: '/imgs/success-icon.svg',
              }[type]
            }
            alt=""
          />
          <div className="dialog-title">{title}</div>
        </div>
        <div className="dialog-content">
          <div className="dialog-message">{content}</div>
        </div>
        <div className="action-button-container">
          {!!button && (
            <button
              type="button"
              className="btn btn-capsule md btn-filled"
              onClick={onClickButton}
            >
              {button}
            </button>
          )}
          {!!buttonConfigs &&
            buttonConfigs.map((config, index) => renderButton(config, index))}
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
