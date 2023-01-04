import {
  Box,
  Snackbar,
  Alert,
  SnackbarCloseReason,
  AlertColor,
} from "@mui/material";
import useResponsive from "../theme/hooks/useResponsive";

interface IAlertBannerProps {
  showAlert: boolean;
  alertMessage: string;
  severity: AlertColor;
  autoHideDuration?: number;
  onCloseHandle?: (
    event: React.SyntheticEvent<any> | Event,
    reason: SnackbarCloseReason
  ) => void;
}

export default function AlertBanner({
  showAlert,
  alertMessage,
  severity = "error",
  autoHideDuration,
  onCloseHandle,
}: IAlertBannerProps) {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      {!mdUp && (
        <Snackbar
          open={showAlert}
          autoHideDuration={autoHideDuration}
          onClose={onCloseHandle}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
      {mdUp && showAlert && (
        <Box mb={3}>
          <Alert severity={severity} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Box>
      )}
    </>
  );
}
