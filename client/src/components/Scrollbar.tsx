import SimpleBarReact, { Props } from "simplebar-react";
import { alpha, styled } from "@mui/material/styles";

const RootStyle = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

interface IScrollbarProps extends Omit<Props, "children"> {
  children: React.ReactElement;
  sx: any;
}

export const Scrollbar: React.FunctionComponent<IScrollbarProps> = ({
  children,
  ...other
}) => {
  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};
