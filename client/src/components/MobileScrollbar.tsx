import { Box, BoxProps } from "@mui/material";
import { useMemo } from "react";

interface IMobileScrollbarProps extends Omit<BoxProps, "icon"> {
  children: React.ReactElement;
}

export const MobileScrollbar: React.FunctionComponent<IMobileScrollbarProps> = ({
  children,
  sx,
  ...other
}) => {
  const styles: any = useMemo(() => ({ overflowX: "auto", ...sx }), [sx]);

  return (
    <Box sx={styles} {...other}>
      {children}
    </Box>
  );
};
