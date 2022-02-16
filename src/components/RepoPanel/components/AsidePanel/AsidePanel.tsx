import {Drawer} from 'antd';
import React, {FC} from 'react';
import styled from 'styled-components';

interface AsidePanelProps {
  title?: string;
  repoId: string;
  isVisible: boolean;
  onClose: () => void;
}

export const AsidePanel: FC<AsidePanelProps> = ({
  title,
  repoId,
  isVisible,
  onClose,
}) => {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      visible={isVisible}
    >
      <p>{repoId}</p>
    </Drawer>
  );
};
