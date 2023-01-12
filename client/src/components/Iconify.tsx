import { Icon, IconifyIcon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';
import React from 'react';

interface IIconifyProps extends Omit<BoxProps, "icon"> {
  icon: IconifyIcon | string;
  sx: any;
};

export const Iconify: React.FunctionComponent<IIconifyProps> = ({ icon, ...other }) => {
  return <Box component={Icon} icon={icon} {...other} />;
}
